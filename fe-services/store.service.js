
// outsource dependencies
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { reducer as toastr } from 'react-redux-toastr';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { reducer, sagas, path } from 'redux-saga-controller';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// local dependencies
import { config } from '../fe-constants';

export const nextReduxWrapper = createWrapper(makeStore, { debug: true });

// NOTE just store hydration data to allow select where it will be need
function hydrate (state = {}, action) {
  if (action.type === HYDRATE) {
    return action.payload;
  }
  return state;
}

function makeStore () {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
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
  return store;
}
