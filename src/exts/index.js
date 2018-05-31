export default {
	install (Vue) {
		Vue.prototype.$ext = Vue.prototype.$ext || {
			mount (Component, options = {}) {
				let parentDom = options['onEl'] || document.body
				delete options['onEl']
				const instance = new Vue({
					data: options.data || {},
					render (h) {
						return h(Component, {props: options.props || {}})
					}
				})
				parentDom.appendChild(instance.$mount().$el)
        let component = instance.$children[0]
        console.log(instance.$el, component.$el, instance.$el, component)
				return component
			},
      unmount (component) {
        component.$el.parentNode.removeChild(component.$el)
        component.$destroy()
      }
		}
	}
}
