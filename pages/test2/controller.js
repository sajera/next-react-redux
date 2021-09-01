
// outsource dependencies
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, delay } from 'redux-saga/effects';

// local dependencies
import { silence } from '../../src/runtime-error';

// configure
export const test2Ctrl = create({
  prefix: 'test2',
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
    yield takeEvery(test2Ctrl.action.initialize.TYPE, silence, initializeExe);
  }
});

export default test2Ctrl;

function * initializeExe ({ type, payload }) {
  console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    , '\n payload:', payload
  );
  yield delay(3e3);
  // NOTE initialization done
  yield put(test2Ctrl.action.updateCtrl({ initialized: true }));
}
