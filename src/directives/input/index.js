import debounce from './debounce'
export default {
  install (Vue) {
    Vue.directive('debounce', debounce)
  }
}
