import CustomError from './error';

function __plantResolver (resolve, fn) {
  return function () {
    fn && fn.apply(this, arguments);
    resolve();
  };
}

export default class Tracker {
  constructor (options={}) {
    if (null != options.name) {
      this.name = options.name;
    }
    if (null != options.id) {
      this.id = options.id;
      this.__create(options.id, options)
    }
    if (null != options.exception && 'function' == typeof options.exception) {
      this.__createException = options.exception.bind(this);
    }
  }
  __named (name) {
    return this.name ? this.name + '.' + name : name;
  }
  __create (id, options={}) {
    return new Promise(function (resolve) {
      options.hitCallback = __plantResolver(resolve, options.hitCallback);
      ga(this.__named('create'), id, (options || 'auto'));
    });
  }
  __set (name, value) {
    ga(this.__named('set'), name, value);
  }
  __send (name, options={}) {
    return new Promise((resolve) => {
      options.hitCallback = __plantResolver(resolve, options.hitCallback);
      ga(this.__named('send'), name, options);
    });
  }
  __createException (err, options) {
    return new CustomError(err, options);
  }
  set () {
    return this.__set.apply(this, arguments);
  }
  send () {
    return this.__send.apply(this, arguments);
  }
  pageview (path, options={}) {
    if (path) { this.set('page', path); }
    return this.send('pageview', options);
  }
  emit (eventCategory, eventAction, eventLabel='', eventValue=null) {
    return this.send('event', {
      eventCategory,
      eventAction,
      eventLabel,
      eventValue
    });
  }
  exception (err, options={}) {
    var exception = this.__createException(err, options);
    return this.send('exception', {
      exDescription: exception.stringify(),
      exFatal: options.fatal || false
    })
  }
}
