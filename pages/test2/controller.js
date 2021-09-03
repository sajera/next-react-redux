
// outsource dependencies
import { HYDRATE } from 'next-redux-wrapper';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';

// local dependencies
import { silence } from '../../store/runtime-error';

// configure
export const test2Ctrl = create({
  prefix: 'test2',
  actions: {
    initialize: 'INITIALIZE',
    initializeSSR: 'SSR_INITIALIZE',
  },
  initial: {
    initialized: false, // prevent redirect from page and show instead current page and it behavior - global preloader
    health: true,       // prevent redirect from page and show instead current page and it behavior - maintenance page
    user: null,         // logged user information
    roles: []
  },
  subscriber: function * () {
    yield takeEvery(test2Ctrl.action.initialize.TYPE, silence, initializeExe);
    yield takeEvery(test2Ctrl.action.initializeSSR.TYPE, silence, initializeSSRExe);
  }
});

export default test2Ctrl;

function * initializeSSRExe ({ type, payload }) {
  // NOTE check request data to get important info
  console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    , '\n payload:', payload
  );

  yield delay(1e3);
  // NOTE initialization done
  yield put(test2Ctrl.action.updateCtrl({ initialized: true }));
}

function * initializeExe ({ type, payload }) {
  // NOTE check hydration data
  const hydratedState = yield select(state => state.hydrate);
  const myHydratedState = test2Ctrl.select(hydratedState);
  yield put(test2Ctrl.action.updateCtrl(myHydratedState));

  console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    , '\n hydratedState:', hydratedState
    , '\n myHydratedState:', myHydratedState
    , '\n payload:', payload
  );

  yield delay(3e3);
  // NOTE initialization done
  yield put(test2Ctrl.action.updateCtrl({ initialized: true }));
}

