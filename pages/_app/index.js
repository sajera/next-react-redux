
// outsource dependencies
import React, { memo, useEffect } from 'react';
import App from 'next/app';
import { END } from 'redux-saga';
import { nextReduxWrapper } from '../../src/store';
import {
  subscribeAction,
  useControllerActions,
  useControllerData,
  useControllerSubscribe
} from 'redux-saga-controller';

// inject common stylesheets
import '../../styles/index.scss';

// local dependencies
import { appCtrl } from '../../src/app-controller';
import Preloader from '../../src/components/preloader';
import ReduxToastr from 'react-redux-toastr';


// class WrappedApp extends App {
//   render () {
//     const { Component, pageProps } = this.props;
//     return <Component {...pageProps} />;
//   }
// }

const WrappedApp = memo(function App ({ Component, pageProps }) {
  // NOTE subscribe app controller only on FE side no sense to do this for SSR only public data
  useControllerSubscribe(appCtrl);
  const { helth } = useControllerData(appCtrl);
  const { initialize } = useControllerActions(appCtrl);
  // NOTE initialize auth logic
  useEffect(() => { initialize(); }, [initialize]);
  // IMPORTANT do not add any preloader here !!
  return <>
    <Component { ...pageProps } />
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

export default nextReduxWrapper.withRedux(WrappedApp);

