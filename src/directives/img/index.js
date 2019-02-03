let src = require('./src')
module.exports = {
  install (Vue) {
    Vue.directive('src', src)
  }
}
