function isToStringWrapped() {
  var random = Math.random()
  var method = new Function('//' + random)
  if (method.toString().indexOf(random) === -1) {
    return true
  }

  var _ = {}, i
  var methodNames = ['apply', 'call', 'bind', 'toLocaleString', 'toSource']
  for (i = 0; i < methodNames.length; i++) {
    _[methodNames[i]] = Function.prototype[methodNames[i]]
  }

  var trapped = false
  var trap = function () {
    trapped = true
    return arguments[0]
  }

  for (i = 0; i < methodNames.length; i++) {
    Function.prototype[methodNames[i]] = trap
  }

  try {
    method.toString()
  } catch(e){}

  for (i = 0; i < methodNames.length; i++) {
    Function.prototype[methodNames[i]] = _[methodNames[i]]
  }

  return trapped
}

(function(){
  function testApply() {
    var _ = Function.prototype.toString
    Function.prototype.toString = function(){
      return _.apply(this)
    }
    console.info('isToStringWrapped() - testApply', isToStringWrapped())
    Function.prototype.toString = _
  }
  function testCall() {
    var _ = Function.prototype.toString
    Function.prototype.toString = function(){
      return _.call(this)
    }
    console.info('isToStringWrapped() - testCall', isToStringWrapped())
    Function.prototype.toString = _
  }
  function testBind() {
    var _ = Function.prototype.toString
    Function.prototype.toString = function(){
      return _.bind(this)()
    }
    console.info('isToStringWrapped() - testBind', isToStringWrapped())
    Function.prototype.toString = _
  }

  console.info('isToStringWrapped() - baseline', isToStringWrapped())
  testApply()
  console.info('isToStringWrapped() - baseline', isToStringWrapped())
  testCall()
  console.info('isToStringWrapped() - baseline', isToStringWrapped())
  testBind()
  console.info('isToStringWrapped() - baseline', isToStringWrapped())
})()