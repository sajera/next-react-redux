
// outsource dependencies
import qs from 'qs';
import _ from 'lodash';
import axios from 'axios';

// local dependencies
import { config } from '../constants';
import storage from './storage.service';

// absolute path to API
const API_PATH = config.serviceUrl + config.apiPath;

// private names
const AUTH_STORE = 'sAuth';
const AUTH_BEARER = 'Bearer ';
const AUTH_HEADER = 'Authorization';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

/******************************************************************
 *           STORAGE
 ******************************************************************/
/**
 * update session in storage to provide ability restore session from ("local" || "cookie") storage
 *
 * @param {Object} [session=null]
 */
const updateStoredSession = session => {
  return (!session ? storage.remove(AUTH_STORE) : storage.set(AUTH_STORE, {
    [ACCESS_TOKEN]: session[ACCESS_TOKEN],
    [REFRESH_TOKEN]: session[REFRESH_TOKEN]
  }));
};
window.storage = storage;
const getAccessToken = () => _.get(storage.get(AUTH_STORE), ACCESS_TOKEN, null);

const getRefreshToken = () => _.get(storage.get(AUTH_STORE), REFRESH_TOKEN, null);

const hasStoredSession = () => !_.isEmpty(storage.get(AUTH_STORE));

const getAuthHeader = () => AUTH_BEARER + getAccessToken();

/******************************************************************
*           helpers
*******************************************************************/
/**
 * override query serializer to define array Format as API needed
 *
 * @param {Object} options
 * @returns {String}
 */
const paramsSerializer = options => qs.stringify(options, { arrayFormat: 'repeat', encode: false });
/**
 * prepare results. Solution to prepare success data
 *
 * @param {Object} response
 * @return {Object}
 */
const prepareResponse = response => response.data;

/**
 * prepare error
 *
 * @param {Object} error
 * @return {Promise}
 */
const prepareError = error => {
  error = formatAxiosError(error);
  if (config.DEBUG) {
    debugErrors.unshift(error);
    console.warn('%c Interceptor: ', 'background: #EC1B24; color: #fff; font-size: 14px;', error);
  }
  const message = getMessage([error.errorCode], error.response ? 'CODE_NULL' : 'CROSS_DOMAIN_REQUEST');
  return Promise.reject({ ...error.response, message });
};

const formatAxiosError = error => ({
  // axiosError: error,
  path: _.get(error, 'config.url', null),
  response: _.get(error, 'response.data', null),
  status: _.get(error, 'response.status', null),
  requestData: _.get(error, 'config.data', null),
  method: _.get(error, 'config.method', 'CODE_NULL'),
  requestParams: _.get(error, 'config.params', null),
  errorCode: _.get(error, 'response.data.errorCode', null),
});

/******************************************************************
 *           PUBLIC  requester instance
 ******************************************************************/
/**
 * axios instance prepared for app
 */
const PUB = axios.create({
  paramsSerializer,
  baseURL: API_PATH,
  withCredentials: false,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  }
});

/**
 * setup interceptors
 */
PUB.interceptors.response.use(
  prepareResponse,
  prepareError
);

/******************************************************************
 *           API(PRIVATE) requester instance
 ******************************************************************/
/**
 * axios instance prepared for app with authorization
 * contain logic for working with authorization and 401 interceptor
 */
const API = axios.create({
  paramsSerializer,
  baseURL: API_PATH,
  withCredentials: false,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});

/**
 * setup interceptors
 * sync check to known is user logged in
 * NOTE to known more {@link https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c | axios-interceptors-refresh-token}
 */
API.interceptors.response.use(
  prepareResponse,
  error => ((
    hasStoredSession()
        && error.request.status === 401
        // NOTE support request may get 401 (JAVA Spring is fucking genius ...) we must skip restoring for that case
        && !/sign-out|\/oauth\/token/.test(error.config.url)
  ) ? handleRefreshSession(error) : prepareError(error))
);

/**
 * local variables to correctness refreshing session process
 */
let isRefreshing = false,
  stuckRequests = [];

/**
 * store all requests with 401 refresh session and try send request again
 *
 * @param {Object} error
 * @return {Promise}
 */
const handleRefreshSession = error => {
  const { config } = error;
  if (!isRefreshing) {
    isRefreshing = true;
    PUB.post('/auth/token/refresh', { refreshToken: getRefreshToken() })
      .then(session => {
        API.setupSession(session);
        // NOTE resend all
        stuckRequests.map(({ config, resolve, reject }) => {
          // NOTE setup new authentication header in old request config
          config.headers[AUTH_HEADER] = getAuthHeader();
          API(config).then(resolve).catch(reject);
          // NOTE "array-callback-return"
          return null;
        });
        // NOTE start new stuck
        stuckRequests = [];
        isRefreshing = false;
      })
      .catch(() => {
        // NOTE reject all
        stuckRequests.map(({ error, reject }) => reject(error));
        // NOTE provide ability to handle this situation
        API.onAuthFailApplicationAction(error);
        // NOTE start new stuck
        stuckRequests = [];
        isRefreshing = false;
      });
  }
  // NOTE determine first trying to restore session
  if (!config.wasTryingToRestore) {
    return new Promise((resolve, reject) => {
      config.wasTryingToRestore = true;
      stuckRequests.push({ config, error, resolve, reject });
    });
  }
  return prepareError(error);
};

/**
 * provide correct way to restore session
 */
API.restoreSessionFromStore = () => Boolean(!hasStoredSession()
  ? (API.defaults.headers[AUTH_HEADER] = void(0))
  : (API.defaults.headers[AUTH_HEADER] = getAuthHeader()));

/**
 * provide correct way to setup authorization session
 *
 * @param {String} session - null to kill session within instanceAPI
 */
API.setupSession = session => {
  updateStoredSession(session);
  API.restoreSessionFromStore();
};
/**
 * "event" to provide correct way to handle authorization fail during requests
 *
 */
API.onAuthFailApplicationAction = error => console.warn('authorization is fail. Expected to override this action');
/******************************************************************
 *           format of ERRORS
 ******************************************************************/
/**
 * try to find explanation of error in specification
 *
 * @param {String[]|String} errors
 * @param {String} [defMessage=null]
 */
function getMessage (errors, defMessage) {
  // NOTE check and setup default message
  if (!_.isString(defMessage)) {
    defMessage = getMessage('UNKNOWN_ERROR', 'Some thing went wrong ...');
  } else {
    defMessage = MESSAGE[defMessage] ? MESSAGE[defMessage] : defMessage;
  }
  // NOTE try to get message from specification
  let message = '';
  if (_.isArray(errors)) {
    message = errors.map(e => getMessage(e, defMessage)).join(', ');
  } else if (errors) {
    message = MESSAGE[errors];
  }
  return message || defMessage;
}

const MESSAGE = {
  CODE_NULL: '', // errors which will be displayed as UNKNOWN_ERROR
  NESTED_EXCEPTION: '', // errors which will be displayed as UNKNOWN_ERROR
  UNKNOWN_ERROR: 'Some thing went wrong ...',
  CROSS_DOMAIN_REQUEST: 'Cross domain request not allowed !',
  FORBIDDEN: 'Access is denied."',
  404: '404: Resources not found',
  NOT_IMPLEMENTED: 'Functionality currently unavailable',
};

const debugErrors = [];
export const getDebugErrors = () => debugErrors;
// NOTE named export only after all prepare thing
export const instanceAPI = API;
export const instancePUB = API;
export default API;
