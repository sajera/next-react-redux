/* eslint-disable */

'use strict';

const environment = {
  HOST_PATH: process.env.NEXT_PUBLIC_HOST_PATH,
  SERVICE_URL: process.env.NEXT_PUBLIC_SERVICE_URL,
  TIME_FORMAT: process.env.NEXT_PUBLIC_CLIENT_TIME_FORMAT,
  PRODUCTION: isEnabled(process.env.NEXT_PUBLIC_PRODUCTION),
  DEBUG: isEnabled(process.env.NEXT_PUBLIC_DEBUG) || isDebugEnabledByLocation(),
};

environment.DEBUG && console.info('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
  , '\n config:', environment
);

// NOTE get value by prop name or defaults in case environment variable is undefined
export const config = (prop, defaults) => typeof prop !== 'string' || typeof environment[prop] === 'undefined' ? defaults : environment[prop];

export default config;

function isDebugEnabledByLocation () {
  // NOTE window might by absent on ssr
  return typeof window !== 'undefined' && typeof window.location !== 'undefined' && /show_APP_DEBUG/.test(window.location.href);
}

function isEnabled (value) {
  return /^(true|1)$/i.test(value);
}
