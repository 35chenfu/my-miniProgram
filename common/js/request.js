import store from '@/store'
import cache from './cache'
import {
	msg
} from './util'

let baseUrl = 'https://www.my-klcl.cn/api';

export default baseUrl;
export const request = (url, data, method, cacheName, time) => {
	return new Promise((resolve, reject) => {
		if (time > 0) {
			const cacheResult = cache.get(cacheName);
			if (cacheResult) {
				resolve(cacheResult);
				return;
			}
		}
		console.log('token', uni.getStorageSync('token') || '')
		uni.request({
			url: baseUrl + url,
			data: data,
			header: {
				Authorization: uni.getStorageSync('token') || ''

				// 'content-type':'application/x-www-form-urlencoded'
			},
			method: method || 'GET',
			success: (res) => {
				uni.hideLoading()
				if (res.data.success) {
					resolve(res.data)
				} else if ([11011,11012,11013].includes(Number(res.data.result))) {
					// uni.showToast({
					// 	title: '登录过期，请重新登录',
					// 	icon: 'none'
					// })
					uni.clearStorageSync()
					uni.navigateTo({
						url: '/pages/login/login',
						fail: (res) => {
							console.log(res) //打印错误信息
						}
					})
					reject(res.data)
				} else {
					uni.showToast({
						title: res.data.errorDesc || '请求失败',
						icon: 'none'
					})
					reject(res.data)
				}
				if (time > 0) {
					cache.put(cacheName, res.data.result, time);
				}
			},
			fail: function(err) {
				uni.hideLoading()
				reject(err)
			}
		})

	})
}
