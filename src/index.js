let exts = require('./exts')
let directives = require('./directives')
module.exports = {
	install (Vue) {
		Vue.use(exts)
		Vue.use(directives)
	}
}
