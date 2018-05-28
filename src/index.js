export default {
	install (Vue) {
		Vue.ext = Vue.ext || {
			mount (options = {}) {
				let parentDom = options['onEl'] || document.body
				const instance = new Vue({
					data: options,
					render (h) {
						return h(this, {props: options})
					}
				})
				const component = instance.$mount()
				parentDom.appendChild(component.$el)
				return instance.$children[0]
			}
		}
	}
}