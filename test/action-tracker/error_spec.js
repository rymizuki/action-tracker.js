import CustomError from 'action-tracker/error'

describe('ActionTracker.CustomError', function () {
  describe('new CustomError(message)', function () {
    describe('constructor', function () {
      it('should be has property name', function () {
        var e = new CustomError('message')
        assert.equal(e.name, 'message')
      })
      it('should be has property message', function () {
        var e = new CustomError('message')
        assert.equal(e.message, 'message')
      })
      it('should be has property stack is ""', function () {
        var e = new CustomError('message')
        assert.equal(e.stack, '')
      })
      it('should be has property ua', function () {
        var e = new CustomError('message')
        assert.equal(e.ua, navigator.userAgent)
      })
    })
    describe('instance', function () {
      var instance;
      beforeEach(function () {
        instance = new CustomError('message')
      })
      afterEach(function () {
        instance = null
      })
      describe('.jsonify()', function () {
        it('should be has property name', function () {
          assert.equal(instance.jsonify().name, 'message')
        })
        it('should be has property message', function () {
          assert.equal(instance.jsonify().message, 'message')
        })
        it('should be has property stack', function () {
          assert.equal(instance.jsonify().stack, '')
        })
        it('should be has property ua', function () {
          assert.equal(instance.jsonify().ua, navigator.userAgent)
        })
      })
      describe('.stringify', function () {
        it('should be string', function () {
          assert.equal(instance.stringify(), JSON.stringify({
            name: 'message',
            message: 'message',
            stack: '',
            ua: navigator.userAgent
          }))
        })
      })
    })
  })
  describe('new CustomError(error)', function () {
    describe('constructor', function () {
      var exception = null
      beforeEach(function () {
        exception = new Error('message')
      })
      it('should be has property name', function () {
        var e = new CustomError(exception)
        assert.equal(e.name, 'Error')
      })
      it('should be has property message', function () {
        var e = new CustomError(exception)
        assert.equal(e.message, 'message')
      })
      it('should be has property stack', function () {
        var e = new CustomError(exception)
        if (navigator.userAgent.indexOf(/Chrome/) > 0) {
          assert(/^Error: message/.test(e.stack))
        } else if (navigator.userAgent.indexOf(/PhantomJS/) > 0) {
          assert.equal(e.stack, '')
        } else if (navigator.userAgent.indexOf(/Safari/) > 0) {
          assert(/^http:\/\//.test(e.stack))
        }
      })
      it('should be has property ua', function () {
        var e = new CustomError(exception)
        assert.equal(e.ua, navigator.userAgent)
      })
    })
    describe('instance', function () {
      var instance;
      beforeEach(function () {
        instance = new CustomError(new Error('message'))
      })
      afterEach(function () {
        instance = null
      })
      describe('.jsonify()', function () {
        it('should be has property name', function () {
          assert.equal(instance.jsonify().name, 'Error')
        })
        it('should be has property message', function () {
          assert.equal(instance.jsonify().message, 'message')
        })
        it('should be has property stack', function () {
          var stack = instance.jsonify().stack
          if (navigator.userAgent.indexOf(/Chrome/) > 0) {
            assert(/^Error: message/.test(stack))
          } else if (navigator.userAgent.indexOf(/PhantomJS/) > 0) {
            assert.equal(stack, '')
          } else if (navigator.userAgent.indexOf(/Safari/) > 0) {
            assert(/^http:\/\//.test())
          }
        })
        it('should be has property ua', function () {
          assert.equal(instance.jsonify().ua, navigator.userAgent)
        })
      })
      describe('.stringify', function () {
        it('should be string', function () {
          assert.equal(instance.stringify(), JSON.stringify({
            name: 'Error',
            message: 'message',
            stack: instance.stack,
            ua: navigator.userAgent
          }))
        })
      })
    })
  })
  describe('new CustomError(message, {data: data})', function () {
    describe('constructor', function () {
      it('should be have property options.data', function () {
        var data = {'hoge': 'fuga'}
        var e = new CustomError('message', {data: data})
        assert.equal(e.options.data, data)
      })
    })
    describe('instance', function () {
      var instance;
      beforeEach(function () {
        instance = new CustomError('message', {data: {hoge: 'fuga'}})
      })
      afterEach(function () {
        instance = null
      })
      describe('.jsonify()', function () {
        it('should be have property `hoge`', function () {
          assert.equal(instance.jsonify().hoge, 'fuga')
        })
      })
      describe('.stringify', function () {
        it('should be string', function () {
          assert.equal(instance.stringify(), JSON.stringify({
            hoge: 'fuga',
            name: 'message',
            message: 'message',
            stack: '',
            ua: navigator.userAgent
          }))
        })
      })
    })
  })
})
