// ==UserScript==
// @name         detect-native-overrides.tm.js
// @include      *
// @run-at       context-menu
// ==/UserScript==

;(function checkWindowOverrides(win) {
  if (!Object.getOwnPropertyNames) {
    return []
  }

  const overridden = []
  let iframe, freshWindow, objects, serializer
  function setup() {
    const d = win.document
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
    isNativeFunction(key) === false &&
    overridden.push(key.join('.'))
  }
  function fromKey(key) {
    let fn = win
    key = [].slice.call(key)
    while (fn && key.length) {
      try {
        fn = fn[key.shift()]
      }
      catch (e) {
        return
      }
    }
    return fn
  }
  function isNativeFunction(key) {
    const fn = fromKey(key)
    if (typeof fn !== 'function') {
      return
    }

    if (!isNonNativeFunction(fn)) {
      return true
    }

    const joined = key.join('.')
    try {
      window.unsafeGlobal = fn;
      eval(`delete ${joined}`)
      return isNonNativeFunction(fromKey(key))
    } finally {
      eval(`${joined} = unsafeGlobal`)
      delete window.unsafeGlobal
    }
    return false
  }
  function toString(fn) {
    return serializer.call(fn)
  }
  function isNonNativeFunction(fn) {
    return typeof fn === 'function' &&
        !/\[native code\]/.test(toString(fn))
  }
  function getKeys(obj) {
    const names = Object.getOwnPropertyNames(obj)
    for (let key in obj)
      names.indexOf(key) === -1 && names.push(key)
    return names
  }

  setup()
  for (let objectIndex = 0; objectIndex < objects.length; objectIndex++) {
    const objectKey = objects[objectIndex]
    if (['window', 'self', 'top', 'parent', 'frames'].indexOf(objectKey) > -1) {
      continue
    }

    if (freshWindow[objectKey] &&
        (typeof freshWindow[objectKey] === 'object' || typeof freshWindow[objectKey] === 'function')) {
      checkWindowObject([objectKey])

      let propertyNames = []
      try {
        propertyNames = getKeys(freshWindow[objectKey])
      }
      catch (e) {;}
      for (let i = 0; i < propertyNames.length; i++) {
        checkWindowObject([objectKey, propertyNames[i]])
      }

      if (freshWindow[objectKey].prototype) {
        propertyNames = getKeys(freshWindow[objectKey].prototype)
        for (let i = 0; i < propertyNames.length; i++) {
          checkWindowObject([objectKey, 'prototype', propertyNames[i]])
        }
      }
    }
  }
  teardown()
  console.warn('checkWindowOverrides', overridden)
  return overridden
})(window);
