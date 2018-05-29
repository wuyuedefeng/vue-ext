export default {
	install (Vue) {
		Vue.prototype.$ext = Vue.prototype.$ext || {
			mount (Component, options = {}) {
				let parentDom = options['onEl'] || document.body
				delete options['onEl']
				const instance = new Vue({
					// data: options,
					render (h) {
						return h(Component, {props: options})
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
