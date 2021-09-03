
// outsource dependencies
import React, { memo } from 'react';
import App from 'next/app';
import { END } from 'redux-saga';
import { nextReduxWrapper } from '../store/store';
import { subscribeAction, useControllerSubscribe } from 'redux-saga-controller';

// inject common stylesheets
import '../src/styles/index.scss';

// local dependencies
import { appCtrl } from '../src/app-controller';


// class WrappedApp extends App {
//   render () {
//     const { Component, pageProps } = this.props;
//     return <Component {...pageProps} />;
//   }
// }

const WrappedApp = memo(function App ({ Component, pageProps }) {
  return <Component {...pageProps} />;
});
// WrappedApp.getInitialProps = async ({ Component, ctx }) => {
//   // NOTE server side run initialization
//   ctx.store.dispatch(subscribeAction(appCtrl));
//   ctx.store.dispatch(appCtrl.action.initialize());
//   // NOTE end the saga
//   ctx.store.dispatch(END);
//
//   await ctx.store.sagaTask.toPromise();
// };

// export const getStaticProps = nextReduxWrapper.getStaticProps(
//   store => async ({ req, res, ...etc }) => {
//     // NOTE server side run initialization
//     store.dispatch(subscribeAction(appCtrl));
//     store.dispatch(appCtrl.action.initialize());
//     // NOTE end the saga
//     store.dispatch(END);
//
//     await store.sagaTask.toPromise();
//   }
// );

// WrappedApp.getInitialProps = async ({ Component, ctx }) => {
//   // 1. Wait for all page actions to dispatch
//   const pageProps = { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) };
//   // 2. Stop the saga if on server
//   if (ctx.req) {
//     ctx.store.dispatch(END);
//     await ctx.store.sagaTask.toPromise();
//   }
//   console.log('WrappedApp.getInitialProps', pageProps);
//   await delay(5e3);
//   // 3. Return props
//   return { pageProps };
// };

export default nextReduxWrapper.withRedux(WrappedApp);

function delay (delay) { return new Promise(resolve => setTimeout(resolve, delay, {})); }
