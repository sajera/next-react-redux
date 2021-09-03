
// outsource dependencies
import React from 'react';
import App from 'next/app';

// inject common stylesheets
import '../fe-styles/index.scss';

// local dependencies
import { Main } from '../fe-pages/_app';
import { nextReduxWrapper } from '../fe-services/store.service';

// configure

/**
 * please do not break Next caches
 *        ¯\_(ツ)_/¯
 */
class WrappedApp extends App {
  render () {
    const { Component, pageProps } = this.props;
    return <Main> <Component {...pageProps} /> </Main>;
  }
}

export default nextReduxWrapper.withRedux(WrappedApp);
