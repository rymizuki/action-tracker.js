describe('expose', function () {
  describe('window', function () {
    it('should be has property `tracker`', function () {
      assert.ok(tracker != null)
      assert.ok(typeof tracker === 'function')
    })
  })
})

describe('tracker', function () {
  describe('.Tracker', function () {
    it('should be has property `Tracker`', function () {
      assert.ok(tracker.Tracker != null)
      assert.ok('function' == typeof tracker.Tracker)
    })
  })
})

var window = {};

describe('Tracker', function () {
  var ga;
  beforeEach(function () {
    window.ga = sinon.stub()
  })
  afterEach(function () {
  })
  describe('.set()', function () {
    describe('default tracker', function () {
      it('should be call `ga("set", name, value)`', function () {
        var visitor = new tracker.Tracker()
        visitor.set('path', '/')
        assert.ok(window.ga.calledOnce)
        assert.ok(window.ga.calledWith('set', 'path', '/'))
      })
    })
    describe('named tracker', function () {
      it('should be call `ga("myname.set", name, value)`', function () {
        var visitor = new tracker.Tracker({name: 'myname'})
        visitor.set('path', '/')
        assert.ok(window.ga.calledOnce)
        assert.ok(window.ga.calledWith('myname.set', 'path', '/'))
      })
    })
  })
  describe('.send', function () {
    it('should be return promise instance', function () {
      var visitor = new tracker.Tracker()
      var result = visitor.send('pageview', {title: 'my title'})
      assert.ok(result.then != null && 'function' == typeof result.then)
    })
    describe('default tracker', function () {
      it('should be call `ga("send", name, value)`', function () {
        var options = {title: 'my title'},
            visitor = new tracker.Tracker()
        visitor.send('pageview', options)
        assert.ok(window.ga.calledOnce);
        assert.ok(window.ga.calledWith('send', 'pageview', options))
      })
    })
    describe('named tracker', function () {
      it('should be call `ga("myname.send", name, value)`', function () {
        var options = {title: 'my title'},
            visitor = new tracker.Tracker({name: 'myname'})
        visitor.send('pageview', options)
        assert.ok(window.ga.calledOnce);
        assert.ok(window.ga.calledWith('myname.send', 'pageview', options))
      })
    });
  })
  describe('.pageview', function () {
    it('should be return promise instance', function () {
      var visitor = new tracker.Tracker()
      var result = visitor.pageview()
      assert.ok(result.then != null && 'function' == typeof result.then)
    })
    describe('non arguments', function () {
      it('should be call `ga("send", "pageview")`', function () {
        var visitor = new tracker.Tracker()
        visitor.pageview()
        assert.ok(window.ga.calledOnce)
        assert.equal(window.ga.args[0][0], 'send')
        assert.equal(window.ga.args[0][1], 'pageview')
      })
    })
    describe('override path', function () {
      it('should be call `ga("set", "page", path)` and ga("send", "pageview")`', function () {
        var visitor = new tracker.Tracker()
        visitor.pageview('/')
        assert.ok(window.ga.calledTwice)
        assert.equal(window.ga.args[0][0], 'set')
        assert.equal(window.ga.args[0][1], 'page')
        assert.equal(window.ga.args[0][2], '/')
        assert.equal(window.ga.args[1][0], 'send')
        assert.equal(window.ga.args[1][1], 'pageview')
      })
    })
  })
  describe('.emit', function () {
    it('should be return promise instance', function () {
      var visitor = new tracker.Tracker()
      var result = visitor.emit('category', 'action')
      assert.ok(result.then != null && 'function' == typeof result.then)
    })
    describe('.emit(category, action)', function () {
      it('should be call `ga("send", "event", options)`', function () {
        var visitor = new tracker.Tracker()
        visitor.emit('category', 'action')
        assert.ok(window.ga.calledOnce)
        assert.equal(window.ga.args[0][0], 'send')
        assert.equal(window.ga.args[0][1], 'event')
        assert.equal(window.ga.args[0][2].eventCategory, 'category')
        assert.equal(window.ga.args[0][2].eventAction, 'action')
        assert.equal(window.ga.args[0][2].eventLabel, '')
      })
    })
    describe('.emit(category, action, label)', function () {
      it('should be call `ga("send", "event", options)`', function () {
        var visitor = new tracker.Tracker()
        visitor.emit('category', 'action', 'label')
        assert.ok(window.ga.calledOnce)
        assert.equal(window.ga.args[0][0], 'send')
        assert.equal(window.ga.args[0][1], 'event')
        assert.equal(window.ga.args[0][2].eventCategory, 'category')
        assert.equal(window.ga.args[0][2].eventAction, 'action')
        assert.equal(window.ga.args[0][2].eventLabel, 'label')
      })
    })
    describe('.emit(category, action, label, value)', function () {
      it('should be call `ga("send", "event", options)`', function () {
        var visitor = new tracker.Tracker()
        visitor.emit('category', 'action', 'label', 1)
        assert.ok(window.ga.calledOnce)
        assert.equal(window.ga.args[0][0], 'send')
        assert.equal(window.ga.args[0][1], 'event')
        assert.equal(window.ga.args[0][2].eventCategory, 'category')
        assert.equal(window.ga.args[0][2].eventAction, 'action')
        assert.equal(window.ga.args[0][2].eventLabel, 'label')
        assert.equal(window.ga.args[0][2].eventValue, 1)
      })
    })
  })
})
