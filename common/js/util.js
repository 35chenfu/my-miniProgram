let _debounceTimeout = null,
	_throttleRunning = false

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms   
 */
export const debounce = (fn, delay = 500) => {
	clearTimeout(_debounceTimeout);
	_debounceTimeout = setTimeout(() => {
		fn();
	}, delay);
}
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms  
 */
export const throttle = (fn, delay = 500) => {
	if (_throttleRunning) {
		return;
	}
	_throttleRunning = true;
	fn();
	setTimeout(() => {
		_throttleRunning = false;
	}, delay);
}

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms   
 */
export const backPage = () => {
	let pages = getCurrentPages();
	console.log(getCurrentPages())
	let prevPage = pages[pages.length - 2];
	if (prevPage) {
		uni.navigateBack()
	} else {
		uni.switchTab({
			url: '/pages/home/home'
		})
	}

}
/**
 * toast
 */
export const msg = (title = '', param = {}) => {
	if (!title) return;
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}
/**
 * 检查登录
 * @return {Boolean}
 */
export const isLogin = (options = {}) => {
	const token = uni.getStorageSync('token');
	console.log(token)
	if (token) {
		return true;
	} else {
		// uni.showToast({
		//     title:'请先登录',
		//     icon:'none'
		// })
		console.log(getCurrentPages())
		uni.navigateTo({
			url: '/pages/login/login',
			fail: (res) => {
				console.log(res) //打印错误信息
			}
		})
		return false
	}
}
/**
 * 获取页面栈
 * @param {Number} preIndex为1时获取上一页
 * @return {Object} 
 */
export const prePage = (preIndex = 1) => {
	const pages = getCurrentPages();
	const prePage = pages[pages.length - (preIndex + 1)];
	return prePage.$vm;
}
/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳   
 * @return {String}
 */
export const date = (format, timeStamp) => {
	if ('' + timeStamp.length <= 10) {
		timeStamp = +timeStamp * 1000;
	} else {
		timeStamp = +timeStamp;
	}
	let _date = new Date(timeStamp),
		Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();

	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;

	return format.replace(/[YmdHis]/g, key => {
		return {
			Y,
			m,
			d,
			H,
			i,
			s
		} [key];
	});
}
//二维数组去重
export const getUnique = array => {
	let obj = {}
	return array.filter((item, index) => {
		let newItem = item + JSON.stringify(item)
		return obj.hasOwnProperty(newItem) ? false : obj[newItem] = true
	})
}
// 判断类型集合
export const checkStr = (str, type) => {
	switch (type) {
		case 'mobile': //手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case 'tel': //座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case 'card': //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		case 'mobileCode': //6位数字验证码
			return /^[0-9]{6}$/.test(str)
		case 'pwd': //密码为8-16位，须包含数字、字母、符号
			return /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/.test(str)
		case 'payPwd': //支付密码 6位纯数字
			return /^[0-9]{6}$/.test(str)
		case 'postal': //邮政编码
			return /[1-9]\d{5}(?!\d)/.test(str);
		case 'QQ': //QQ号
			return /^[1-9][0-9]{4,9}$/.test(str);
		case 'email': //邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case 'money': //金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);
		case 'URL': //网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
		case 'IP': //IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
		case 'date': //日期时间
			return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
				/^(\d{4})\-(\d{2})\-(\d{2})$/
				.test(str)
		case 'number': //数字
			return /^[0-9]$/.test(str);
		case 'english': //英文
			return /^[a-zA-Z]+$/.test(str);
		case 'chinese': //中文
			return /^[\\u4E00-\\u9FA5]+$/.test(str);
		case 'lower': //小写
			return /^[a-z]+$/.test(str);
		case 'upper': //大写
			return /^[A-Z]+$/.test(str);
		case 'HTML': //HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
		case 'pwdLength': //HTML标记
			return str.length >= 6;
		default:
			return true;
	}
}

// 格式化时间
export const dateFormat = function(fmt = 'YYYY-MM-DD', date = new Date()) {
	const time = new Date(date)
	const weekArr = ['日', '一', '二', '三', '四', '五', '六']
	var o = {
		'M+': time.getMonth() + 1, //月份
		'D+': time.getDate(), //日
		'h+': time.getHours(), //小时
		'm+': time.getMinutes(), //分
		's+': time.getSeconds(), //秒
		'q+': Math.floor((time.getMonth() + 3) / 3), //季度
		S: time.getMilliseconds(), //毫秒
		W: time.getDay(), //星期
	}
	if (/(Y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1 == 'W' ?
				weekArr[o[k]] :
				RegExp.$1.length == 1 ?
				o[k] :
				('00' + o[k]).substr(('' + o[k]).length)
			)
	return fmt
}
