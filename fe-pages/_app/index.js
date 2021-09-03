
// outsource dependencies
import ReduxToastr from 'react-redux-toastr';
import React, { memo, useEffect } from 'react';
import { useControllerActions, useControllerData, useControllerSubscribe } from 'redux-saga-controller';

// local dependencies
import { appRootCtrl } from './controller';
import { Maintenance } from './maintenance';

// NOTE subscribe app controller only on FE side no sense to do this for SSR
export const Main = memo(function Main ({ children }) {
  useControllerSubscribe(appRootCtrl);
  const { initialize } = useControllerActions(appRootCtrl);
  const { health, initialized } = useControllerData(appRootCtrl);
  // NOTE initialize auth logic
  useEffect(() => { initialize(); }, [initialize]);
  // NOTE internal API(BE) does not ready to provide information or handle any actions
  if (!health) { return <Maintenance />; }
  // IMPORTANT do not add any preloader here !!! only common things
  // TODO notify (modal/toasts/alerts/etc...)
  return <>
    { !initialized ? 'process auth' : 'DONE' }
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
