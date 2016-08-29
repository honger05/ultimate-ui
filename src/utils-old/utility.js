require('fastclick').attach(document.body)
require('../scss/app.scss')
window.Promise = window.Promise || require('es6-promise')

require('./core/_error')
require('./vue-helper/_vue-common')

module.exports = extend({},
  require('./core/_core'),
  require('./core/_check'),
  require('./core/_time'),
  require('./core/_text'),
  require('./core/_animate'),
  require('./navigator/_mobile-until'),
  require('./resource'),
  require('./sdk/app'),
  require('./sdk/util'),
  {store: require('./lib/store')},
  require('./lib/expstore')
)

/**
 *  扩展函数
 */
function extend() {
  var target = arguments[0] || {}
  var i = 1,
    options, copy
  var len = arguments.length

  for (; i < len; i++) {
    if ((options = arguments[i]) !== null) {
      for (name in options) {
        copy = options[name]
        if (copy !== void 0) {
          target[name] = copy
        }
      }
    }
  }

  return target
}
