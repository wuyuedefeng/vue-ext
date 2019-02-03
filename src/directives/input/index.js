let debounce = require('./debounce')
module.exports = {
  install (Vue) {
    Vue.directive('debounce', debounce)
  }
}
