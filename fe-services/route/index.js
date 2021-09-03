
// outsource dependencies

// local dependencies
import Route from './route';
import { NEW_ID } from '../../constants/spec';

export const defineRoute = (...args) => Route.create(...args);
export default defineRoute;

/**
 * Some commonly used annotations
 */
export const ANNOTATION = {
  // NOTE popular params
  ID: opt => ({ name: 'id', defaults: NEW_ID, ...opt }),
  TOKEN: opt => ({ name: 'token', defaults: 'invalid-token', ...opt }),
  // NOTE popular query
  NAME: opt => ({ short: 'n', name: 'name', defaults: '', ...opt }),
  PAGE: opt => ({ short: 'p', name: 'page', archive: Number, extract: Number, defaults: 0, ...opt }),
  SIZE: opt => ({ short: 's', name: 'size', archive: Number, extract: Number, defaults: 10, ...opt }),
  SORT_D: opt => ({ short: 'sd', name: 'sortD', archive: Number, extract: Boolean, defaults: false, ...opt }),
  SORT_F: opt => ({ short: 'sf', name: 'sortF', defaults: 'name', isValid: v => ['name'].indexOf(v) > -1, ...opt }),
};

