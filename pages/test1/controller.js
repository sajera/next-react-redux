
// outsource dependencies
import { HYDRATE } from 'next-redux-wrapper';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';

// local dependencies
import { silence } from '../../src/runtime-error';

// configure
export const test1Ctrl = create({
  prefix: 'test1',
  actions: {
    initialize: 'INITIALIZE',
  },
  initial: {
    initialized: false, // prevent redirect from page and show instead current page and it behavior - global preloader
    health: true,       // prevent redirect from page and show instead current page and it behavior - maintenance page
    user: null,         // logged user information
    roles: []
  },
  subscriber: function * () {
    yield takeEvery(test1Ctrl.action.initialize.TYPE, silence, initializeExe);
  }
});

export default test1Ctrl;

function * initializeExe ({ type, payload }) {
  // NOTE check hydration data
  const hydratedState = yield select(state => state.hydrate);
  const myHydratedState = test1Ctrl.select(hydratedState);
  yield put(test1Ctrl.action.updateCtrl(myHydratedState));

  console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    , '\n hydratedState:', hydratedState
    , '\n myHydratedState:', myHydratedState
    , '\n payload:', payload
  );
  yield delay(3e3);
  // NOTE initialization done
  yield put(test1Ctrl.action.updateCtrl({ initialized: true }));
}
