
// outsource dependencies
import qs from 'qs';
import _ from 'lodash';

// local dependencies
import Param from './param';
import { history } from '../../store';

export default class Route {
    static regParam = /:([^/]*)/gi;

    static secret = Symbol('ROUTE');

    static getSearch = () => String(_.get(history, 'location.search') || '');

    static getPathname = () => String(_.get(history, 'location.pathname') || '');

    static create = (url, options = {}) => {
      if (!_.isString(url)) {
        throw new Error('Route error: first parameter "url" is required and should be a string');
      }
      return new Route(url, options);
    };

    constructor (url, options) {
      this[Route.secret] = {};
      // NOTE prepare public props
      this.ROUTE = Route.defineROUTE(url);
      this.REGEXP = Route.defineREGEXP(this.ROUTE, options.REGEXP);
      this.isActive = Route.defineIsActive(this.REGEXP, options.isActive);
      // NOTE prepare private props
      const queryAnnotation = Route.defineQueryAnnotation(url, options.query);
      const paramsAnnotation = Route.defineParamsAnnotation(this.ROUTE, options.params);
      this[Route.secret].query = queryAnnotation;
      this[Route.secret].params = paramsAnnotation;
      this[Route.secret].parseQuery = Route.defineParseQuery(queryAnnotation, options.parseQuery);
      this[Route.secret].formatQuery = Route.defineFormatQuery(queryAnnotation, options.formatQuery);
      this[Route.secret].parsePath = Route.defineParsePath(this.ROUTE, paramsAnnotation, options.parsePath);
      this[Route.secret].formatPath = Route.defineFormatPath(this.ROUTE, paramsAnnotation, options.formatPath);
    }

    static defineROUTE = url => String(url).replace(/\?.*/, '');

    static defineREGEXP = (url, custom) => (_.isRegExp(custom) ? custom
      : new RegExp(String(url).replace(Route.regParam, '.*'), 'i'));

    static defineIsActive = (regexp, custom) => (_.isFunction(custom) ? custom
      : () => regexp.test(Route.getPathname()));

    static defineFormatPath = (url, annotation, custom) => (_.isFunction(custom) ? custom : options => {
      const params = {};
      annotation.map(rp => rp.from(options, params));
      return String(url).replace(Route.regParam, (match, propName) => encodeURIComponent(params[propName]));
    });

    static defineParsePath = (url, annotation, custom) => (_.isFunction(custom) ? custom : path => {
      const result = {};
      const matcher = new RegExp(String(url).replace(Route.regParam, (a, propName) => `(?<${propName}>[^/]+)`), 'i');
      const params = _.get(String(path).match(matcher), 'groups', {});
      annotation.map(param => param.from(params, result));
      return result;
    });

    static defineFormatQuery = (annotation, custom) => (_.isFunction(custom) ? custom : params => {
      const result = {};
      annotation.map(qp => qp.to(params, result));
      return qs.stringify(result, { addQueryPrefix: true });
    });

    static defineParseQuery = (annotation, custom) => (_.isFunction(custom) ? custom : queryString => {
      const result = {};
      const params = qs.parse(queryString, { ignoreQueryPrefix: true });
      annotation.map(param => param.from(params, result));
      return result;
    });

    static defineQueryAnnotation = (url, options) => {
      const annotation = [];
      // NOTE try to take light annotation from url
      if (/\?/.test(url)) {
        const params = url.split('?')[1].split('&');
        params.map(string => {
          const part = string.split('=');
          const name = part[0];
          const defaults = part[1];
          return annotation.push(Param.create({ name, defaults }));
        });
      }
      if (_.isArray(options)) {
        options.map(qp => {
          // NOTE try to merge annotation from url and from "query" array
          const exist = _.find(annotation, { name: qp.name });
          if (exist) { return exist.applyValidOptions(qp); }
          return annotation.push(Param.create(qp));
        });
      }
      return annotation;
    };

    static defineParamsAnnotation = (url, options) => {
      const annotation = [];
      // NOTE try to take light annotation from url
      if (Route.regParam.test(url)) {
        String(url).replace(Route.regParam, (match, name) => annotation.push(Param.create({ name })));
      }
      if (_.isArray(options)) {
        options.map(rp => {
          // NOTE try to merge annotation from url and from "params" array
          const exist = _.find(annotation, { name: rp.name });
          if (exist) { return exist.applyValidOptions(rp); }
          // NOTE prevent "short" name for url params
          return annotation.push(Param.create({ ...rp, short: rp.name }));
        });
      }
      return annotation;
    };

    LINK = (params, query) => {
      params = Object.assign({}, params);
      query = Object.assign({}, query);
      const formatPath = this[Route.secret].formatPath;
      const formatQuery = this[Route.secret].formatQuery;
      // console.log('%c LINK ', 'color: #156F93; font-weight: bolder; font-size: 12px;'
      //     , '\n ROUT:', this
      //     , '\n params:', params
      //     , '\n query:', query
      //     , '\n formatPath(params):', formatPath(params)
      //     , '\n formatQuery(query):', formatQuery(query)
      // );
      return `${formatPath(params)}${formatQuery(query)}`;
    };

    PARAMS = pathname => this[Route.secret].parsePath(_.isString(pathname) ? pathname : Route.getPathname());

    QUERY = search => this[Route.secret].parseQuery(_.isString(search) ? search : Route.getSearch());

    PUSH = (...args) => history.push(this.LINK(...args));

    REPLACE = (...args) => history.replace(this.LINK(...args));
}
