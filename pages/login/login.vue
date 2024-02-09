<template>
	<view class="login">
		<image src="@/static/login_icon.png" class="wx" mode="widthFix"></image>
		<button class="btn mb20" @click="submit">
			<image src="@/static/login_icon.png" class="icon" mode="heightFix"></image>
			微信授权登录
		</button>
		<view class="row mt20">
			<checkbox-group @change="handleChange">
				<checkbox value="message" />
				我已阅读并同意<text class="blue" @click="toMessage">《隐私政策》</text>
			</checkbox-group>
		</view>
		<view class="back" @click="$util.backPage()">
			<image src="@/static/back.png" class="icon" mode="widthFix"></image>返回
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
			};
		},
		onReady() {

		},
		onLoad() {
			console.log(getCurrentPages())
			if (!uni.getStorageSync('token')) {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log(12121, res)

					},
					fail: (err) => {
						console.log(222, err)
					}
				})
			}

		},
		watch: {

		},
		methods: {
			handleChange(e) {
				this.checked = !!e.detail.value.length
			},
			toMessage() {
				uni.navigateTo({
					url: "/pagesC/message/message"
				})
			},
			getuserinfo() {
				this.$http('/my-system/user/info').then(r => {
					uni.setStorageSync('userInfo', r.result)
				})
			},

			submit() {
				if (!this.checked) {
					uni.showToast({
						title: '请同意隐私协议',
						icon: 'none'
					})
					return;
				}
				uni.getUserProfile({
					desc: '登录',
					success: (e) => {
						uni.login({
							provider: 'weixin',
							success: (res) => {

								this.$http('/my-auth/auth/wechatLogin', {
									wechatCode: res.code,
								}).then(r => {
									console.log(222, r)

									uni.setStorageSync('token', r.result)
									this.getuserinfo()
									this.$util.backPage()
								})
							}
						})
					}
				})
				// console.log(this.$refs.uForm)
				// this.$refs.uForm.validate().then(res => {
				// 	console.log(111)
				// }).catch(errors => {
				// 	console.log(2222,errors)
				// })
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 30%;

		.wx {
			width: 150upx;
		}

		.blue {
			color: skyblue;
		}

		.btn {
			width: 80%;
			margin: 20upx auto 0;
			display: flex;
			justify-content: center;
			height: 80upx;
			color: #fff;
			font-size: 32upx;
			background-color: rgb(5, 193, 96);
			line-height: 80upx;

			.icon {
				height: 80upx;
			}
		}

		.back {
			position: fixed;
			bottom: 100upx;
			font-size: 40upx;

			.icon {
				width: 60upx;
			}
		}
	}
</style>
