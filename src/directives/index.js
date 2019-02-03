let input = require('./input')
let img = require('./img')
module.exports = {
	install (Vue) {
	  Vue.use(input)
	  Vue.use(img)
	}
}
