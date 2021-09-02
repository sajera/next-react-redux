
// outsource dependencies
import ReduxToastr from 'react-redux-toastr';
import React, { memo, useEffect } from 'react';
import { useControllerData, useControllerActions, useControllerSubscribe } from 'redux-saga-controller';

// local dependencies
import { config } from './constants';
import { appCtrl } from './app-controller';
import Preloader from './components/preloader';


export default memo(function App ({ children }) {
  // NOTE subscribe app controller
  useControllerSubscribe(appCtrl);
  const { initialized } = useControllerData(appCtrl);
  const { initialize } = useControllerActions(appCtrl);
  // NOTE initialize business logic
  useEffect(() => { initialize(); }, [initialize]);
  // NOTE select view based on application state
  if (!initialized) { return <Preloader active={true} />; }
  return <>
    { children }
    <ReduxToastr
      progressBar
      timeOut={2000}
      preventDuplicates
      newestOnTop={false}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  </>;
});
