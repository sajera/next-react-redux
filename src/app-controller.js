
// outsource dependencies
import { create } from 'redux-saga-controller';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';

// local dependencies
import { silence } from './runtime-error';

// configure
export const appCtrl = create({
  prefix: 'app',
  actions: {
    initialize: 'INITIALIZE',
    signOut: 'SIGN_OUT',
    getSelf: 'GET_SELF',
  },
  initial: {
    initialized: false, // prevent redirect from page and show instead current page and it behavior - global preloader
    health: true,       // prevent redirect from page and show instead current page and it behavior - maintenance page
    user: null,         // logged user information
    roles: []
  },
  subscriber: function * () {
    yield takeEvery(appCtrl.action.getSelf.TYPE, silence, getSelfExe);
    yield takeEvery(appCtrl.action.signOut.TYPE, silence, signOutExe);
    yield takeEvery(appCtrl.action.initialize.TYPE, silence, initializeExe);
  }
});

export default appCtrl;

function * initializeExe ({ type, payload }) {
  // NOTE check hydration data
  const hydratedState = yield select(state => state.hydrate);
  const myHydratedState = appCtrl.select(hydratedState);
  yield put(appCtrl.action.updateCtrl(myHydratedState));

  console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    , '\n hydratedState:', hydratedState
    , '\n myHydratedState:', myHydratedState
    , '\n payload:', payload
  );
  yield delay(3e3);
  // NOTE initialization done
  yield put(appCtrl.action.updateCtrl({ initialized: true }));
}

function * signOutExe ({ type, payload }) {
  console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    , '\n payload:', payload
  );
  yield put(appCtrl.action.updateCtrl({ user: null }));
}

function * getSelfExe ({ type, payload }) {
  console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    , '\n payload:', payload
  );
  try {
    const user = { name: 'I am a fake user data' };
    // const user = yield call(instanceAPI, { method: 'GET', url: 'auth/users/me' });
    yield put(appCtrl.action.updateCtrl({ user }));
  } catch ({ message }) {
    // NOTE do nothing
    yield call(signOutExe, {});
  }
}
