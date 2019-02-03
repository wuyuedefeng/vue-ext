/**
 * 包裹函数 一段时间间隔只执行函数一次
 * @param funcRef 函数引用
 * @param wait default, 300ms
 * 是否立即触发，触发后wait时间内不触发该方法，wait时间后才可以重新触发
 * false：wait后触发  没有返回值
 * true: wait前触发, 可以有返回值
 * @param immediate default false
 * return : 返回新的函数，使用：将需要调用funcRef的地方，替换为调用新返回的函数即可
 */
function debounce(funcRef, wait, immediate) {
	var context, args, timestamp, timeout;
	wait = wait || 300;
	return function () {
		context = this;
		args = arguments;
		timestamp = new Date().getTime();
		var nowCall = immediate && !timeout;
		if(!timeout){
			timeout = setTimeout(later, wait)
		}
		if(nowCall){
			var result = funcRef.apply(context, arguments);
			context = args = null;
			return result;
		}
	};
	function later() {
		// 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
		var last = new Date().getTime() - timestamp;
		if (last < wait && last >= 0) {
			timeout = setTimeout(later, wait - last);
		}else {
			timeout = null;
			if (!immediate) {
				funcRef.apply(context, args);
				if (!timeout) context = args = null;
			}
		}
	}
}
module.exports = debounce
