
// outsource dependencies
import _ from 'lodash';
import { call } from 'redux-saga/effects';

// local dependencies
import { config } from '../fe-constants';

/**
 * helper to simplify handling exception
 * @example
    yield call(silence, nonSafeAction, some, data);
    // or
    yield takeEvery(ACTION, silence, realActionHandlerExe);
 */
export function * silence (...args) {
  try {
    return yield call(...args);
  } catch (error) {
    const action = args[1];
    const payload = _.get(action, 'payload');
    const type = _.get(action, 'type', _.get(args[0], 'name', '...'));
    // NOTE any common actions to handle error
    config.DEBUG && console.info(`%c SILENCE => ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
      , '\n payload:', payload
      , '\n all:', args
    );
  }
  return null;
}
