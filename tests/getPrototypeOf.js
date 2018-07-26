var getPrototypeOf = require('../src/getPrototypeOf').getPrototypeOf

describe('getPrototypeOf', function() {

  //window
  it('should identify the prototype of `addEventListener` as `Window.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['addEventListener']),
        ['Window', 'prototype', 'addEventListener'])
  })
  it('should identify the prototype of `window.addEventListener` as `Window.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['window', 'addEventListener']),
        ['Window', 'prototype', 'addEventListener'])
  })
  it('should identify the prototype of `Window.prototype.addEventListener` as `EventTarget.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['Window', 'prototype', 'addEventListener']),
        ['EventTarget', 'prototype', 'addEventListener'])
  })
  it('should identify the prototype of `EventTarget.prototype.addEventListener` as undefined', function() {
    assert.isUndefined(getPrototypeOf(['EventTarget', 'prototype', 'addEventListener']))
  })

  //performance
  it('should identify the prototype of `performance.addEventListener` as `Performance.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['performance', 'addEventListener']),
      ['Performance', 'prototype', 'addEventListener'])
  })
  it('should identify the prototype of `Performance.prototype.addEventListener` as `EventTarget.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['Performance', 'prototype', 'addEventListener']),
      ['EventTarget', 'prototype', 'addEventListener'])
  })

  // Image
  it('should identify the prototype of `Image.prototype.addEventListener` as `HTMLElement.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['Image', 'prototype', 'addEventListener']),
      ['HTMLElement', 'prototype', 'addEventListener'])
  })
  it('should identify the prototype of `HTMLImageElement.prototype.addEventListener` as `HTMLElement.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['HTMLImageElement', 'prototype', 'addEventListener']),
        ['HTMLElement', 'prototype', 'addEventListener'])
  })
  it('should identify the prototype of `HTMLElement.prototype.addEventListener` as `Element.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['HTMLElement', 'prototype', 'addEventListener']),
        ['Element', 'prototype', 'addEventListener'])
  })
  it('should identify the prototype of `Element.prototype.addEventListener` as `Node.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['Element', 'prototype', 'addEventListener']),
        ['Node', 'prototype', 'addEventListener'])
  })
  it('should identify the prototype of `Node.prototype.addEventListener` as `EventTarget.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['Node', 'prototype', 'addEventListener']),
        ['EventTarget', 'prototype', 'addEventListener'])
  })

  //speechSynthesis
  it('should identify the prototype of `speechSynthesis.addEventListener` as `EventTarget.prototype.addEventListener`', function() {
    assert.deepEqual(getPrototypeOf(['speechSynthesis', 'addEventListener']),
      // SpeechSynthesis doesn't exist on window in Chrome
      ['EventTarget', 'prototype', 'addEventListener'])
  })

  // #toString
  it('should identify the prototype of `Function.prototype.toString` as `Object.prototype.toString`', function() {
    assert.deepEqual(getPrototypeOf(['Function', 'prototype', 'toString']),
        ['Object', 'prototype', 'toString'])
  })
  it('should identify the prototype of `Object.prototype.addEventListener` as undefined', function() {
    assert.isUndefined(getPrototypeOf(['Object', 'prototype', 'addEventListener']))
  })


})
