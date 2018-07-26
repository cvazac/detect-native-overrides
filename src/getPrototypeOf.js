function getPrototypeOf(key) {
  var methodName = key[key.length - 1]
  var superClassName = getSuperClassName(key.length === 1 ? window : window[key[0]], methodName)
  if (superClassName) {
    return [superClassName, 'prototype', methodName]
  }
}

function getSuperClassName(obj, methodName) {
  // this block is to take care of Image/HTMLImageElement
  // Image.prototype === HTMLImageElement.prototype, and yet:
  //   Object.getPrototypeOf(Image) !== Object.getPrototypeOf(HTMLImageElement)
  // The correct parent of Image is HTMLElement, but we have to get it through HTMLImageElement.
  if (obj.prototype &&
      obj.prototype.constructor &&
      obj.prototype.constructor.name &&
      obj.prototype.constructor.name !== obj.name) {
    return getSuperClassName(obj.prototype.constructor, methodName)
  }

  if (Object.getPrototypeOf(obj) === Window.prototype) {
    if (obj !== window) debugger;
  }


  var prototypeOf = Object.getPrototypeOf(obj)
  var superClassName = prototypeOf && (prototypeOf.name || (prototypeOf.constructor && prototypeOf.constructor.name))
  if (superClassName) {
    return superClassName === obj.name || !window[superClassName] || !window[superClassName].prototype[methodName]
      ? getSuperClassName(prototypeOf, methodName)
      : superClassName
  }
}

exports.getPrototypeOf = getPrototypeOf
