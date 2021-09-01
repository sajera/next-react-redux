
// outsource dependencies
import ReduxToastr from 'react-redux-toastr';
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';
import { Route, Switch, Redirect, Router } from 'react-router-dom';

// local dependencies
import { config } from './constants';
import controller from './controller';
import Preloader from './components/preloader';


export default memo(function App ({ children }) {
  // NOTE subscribe app controller
  const [{ initialized }, { initialize }] = useController(controller);
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
