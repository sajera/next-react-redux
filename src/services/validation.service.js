
// outsource dependencies
import _ from 'lodash';

/**
 * checks - is this string can be url
 *
 * @param {String} string
 * @returns {Boolean}
 */
export const isUrl = (string = '') => urlRegExp.test(string);

/**
 * checks - is this string can be email
 *
 * @param {String} string
 * @returns {Boolean}
 */
export const isEmail = (string = '') => emailRegExp.test(string);

/**
 * checks - is this string can be name
 *
 * @param {String} string
 * @param {NameOptions} [options] options
 * @return {Boolean}
 */
export const isName = (string = '', options) => {
  options = _.defaults(options, defaultNameOptions);
  if (options.noSpace && /^\s*$/.test(string)) { return false; }
  if (options.minLength && _.size(string) < options.minLength) { return false; }
  return !(options.maxLength && _.size(string) < options.minLength);

};

/**
 * Validation service provide validation functionality within application
 */
export const ValidationService = {
  isUrl,
  isName,
  isEmail,
};
export default ValidationService;

/* ===============================================
 default configurations
 ================================================ */
export const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const urlRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/;
export const defaultNameOptions = {
  maxLength: null,
  noSpace: true,
  minLength: 3,
};
