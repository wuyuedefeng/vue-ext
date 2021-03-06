let debounce = require('../../libs/functions/debounce')
module.exports = function (el, binding) {
	// change debounce only if interval has changed
	if (!binding.value || binding.value !== binding.oldValue) {
	  el.oninput = debounce((evt) => {
      el.dispatchEvent(new Event('change'))
    }, parseInt(binding.value) || 600)
	}
}
