import Tracker from './tracker';

function tracker (options) {
  return new Tracker(options);
}

tracker.Tracker = Tracker;

var __cached = null;
function __getTracker () {
  return __cached || (__cached = tracker());
}

var methods = [
  'set',
  'send',
  'pageview',
  'emit',
];

for (let index=0; index<methods.length; index++) {
  let methodName = methods[index];
  tracker[methodName] = function () {
    let t = __getTracker();
    return t[methodName].apply(t, arguments);
  }
}

export default tracker;
