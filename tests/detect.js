var detectNativeOverrides = require('../src/detect').detectNativeOverrides

describe('detection suite', function() {
  this.timeout(10000)
  const nop = function nop(){}

  let hijacked = []
  afterEach(function(){
    hijacked.forEach(function(tuple) {
      tuple[0][tuple[1]] = tuple[2]
    })
    hijacked = []
  })

  function hijack(obj, key, fn) {
    const native = obj[key]
    hijacked.push([obj, key, native])
    obj[key] = fn
  }

  function _test(methods, expected) {
    it(`should identify overrides for \`${methods}\``, function () {
      if (!Array.isArray(methods))
        methods = [methods]

      for (var i = 0; i < methods.length; i++) {
        var str = methods[i]

        var split = str.split('.')
        split.unshift('window')

        var object = eval(split.slice(0, split.length - 1).join('.'))
        var method = split[split.length - 1]

        hijack(object, method, nop)
      }

      const overrides = detectNativeOverrides()
      assert.isArray(overrides)

      expected = expected || [str]
      assert.lengthOf(overrides, expected.length)
      assert.deepEqual(overrides, expected)
    })
  }

  // run the tests
  it('should identify no methods as overriden', function() {
    const overrides = detectNativeOverrides()
    assert.isArray(overrides)
    assert.lengthOf(overrides, 0)
  })

  _test('setTimeout')

  _test('requestAnimationFrame')

  _test('addEventListener')
  _test('XMLHttpRequest.prototype.addEventListener')
  _test('XMLHttpRequestUpload.prototype.addEventListener')
  _test('XMLHttpRequestEventTarget.prototype.addEventListener')
  _test('EventTarget.prototype.addEventListener')

  _test('Image.prototype.addEventListener', ['Image.prototype.addEventListener', 'HTMLImageElement.prototype.addEventListener'])
  _test('HTMLImageElement.prototype.addEventListener', ['Image.prototype.addEventListener', 'HTMLImageElement.prototype.addEventListener'])
  _test('HTMLElement.prototype.addEventListener')
  _test('Element.prototype.addEventListener')
  _test('Node.prototype.addEventListener')
  _test('EventTarget.prototype.addEventListener')

  _test('performance.addEventListener')
  _test('Performance.prototype.addEventListener')
  _test('EventTarget.prototype.addEventListener')

})
