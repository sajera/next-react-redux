
// outsource dependencies
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { reducer as toastr } from 'react-redux-toastr';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { reducer, sagas, path, extraReducers } from 'redux-saga-controller';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// import { fork, takeEvery, delay, put } from 'redux-saga/effects';
// import { createBrowserHistory as createHistory } from 'history';

// local dependencies
import config from './constants';

// NOTE export history outside of components to be able dispatch navigation actions from anywhere!
// export const history = createHistory();

export const nextReduxWrapper = createWrapper(makeStore, { debug: true });

// NOTE just store hydration data to allow select where it will be need
function hydrate (state = {}, action) {
  if (action.type === HYDRATE) {
    return action.payload;
  }
  return state;
}

function makeStore () {

  // NOTE teach redux-saga-controller to HYDRATE
  // extraReducers({
  //   [HYDRATE]: (state, action) => {
  //     console.log('extraReducers.HYDRATE', state, action.payload);
  //     return { ...state, ...action.payload[path] };
  //   }
  // });
  const combinedReducers = combineReducers({
    [path]: reducer,
    toastr,
    form,
  });
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    // function (state = {}, action) {
    //   if (action.type === HYDRATE) {
    //     console.log('test.HYDRATE', state, action);
    //     return action.payload;
    //   }
    //   return combinedReducers(state, action);
    // },
    combineReducers({
      [path]: reducer,
      hydrate,
      toastr,
      form,
    }),
    (
      typeof window === 'undefined' || config.production ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)
    )(applyMiddleware(sagaMiddleware))
  );
  // initialize application sagas
  store.sagaTask = sagaMiddleware.run(sagas);
  // store.sagaTask = sagaMiddleware.run(function * a () {
  //   yield fork(sagas);
  //   yield takeEvery(HYDRATE, silence, function * a ({ type, payload }) {
  //     console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
  //       , '\n payload:', payload
  //     );
  //     yield put({ type: 'a' });
  //   });
  // });
  return store;
}
