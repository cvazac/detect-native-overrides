//const path = require('path');
const fs = require('fs');
const mustache = require('mustache');

const x1 = fs.readFileSync('src/detect-native-overrides.js').toString()
console.info('x1', x1.substring(0, 100))
const x3 = fs.readFileSync('build/templates/detect-native-overrides.tm.js').toString()
console.info('x3', x3.substring(0, 100))
fs.writeFileSync('dist/detect-native-overrides.tm.js', mustache.render(x3, {code: x1}))
