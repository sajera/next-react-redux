
// outsource dependencies
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';

// local dependencies
import { silence } from '../../fe-services/saga.helper';

// IMPORTANT the main controller initialized in browser only (FE)
// it provide ability to contain page runtime common data
// and common for all pages js functionality
export const appRootCtrl = create({
  prefix: 'app',
  actions: {
    initialize: 'INITIALIZE',
  },
  initial: {
    initialized: false, // prevent redirect from page and show instead current page and it behavior - global preloader
    health: true,       // prevent redirect from page and show instead current page and it behavior - maintenance page
    user: null,         // logged user information
  },
  subscriber: function * () {
    yield takeEvery(appRootCtrl.action.initialize.TYPE, silence, initializeExe);
  }
});

export default appRootCtrl;

function * initializeExe ({ type, payload }) {
  console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    , '\n payload:', payload
  );
  // TODO restore tokens
  // TODO restore user data
  yield delay(3e3);
  // NOTE initialization done
  yield put(appRootCtrl.action.updateCtrl({ initialized: true }));
}
