module.exports = {
	install (Vue) {
		Vue.prototype.$ext = Vue.prototype.$ext || {
			mount (Component, options = {}) {
				let parentDom = options['onEl'] || document.body
				delete options['onEl']
				const instance = new Vue({
					data: options.data || {},
					render (h) {
						return h(Component, {props: options.props || {}, data: options.data || {}})
					}
				})
				parentDom.appendChild(instance.$mount().$el)
        let component = instance.$children[0]
				return component
			},
      unmount (component) {
        component.$root.$el.parentNode.removeChild(component.$root.$el)
        component.$root.$destroy()
      }
		}
	}
}
