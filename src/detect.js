var getPrototypeOf = require('./getPrototypeOf').getPrototypeOf

function detectNativeOverrides() {
  var overridden = []
  if (Object.getOwnPropertyNames) {
    var iframe, freshWindow, objects, serializer;

    function setup() {
      var d = window.document
      iframe = d.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = 'javascript:false'; // eslint-disable-line no-script-url
      d.getElementsByTagName('script')[0].parentNode.appendChild(iframe)
      freshWindow = iframe.contentWindow
      objects = getKeys(freshWindow)
      serializer = iframe.contentWindow.Function.prototype.toString
    }

    function teardown() {
      iframe.parentNode.removeChild(iframe)
    }

    function checkWindowObject(key) {
      var fn = safeEval(key)
      if (typeof fn !== 'function') {
        return
      }

      checkIsNativeFunction(key, fn)
    }

    function safeEval(key) {
      var fn = window
      key = [].slice.call(key) // TODO do this with indexes
      while (fn && key.length) {
        try {
          fn = fn[key.shift()]
          if (fn && fn.constructor && fn.constructor.name === 'Promise' && typeof fn.catch === 'function') {
            fn.catch(function(){})
          }
        }
        catch (e) {
          return
        }
      }
      return fn
    }

    function checkIsNativeFunction(key, fn) {
      console.assert(typeof fn === 'function')
      if (isNativeFunction(fn)) {
        // fn is native
        return
      }

      // fn is masked, but possibly not directly hijacked

      function getAncestorObject(ancestor) {
        var obj = window, i = 0
        while (i < ancestor.length - 1) {
          obj = obj[ancestor[i++]]
        }
        return obj
      }

      var ancestor = key
      var backups = []

      // delete all the way up the prototype chain
      while (ancestor = getPrototypeOf(ancestor)) {
        backups.push([ancestor, safeEval(ancestor)])
        delete getAncestorObject(ancestor)[key[key.length - 1]]
      }


      // we deleted all the way up the prototype chain
      // if we still are masked, we are directly hijacked
      var _fn = safeEval(key)
      if (_fn && !isNativeFunction(_fn)) {
        overridden.push(key.join('.'))
      }

      for (var i = backups.length - 1; i >= 0; i--) {
        var tuple = backups[i]
        var ancestor = tuple[0]
        var object = getAncestorObject(ancestor)
        var prop = key[key.length - 1]
        if (object[prop] !== tuple[1]) {
          object[prop] = tuple[1]
        }
      }
    }

    function toString(fn) {
      return serializer.call(fn)
    }

    function isNativeFunction(fn) {
      console.assert(typeof fn === 'function')
      return /\[native code\]/.test(toString(fn))
    }

    function getKeys(obj) {
      var names = Object.getOwnPropertyNames(obj)
      for (var key in obj)
        names.indexOf(key) === -1 && names.push(key)
      return names
    }

    setup()
    for (var objectIndex = 0; objectIndex < objects.length; objectIndex++) {
      var objectKey = objects[objectIndex]
      if (['window', 'self', 'top', 'parent', 'frames', 'content'].indexOf(objectKey) > -1) {
        continue
      }

      if (freshWindow[objectKey] &&
          (typeof freshWindow[objectKey] === 'object' || typeof freshWindow[objectKey] === 'function')) {
        checkWindowObject([objectKey])

        var propertyNames = []
        try {
          propertyNames = getKeys(freshWindow[objectKey])
        }
        catch (e) {;}
        for (var i = 0; i < propertyNames.length; i++) {
          checkWindowObject([objectKey, propertyNames[i]])
        }

        if (freshWindow[objectKey].prototype) {
          propertyNames = getKeys(freshWindow[objectKey].prototype)
          for (var i = 0; i < propertyNames.length; i++) {
            checkWindowObject([objectKey, 'prototype', propertyNames[i]])
          }
        }
      }
    }
    teardown()
  }

  return overridden
}

exports.detectNativeOverrides = detectNativeOverrides
