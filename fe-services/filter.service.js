
// outsource dependencies
import _ from 'lodash';

/**
 * Filter service provide filters functionality within application
 */
export class FilterService {
  /**
     * formatting html to plain text
     *
     * @param {String} html
     * @returns {String}
     */
  static escapeHtml (html = '') {
    return String(html).replace(/<[^>]*>?/gm, '');
  }

  /**
     * handle string and make enum from it
     *
     * @param {String} string
     * @returns {String}
     */
  static toEnum (string = '') {
    return String(string)
      .replace(/[^\w\d\s]/gi, '')
      .replace(/[\s]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .toUpperCase();
  }

  /**
     * formatting string with server side to human pretty view
     *
     * @param {String} string
     * @returns {String}
     */
  static humanize (string = '') {
    return String(string)
    // from camel case
      .replace(/([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g, '$1$4 $2$3$5')
    // .replace(/([a-z]){1,1}([A-Z])/g, function ( sib, f, s ) { return f+" "+s; })
    // spec
      .replace(/[_-]+/g, ' ')
    // normalize
      .replace(/\s+/g, ' ')
    // trim
      .replace(/^\s*|\s*$/g, '')
    // capitalize
      .toLowerCase()
      .replace(/^.{1,1}/, function (sib) { return sib.toUpperCase(); });
  }

  /**
     * formatting:cut string by options
     *
     * @param {String} string
     * @param {Object} [options]
     * @returns {String}
     */
  static truncate (string = '', options) {
    const { length, end, breakOnWord } = _.defaults(options, defaultTruncateOptions);
    // NOTE skip cases
    if (isNaN(length) || length <= 0) { return ''; }
    if (!_.isString(string) || string.length <= length) { return ''; }
    // NOTE cut source
    string = string.substring(0, length);
    // NOTE cut more to the spice symbol
    if (!breakOnWord) {
      const lastSpace = string.lastIndexOf(' ');
      // NOTE get last space
      if (lastSpace !== -1) {
        string = string.substr(0, lastSpace);
      }
    }
    return string.trim() + end;
  }

  /**
     * formatting number to duration string
     *
     * @param {Number} number
     * @param {Object} [options]
     * @returns {String}
     */
  static duration (number = 0, options) {
    let { format, regDay, regHour, regMin, regSec } = _.defaults(options, defaultDurationOptions);
    number = _.isNumber(number) ? Math.abs(number) : 0;
    format = _.isString(format) ? format : `${regDay}d ${regHour}h ${regMin}m ${regSec}s`;
    let days = 0,
      hours = 0,
      minutes = 0;

    if (new RegExp(regDay).test(format) && number >= durationEqual.days) {
      days = Math.floor(number / durationEqual.days);
      number -= (days * durationEqual.days);
    }

    if (new RegExp(regHour).test(format) && number >= durationEqual.hours) {
      hours = Math.floor(number / durationEqual.hours);
      number -= (hours * durationEqual.hours);
    }

    if (new RegExp(regMin).test(format) && number >= durationEqual.minutes) {
      minutes = Math.floor(number / durationEqual.minutes);
      number -= (minutes * durationEqual.minutes);
    }
    return format
      .replace(regDay, days)
      .replace(regHour, hours)
      .replace(regMin, minutes)
      .replace(regSec, number);
  }

}

export default FilterService;

/* ===============================================
 default configuration
 ================================================ */

export const defaultTruncateOptions = {
  breakOnWord: false,
  length: 10,
  end: '...',
};

export const defaultDurationOptions = {
  // output format
  format: '[D]d [H]h [M]m [S]s',
  // regular expression to parse day
  regDay: '[D]',
  // regular expression to parse hour
  regHour: '[H]',
  // regular expression to parse minute
  regMin: '[M]',
  // regular expression to parse second
  regSec: '[S]',
};

export const durationEqual = {
  // day 24*60*60=86400
  days: 86400,
  // hour 60*60=3600
  hours: 3600,
  // minute 60
  minutes: 60,
  // second 1
  seconds: 1,
};
