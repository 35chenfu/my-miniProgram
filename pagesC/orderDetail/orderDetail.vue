<template>
	<view class="orderDetail-wrap">
		<view class="product" @click="toDeatil">
			<image class="pic" :src="detailInfo.imgPreviewUrl" mode="widthFix"></image>
			<view class="info">
				<view class="name">{{detailInfo.commodityName}}</view>
			</view>
		</view>
		<view class="user cell">
			<view class="title">用户信息</view>
			<view class="row mt10 jc-sb">
				<view class="name">姓名</view>
				<view class="info">{{detailInfo.purchaserName}}</view>
			</view>
			<view class="row mt10 jc-sb">
				<view class="name">手机</view>
				<view class="info">{{detailInfo.purchaserTel}}</view>
			</view>
		</view>

		<view class="order cell">
			<view class="title">订单信息</view>
			<view class="row mt10 jc-sb">
				<view class="name">订单号</view>
				<view class="info">{{detailInfo.orderNumber}}</view>
			</view>
			<view class="row mt10 jc-sb">
				<view class="name">下单日期</view>
				<view class="info">{{detailInfo.createTime}}</view>
			</view>
			<view class="row mt10 jc-sb">
				<view class="name">金额</view>
				<view class="info price">￥{{detailInfo.merchandiseTotalPrice}}</view>
			</view>
			<view class="time row" v-if="detailInfo.payStatus == 0 && detailInfo.orderStatus == 0">
				<liu-countdown :auto="true" :showDays="false" ref="countdown" mode="4" :endDate="getTime()"
					@change="countdownChange">
				</liu-countdown>
			</view>
			<view class="time row" v-else>
				{{status[detailInfo.orderStatus]}}
			</view>
		</view>

		<view class="btn-wrap row" v-if="detailInfo.payStatus == 0 && detailInfo.orderStatus == 0">
			<view class="btn" @click="pay">支付 ￥{{detailInfo.merchandiseTotalPrice}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				detailInfo: {},
				status: {
					0: '待支付',
					1: '已支付',
					2: '已取消',
					3: '已过期',
					4: '已退款'
				}
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getData()
		},
		methods: {
			getData() {
				this.$http(`/my-order/order/info?orderId=${this.id}`).then(res => {
					this.detailInfo = res.result;
				})
			},
			zero(num) {
				return num < 10 ? '0' + num : num
			},
			getTime() {
				let endDate = new Date(new Date(this.detailInfo.createTime).getTime() + 600000)
				return endDate.getFullYear() + '-' + this.zero(endDate.getMonth() + 1) + '-' + this.zero(endDate
				.getDate()) + ' ' + this.zero(endDate
						.getHours()) + ':' + this.zero(endDate.getMinutes()) + ':' +
					this.zero(endDate.getSeconds())
			},
			toDeatil() {
				uni.navigateTo({
					url: `/pagesA/detail/detail?id=${this.detailInfo.commodityFileId}`
				})
			},
			countdownChange(days, hours, minutes, seconds) {
				if (days == '00' && hours == '00' && minutes == '00' && seconds == '00') {
					this.getData()
				}
			},
			pay() {
				this.$http(`/my-pay/wechat/prePay`, {
					userId: this.detailInfo.userId,
					orderNo: this.detailInfo.orderNumber,
					comboName: this.detailInfo.comboName,
					orderPrice: this.detailInfo.orderPrice,
				}, 'post').then(res => {
					// appId: "wx80b9f6aacbeb5853"
					uni.requestPayment({
						provider: 'wxpay',
						appId: res.result.appId, //小程序的appid
						timeStamp: res.result.timeStamp, //时间戳，要字符串类型的
						nonceStr: res.result.nonceStr, //随机字符串，长度为32个字符以下。
						package: res.result.packageVal, //prepay_id 参数值，提交格式如：prepay_id=xx
						signType: res.result.signType, //MD5类型
						paySign: res.result.paySign, //签名
						success: function(res) {
							//支付成功的回调    成功之后你想做什么在这里操作  比如弹窗一个提示:支付成功等
							uni.showToast({
								title: '支付成功！',
								icon: 'none'
							})
						},
						fail: function(err) {
							//支付失败的回调   失败之后你想做什么在这里操作  比如弹窗一个提示:支付失败等
							console.log(err);

						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orderDetail-wrap {
		padding-bottom: 160upx;

		.product {
			display: flex;
			background: #fff;
			padding: 20upx;

			.pic {
				width: 228upx;
				margin-right: 20upx;
			}
		}

		.cell {
			background: #fff;
			padding: 20upx;
			margin-top: 20upx;

			.title {
				color: #666;
				font-weight: 600;
				margin-bottom: 20upx;
			}

			.info {
				color: #999;
				font-size: 26upx;
			}

			.price {
				font-size: 50upx;
				color: $base-color;
			}

			.time {
				height: 80upx;
				margin-top: 20upx;
				justify-content: center;
				border-top: 1px solid #eee;
				color: $base-color;
			}
		}

		.btn-wrap {
			position: fixed;
			bottom: 0;
			background: #fff;
			height: 120upx;
			width: 100%;
			justify-content: center;

			.btn {
				background: $base-color;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 100upx;
				height: 80upx;
				width: 80%;

			}
		}
	}
</style>
