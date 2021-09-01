
// outsource dependencies
import React from 'react';
import App from 'next/app';
import { END } from 'redux-saga';
import { nextReduxWrapper } from '../src/store';

// inject common stylesheets
import '../src/styles/index.scss';

class WrappedApp extends App {
  render () {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

WrappedApp.getInitialProps = async ({ Component, ctx }) => {
  // 1. Wait for all page actions to dispatch
  const pageProps = { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) };
  // 2. Stop the saga if on server
  if (ctx.req) {
    ctx.store.dispatch(END);
    await ctx.store.sagaTask.toPromise();
  }
  console.log('WrappedApp.getInitialProps', pageProps);
  await delay(5e3);
  // 3. Return props
  return { pageProps };
};

export default nextReduxWrapper.withRedux(App);

function delay (delay) { return new Promise(resolve => setTimeout(resolve, delay, {})); }
