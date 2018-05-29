import debounce from '../../libs/functions/debounce'
export default function (el, binding) {
	// change debounce only if interval has changed
	if (binding.value !== binding.oldValue) {
	  el.addEventListener('input', debounce((evt) => {
      el.dispatchEvent(new Event('change'))
    }, parseInt(binding.value) || 600))
	}
}
