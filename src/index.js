import exts from './exts'
import directives from './directives'
export default {
	install (Vue) {
		Vue.use(exts)
		Vue.use(directives)
	}
}
