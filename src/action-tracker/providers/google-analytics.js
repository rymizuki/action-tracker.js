function __plantResolver (resolve, fn) {
  return function () {
    fn && fn.apply(this, arguments);
    resolve();
  };
}

export default class GoogleAnalytics {
  constructor (options={}) {
    if (null != options.name) {
      this.name = options.name;
    }
    if (null != options.id) {
      this.id = options.id;
      this.__create(options.id, options)
    }
  }
  named (name) {
    return this.name ? this.name + '.' + name : name;
  }
  create (id, options={}) {
    return new Promise(function (resolve) {
      options.hitCallback = __plantResolver(resolve, options.hitCallback);
      ga(this.named('create'), id, (options || 'auto'));
    });
  }
  set (name, value) {
    ga(this.named('set'), name, value);
  }
  send (name, options={}) {
    return new Promise((resolve) => {
      options.hitCallback = __plantResolver(resolve, options.hitCallback);
      ga(this.named('send'), name, options);
    });
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
  exception (exception, options={}) {
    return this.send('exception', {
      exDescription: exception.stringify(),
      exFatal: options.fatal || false
    })
  }
}
