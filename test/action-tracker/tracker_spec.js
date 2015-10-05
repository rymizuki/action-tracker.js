import Tracker from 'action-tracker/tracker'

describe('ActionTracker', function () {
  describe('.Tracker', function () {
    it('should be has property `Tracker`', function () {
      assert.ok(Tracker != null)
      assert.ok('function' == typeof Tracker)
    })
  })
})

describe('Tracker', function () {
  beforeEach(function () {
    global.ga = sinon.stub()
  })
  afterEach(function () {
  })
  describe('.set()', function () {
    describe('default ActionTracker', function () {
      it('should be call `ga("set", name, value)`', function () {
        var visitor = new Tracker()
        visitor.set('path', '/')
        assert.ok(global.ga.calledOnce)
        assert.ok(global.ga.calledWith('set', 'path', '/'))
      })
    })
    describe('named tracker', function () {
      it('should be call `ga("myname.set", name, value)`', function () {
        var visitor = new Tracker({name: 'myname'})
        visitor.set('path', '/')
        assert.ok(global.ga.calledOnce)
        assert.ok(global.ga.calledWith('myname.set', 'path', '/'))
      })
    })
  })
  describe('.send', function () {
    it('should be return promise instance', function () {
      var visitor = new Tracker()
      var result = visitor.send('pageview', {title: 'my title'})
      assert.ok(result.then != null && 'function' == typeof result.then)
    })
    describe('default ActionTracker', function () {
      it('should be call `ga("send", name, value)`', function () {
        var options = {title: 'my title'},
            visitor = new Tracker()
        visitor.send('pageview', options)
        assert.ok(global.ga.calledOnce);
        assert.ok(global.ga.calledWith('send', 'pageview', options))
      })
    })
    describe('named ActionTracker', function () {
      it('should be call `ga("myname.send", name, value)`', function () {
        var options = {title: 'my title'},
            visitor = new Tracker({name: 'myname'})
        visitor.send('pageview', options)
        assert.ok(global.ga.calledOnce);
        assert.ok(global.ga.calledWith('myname.send', 'pageview', options))
      })
    });
  })
  describe('.pageview', function () {
    it('should be return promise instance', function () {
      var visitor = new Tracker()
      var result = visitor.pageview()
      assert.ok(result.then != null && 'function' == typeof result.then)
    })
    describe('non arguments', function () {
      it('should be call `ga("send", "pageview")`', function () {
        var visitor = new Tracker()
        visitor.pageview()
        assert.ok(global.ga.calledOnce)
        assert.equal(global.ga.args[0][0], 'send')
        assert.equal(global.ga.args[0][1], 'pageview')
      })
    })
    describe('override path', function () {
      it('should be call `ga("set", "page", path)` and ga("send", "pageview")`', function () {
        var visitor = new Tracker()
        visitor.pageview('/')
        assert.ok(global.ga.calledTwice)
        assert.equal(global.ga.args[0][0], 'set')
        assert.equal(global.ga.args[0][1], 'page')
        assert.equal(global.ga.args[0][2], '/')
        assert.equal(global.ga.args[1][0], 'send')
        assert.equal(global.ga.args[1][1], 'pageview')
      })
    })
  })
  describe('.emit', function () {
    it('should be return promise instance', function () {
      var visitor = new Tracker()
      var result = visitor.emit('category', 'action')
      assert.ok(result.then != null && 'function' == typeof result.then)
    })
    describe('.emit(category, action)', function () {
      it('should be call `ga("send", "event", options)`', function () {
        var visitor = new Tracker()
        visitor.emit('category', 'action')
        assert.ok(global.ga.calledOnce)
        assert.equal(global.ga.args[0][0], 'send')
        assert.equal(global.ga.args[0][1], 'event')
        assert.equal(global.ga.args[0][2].eventCategory, 'category')
        assert.equal(global.ga.args[0][2].eventAction, 'action')
        assert.equal(global.ga.args[0][2].eventLabel, '')
      })
    })
    describe('.emit(category, action, label)', function () {
      it('should be call `ga("send", "event", options)`', function () {
        var visitor = new Tracker()
        visitor.emit('category', 'action', 'label')
        assert.ok(global.ga.calledOnce)
        assert.equal(global.ga.args[0][0], 'send')
        assert.equal(global.ga.args[0][1], 'event')
        assert.equal(global.ga.args[0][2].eventCategory, 'category')
        assert.equal(global.ga.args[0][2].eventAction, 'action')
        assert.equal(global.ga.args[0][2].eventLabel, 'label')
      })
    })
    describe('.emit(category, action, label, value)', function () {
      it('should be call `ga("send", "event", options)`', function () {
        var visitor = new Tracker()
        visitor.emit('category', 'action', 'label', 1)
        assert.ok(global.ga.calledOnce)
        assert.equal(global.ga.args[0][0], 'send')
        assert.equal(global.ga.args[0][1], 'event')
        assert.equal(global.ga.args[0][2].eventCategory, 'category')
        assert.equal(global.ga.args[0][2].eventAction, 'action')
        assert.equal(global.ga.args[0][2].eventLabel, 'label')
        assert.equal(global.ga.args[0][2].eventValue, 1)
      })
    })
  })
  describe('.exception', function () {
    it('should be return promise instance', function () {
      var visitor = new Tracker()
      var result = visitor.exception('type error')
      assert.ok(result.then != null && 'function' == typeof result.then)
    })
    describe('.exception(message)', function () {
      it('should be ga("exception", {exDescription: message, exFatal: false})', function () {
        var visitor = new Tracker()
        visitor.exception('type error')
        assert.ok(global.ga.calledOnce)
        assert.equal(global.ga.args[0][0], 'send')
        assert.equal(global.ga.args[0][1], 'exception')
        assert.equal(global.ga.args[0][2].exDescription, 'type error')
        assert.equal(global.ga.args[0][2].exFatal, false)
      })
    })
    describe('.exception(message, {fatal: false})', function () {
      it('should be ga("exception", {exDescription: message, exFatal: false})', function () {
        var visitor = new Tracker()
        visitor.exception('type error', {fatal: false})
        assert.ok(global.ga.calledOnce)
        assert.equal(global.ga.args[0][0], 'send')
        assert.equal(global.ga.args[0][1], 'exception')
        assert.equal(global.ga.args[0][2].exDescription, 'type error')
        assert.equal(global.ga.args[0][2].exFatal, false)
      })
    })
    describe('.exception(message, {fatal: true})', function () {
      it('should be ga("exception", {exDescription: message, exFatal: true})', function () {
        var visitor = new Tracker()
        visitor.exception('type error', {fatal: true})
        assert.ok(global.ga.calledOnce)
        assert.equal(global.ga.args[0][0], 'send')
        assert.equal(global.ga.args[0][1], 'exception')
        assert.equal(global.ga.args[0][2].exDescription, 'type error')
        assert.equal(global.ga.args[0][2].exFatal, true)
      })
    })
  })
})
