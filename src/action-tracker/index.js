import Tracker        from './tracker';
import * as providers from './providers';

function tracker (options = {}) {
  return new Tracker(options);
}

tracker.Tracker  = Tracker;
tracker.Provider = providers

var __cached = null;
function __getTracker () {
  return __cached || (__cached = tracker());
}

var methods = [
  'set',
  'send',
  'pageview',
  'emit',
  'exception',
];

for (let index=0; index<methods.length; index++) {
  let methodName = methods[index];
  tracker[methodName] = function () {
    let t = __getTracker();
    return t[methodName].apply(t, arguments);
  }
}

export default tracker;
