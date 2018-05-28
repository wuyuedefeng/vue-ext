export default {
	install (Vue) {
		Vue.prototype.$ext = Vue.prototype.$ext || {
			mount (Component, options = {}) {
				let parentDom = options['onEl'] || document.body
				delete options['onEl']
				const instance = new Vue({
					data: options,
					render (h) {
						return h(Component, {props: options})
					}
				})
				const component = instance.$mount()
				parentDom.appendChild(component.$el)
				return instance.$children[0]
			}
		}
	}
}