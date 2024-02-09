import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// vuex
import store from './store'
import mixin from './common/mixin/mixin'
Vue.mixin(mixin) 
import {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage,
	date,
	backPage
} from '@/common/js/util'
Vue.prototype.$util = {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage,
	date,
	backPage
}

import {request} from '@/common/js/request'
Vue.prototype.$http=request


App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
