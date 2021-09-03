
// outsource dependencies
import _ from 'lodash';

// local dependencies

export default class Param {
    static create = options => new Param(options);

    constructor (options) {
      this.applyValidOptions(options);
    }

    applyValidOptions = options => {
      this.name = _.isString(options.name) ? options.name : 'unknown_field_name';
      this.short = _.isString(options.short) ? options.short : this.name;
      this.defaults = !_.isUndefined(options.defaults) ? options.defaults : void(0);
      this.isValid = _.isFunction(options.isValid) ? options.isValid : this.isValid;
      this.archive = _.isFunction(options.archive) ? options.archive : this.archive;
      this.extract = _.isFunction(options.extract) ? options.extract : this.extract;
    };

    archive = v => v;

    extract = v => v;

    isValid = v => Boolean(v);

    to = (data, store) => {
      const value = this.archive(data[this.name]);
      const def = this.archive(this.defaults);
      if (this.isValid(value) && !_.isEqual(value, def)) {
        store[this.short] = value;
      }
    };

    from = (data, store) => {
      const def = this.extract(this.defaults);
      const value = this.extract(data[this.short]);
      store[this.name] = this.isValid(value) ? value : def;
    };
}
