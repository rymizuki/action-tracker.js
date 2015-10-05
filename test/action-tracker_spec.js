import ActionTracker from 'action-tracker'

describe('expose', function () {
  describe('window', function () {
    it('should be has property `ActionTracker`', function () {
      assert.ok(ActionTracker != null)
      assert.ok(typeof  ActionTracker === 'function')
    })
  })
})

describe('ActionTracker()', function () {
  it('should be return `Tracker` instance', function () {
    assert.ok(ActionTracker() instanceof ActionTracker.Tracker);
  })
})

describe('ActionTracker.set', function () {
  var stub;
  beforeEach(function () {
    stub = sinon.stub(ActionTracker.Tracker.prototype, 'set')
  })
  afterEach(function () {
    stub.restore();
  })
  it('should be called tracker.set', function () {
    ActionTracker.set('page', '/')
    assert.ok(stub.calledOnce);
    assert.equal(stub.args[0][0], 'page');
    assert.equal(stub.args[0][1], '/');
  })
})

describe('ActionTracker.send', function () {
  var stub;
  beforeEach(function () {
    stub = sinon.stub(ActionTracker.Tracker.prototype, 'send')
  })
  afterEach(function () {
    stub.restore();
  })
  it('should be called tracker.send', function () {
    var options = {title: 'my name'}
    ActionTracker.send('pageview', options)
    assert.ok(stub.calledOnce);
    assert.equal(stub.args[0][0], 'pageview');
    assert.equal(stub.args[0][1], options);
  })
})

describe('ActionTracker.pageview', function () {
  var stub;
  beforeEach(function () {
    stub = sinon.stub(ActionTracker.Tracker.prototype, 'pageview')
  })
  afterEach(function () {
    stub.restore();
  })
  describe('pageview()', function () {
    it('should be called tracker.pageview()', function () {
      ActionTracker.pageview()
      assert.ok(stub.calledOnce);
      assert.equal(stub.args[0].toString(), [].toString());
    })
  })
  describe('pageview(path)', function () {
    it('should be called tracker.pageview(path)', function () {
      ActionTracker.pageview('/')
      assert.ok(stub.calledOnce);
      assert.equal(stub.args[0][0], '/');
    })
  })
})

describe('ActionTracker.emit', function () {
  var stub;
  beforeEach(function () {
    stub = sinon.stub(ActionTracker.Tracker.prototype, 'emit')
  })
  afterEach(function () {
    stub.restore();
  })
  describe('emit(category, action)', function () {
    it('should be called tracker.emit(category, emit)', function () {
      ActionTracker.emit('category', 'action')
      assert.ok(stub.calledOnce);
      assert.equal(stub.args[0][0], 'category');
      assert.equal(stub.args[0][1], 'action');
      assert.equal(stub.args[0][2], null);
      assert.equal(stub.args[0][3], null);
    })
  })
  describe('emit(category, action, label)', function () {
    it('should be called tracker.emit(category, emit, label)', function () {
      ActionTracker.emit('category', 'action', 'label')
      assert.ok(stub.calledOnce);
      assert.equal(stub.args[0][0], 'category');
      assert.equal(stub.args[0][1], 'action');
      assert.equal(stub.args[0][2], 'label');
      assert.equal(stub.args[0][3], null);
    })
  })
  describe('emit(category, action, value)', function () {
    it('should be called tracker.emit(category, emit, label, value)', function () {
      ActionTracker.emit('category', 'action', 'label', 1)
      assert.ok(stub.calledOnce);
      assert.equal(stub.args[0][0], 'category');
      assert.equal(stub.args[0][1], 'action');
      assert.equal(stub.args[0][2], 'label');
      assert.equal(stub.args[0][3], 1);
    })
  })
})

describe('ActionTracker.exception', function () {
  var stub;
  beforeEach(function () {
    stub = sinon.stub(ActionTracker.Tracker.prototype, 'exception')
  })
  afterEach(function () {
    stub.restore();
  })
  describe('.exception(error)', function () {
    it('should be called tracker.exception(error)', function () {
      ActionTracker.exception('type error')
      assert.ok(stub.calledOnce)
      assert.equal(stub.args[0][0], 'type error')
      assert.equal(stub.args[0][1], null)
    })
  })
  describe('.exception(error, {fatal: false})', function () {
    it('should be called tracker.exception(error, {fatal: false})', function () {
      ActionTracker.exception('type error', {fatal: false})
      assert.ok(stub.calledOnce)
      assert.equal(stub.args[0][0], 'type error')
      assert.equal(stub.args[0][1].fatal, false)
    })
  })
  describe('.exception(error, {fatal: true})', function () {
    it('should be called tracker.exception(error, {fatal: true})', function () {
      ActionTracker.exception('type error', {fatal: true})
      assert.ok(stub.calledOnce)
      assert.equal(stub.args[0][0], 'type error')
      assert.equal(stub.args[0][1].fatal, true)
    })
  })
  describe('.exception(error, {fatal: true, data: {hoge: fuga}})', function () {
    it('should be called tracker.exception(error, {fatal: true})', function () {
      ActionTracker.exception('type error', {fatal: true, data: {hoge: 'fuga'}})
      assert.ok(stub.calledOnce)
      assert.equal(stub.args[0][0], 'type error')
      assert.equal(stub.args[0][1].fatal, true)
      assert.equal(stub.args[0][1].data.hoge, 'fuga')
    })
  })
})
