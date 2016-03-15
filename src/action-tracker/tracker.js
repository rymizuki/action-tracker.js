import CustomError     from './error';
import GoogleAnalytics from './providers/google-analytics';

export default class Tracker {
  constructor (options={}) {
    this.provider = null != options.provider ? options.provider : new GoogleAnalytics(options);

    if (null != options.exception && 'function' == typeof options.exception) {
      this.createException = options.exception.bind(this);
    }
  }
  set (name, value) {
    return this.provider.set(name, value);
  }
  send (name, options={}) {
    return this.provider.send(name, options);
  }
  pageview (path, options={}) {
    return this.provider.pageview(path, options);
  }
  emit (category, action, label='', value=null) {
    return this.provider.emit(category, action, label, value);
  }
  exception (err, options={}) {
    var exception = this.createException(err, options);
    return this.provider.exception(exception, options);
  }
  createException (err, options) {
    return new CustomError(err, options);
  }
}
