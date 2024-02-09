<template>
	<view class="detail_wrap">
		<view class="swiper_wrap">
			<u-swiper :list="(productInfo.commodityDetails || []).map(item=>item.imgPreviewUrl)" circular indicator
				:autoplay="false" height="180">
			</u-swiper>
		</view>
		<view class="buy row jc-sb" v-if="productInfo.flashSale == 1">
			<view class="title">
				限时抢购
			</view>
			<view class="time">
				<text v-if="status == 0">距离抢购结束</text>
				<text v-if="status == 1">距离开抢</text>
				<text v-if="status == 2">抢购已结束</text>
				<liu-countdown v-if="status != 2" :auto="true" ref="countdown" mode="4" :endDate="getTime()">
				</liu-countdown>
			</view>
		</view>
		<view class="detail_info">
			<view class="info">
				<view class="row jc-sb top">
					<view class="t-left">
						<text class="p1">￥</text><text
							class="p2">{{productInfo.price || productInfo.rushPurchasePrice}}</text><text
							class="p1">起</text>
					</view>
					<view :class="['t-right center column collect', {'active' : productInfo.collectionId }] "
						@click="collect">
						<u-icon name="star" size="20" :color="productInfo.collectionId ? '#FB852F':'#606266'"></u-icon>
						收藏
					</view>
				</view>
				<view class="desc">
					{{productInfo.title}}
				</view>



				<!-- <view class="tab-wrap">
					<view class="tab-item" v-for="(item,index) in 3" :key="index">
						{{productInfo.remarks}}
						
					</view>
				</view> -->
			</view>
			<view class="share row jc-sb">
				<view class="imgs-wrap row">
					<image class="s-img" v-for="(item,index) in 5 " :key="index" src="@/static/images/car2.png"
						mode="widthFix"></image>
				</view>
				<view class="s-btn">
					我要分享
				</view>
			</view>

			<!-- <view class="releated_wrap">
				<view class="title">
					相关产品
				</view>
				<view class="re_list">
					<view class="re_item row jc-sb" v-for="(item,index) in 3" :key="index">
						<image src="@/static/img1.png" class="c-img"></image>
						<view class="re_info row jc-sb">
							<view class="name_price">
								<view class="name twoHidden">
									名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称
								</view>
								<view class="price">
									<text class="p1">￥100</text>
									<text class="p2">￥100</text>
								</view>
							</view>
							<view class="buy_btn">
								抢购
							</view>
						</view>
					</view>
				</view>

			</view> -->
		</view>
		<u-sticky offset-top="10">
			<view class="nav_tab row">
				<view class="nav_item" v-for="(item,index) in navList" :key="index"
					:class="[{'active':activeIndex==item.value}]" @click="tabChange(item)">
					{{item.label}}
				</view>
			</view>
		</u-sticky>
		<view class="pro_info">
			<view class="pro_tit">
				<rich-text :nodes="productInfo.bookingInstructions" v-if="activeIndex"></rich-text>
				<rich-text :nodes="productInfo.details" v-else></rich-text>
			</view>
		</view>
		<div class="tab-bar row">
			<view class="icon" @click="toTab('/pages/home/home')">
				<image src="@/static/home.png" mode="heightFix" @click="toTab('/pages/home/home')"></image>
				<view>首页</view>
			</view>
			<view class="icon" @click="toTab('/pages/user/user')">
				<image src="@/static/user.png" mode="heightFix" @click="toTab('/pages/user/user')"></image>
				<view>我的</view>
			</view>
			<view class="icon">
				<image src="@/static/share.png" mode="heightFix"></image>
				<view>海报</view>
			</view>
			<button class="btn" @click="showPop=true" v-if="status == 0">立即预定</button>
			<button class="btn" v-else-if="status == 1">即将开抢</button>
			<button class="btn" v-else-if="status == 2">已结束</button>
		</div>
		<u-popup :show="showPop">
			<view class="sku-wrap">
				<view class="sku-title">
					<view class="btn close" @click="showPop = false">关闭</view>
					<view class="title">选择购买的产品</view>
					<view class="btn enter" @click="buy">确定</view>
				</view>
				<view class="sku-list">
					<u-radio-group v-model="productSku" placement="column">
						<u-radio :customStyle="{marginBottom: '8px'}"
							v-for="(item, index) in productInfo.commodityComboList" :key="index"
							:label="item.price +'元-' +item.comboName" :name="item.commodityId">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
		</u-popup>
		<u-popup :show="showBuy">
			<view class="sku-info-wrap">
				<view class="sku-info">
					<image class="pic" v-if="productInfo.commodityDetails"
						:src="productInfo.commodityDetails[0].imgPreviewUrl" mode="widthFix"></image>
					<view class="info">
						<view class="title twoHidden">{{selectProduct.comboName}}</view>
						<view class="price">{{selectProduct.price}}</view>
					</view>
					<view>
						<u-icon name="close" @click="showBuy = false" color="#ccc" size="20"></u-icon>
					</view>
				</view>
				<u--form :model="selectProduct" :rules="rules" labelWidth="60" ref="uForm">
					<u-form-item prop="merchandiseNum" label="数量:">
						<u-number-box slot="right" :min="1" v-model="selectProduct.merchandiseNum"></u-number-box>
					</u-form-item>
					<u-form-item prop="purchaserName" label="姓名:">
						<u--input v-model="selectProduct.purchaserName" />
					</u-form-item>
					<u-form-item prop="purchaserTel" label="电话:">
						<u-input v-model="selectProduct.purchaserTel" />
					</u-form-item>
					<u-form-item prop="purchaserIdCard" label="证件号:">
						<u-input v-model="selectProduct.purchaserIdCard" />
					</u-form-item>
					<u-form-item prop="remark" label="留言:">
						<u-input v-model="selectProduct.remark" />
					</u-form-item>
				</u--form>
				<view class="mt10">应付总额：￥{{selectProduct.price*selectProduct.merchandiseNum}}</view>
				<view class="btn" @click="submit">提交</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productSku: '',
				selectProduct: {
					merchandiseNum: 1,
					purchaserTel: '',
					purchaserIdCard: '',
					remark: ''
				},
				showPop: false,
				showBuy: false,
				rules: {
					'purchaserName': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'purchaserTel': {
						type: 'string',
						required: true,
						message: '请填写电话',
						trigger: ['blur', 'change']
					},
					'purchaserIdCard': {
						type: 'string',
						required: true,
						message: '请填写电话',
						trigger: ['blur', 'change']
					},
				},
				list1: [
					require('@/static/home1.png'),
					require('@/static/home1.png'),
					require('@/static/home1.png'),
				],
				navList: [{
						label: '产品详情',
						value: 0
					},
					{
						label: '预定须知',
						value: 1
					},
				],
				activeIndex: 0,
				productInfo: {},
				status: 0
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		onLoad(options) {
			this.getData(options.id)
		},
		methods: {
			getTime() {
				const start = new Date(this.productInfo.startDate).getTime();
				const now = new Date().getTime();
				const end = new Date(this.productInfo.cutoffDate).getTime();
				if (start > now) {
					this.status = 1
					return this.productInfo.startDate
				} else if (end < now) {
					this.status = 2
					return this.productInfo.cutoffDate
				} else {
					this.status = 0
					return this.productInfo.cutoffDate
				}
			},
			getData(id) {
				this.$http(`/my-merchandise/commodity/info/${id}`).then(res => {

					this.productInfo = res.result
				})
				console.log(uni.getStorageSync('token'))
				if (uni.getStorageSync('token')) {
					let userInfo = uni.getStorageSync('userInfo')
					// /my-merchandise/commodity/collect?commodityId={商品 ID}&userId={用户 ID}
					uni.request({
						url: `https://www.my-klcl.cn/api/my-merchandise/commodity/collect?commodityId=${id}&userId=${userInfo.id}`,
						header: {
							Authorization: uni.getStorageSync('token') || ''
						},
						method: 'GET',
						success: (res) => {
							console.log(res)
						},
					})
				}
			},
			tabChange(item) {
				this.activeIndex = item.value
			},
			toTab(url) {
				if (url == '/pages/user/user') {
					if (this.$util.isLogin()) {
						uni.switchTab({
							url,
						})
					}
				}
				uni.switchTab({
					url
				})
			},
			collect() {
				if (!this.productInfo.collectionId) {
					// 收藏
					this.$http(`/my-system/collection/add?commodityId=${this.productInfo.id}`).then(res => {
						this.productInfo.collectionId = res.result;
						console.log(this.productInfo)
					})
				} else {
					this.$http(`/my-system/collection/cancel/${this.productInfo.collectionId}`).then(res => {
						this.productInfo.collectionId = ''
					})
				}
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					this.$http(`/my-order/order/create`, {
						merchandiseId: this.selectProduct.commodityId,
						comboId: this.selectProduct.id,
						merchandiseNum: this.selectProduct.merchandiseNum,
						merchandisePrice: this.selectProduct.price,
						purchaserName: this.selectProduct.purchaserName,
						purchaserTel: this.selectProduct.purchaserTel,
						purchaserIdCard: this.selectProduct.purchaserIdCard,
						remark: this.selectProduct.remark,
					}, 'post').then(res => {
						var data = res.result;
						this.$http(`/my-pay/wechat/prePay`, {
							userId: data.userId,
							orderNo: data.orderNumber,
							comboName: data.comboName,
							orderPrice: data.orderPrice,
						}, 'post').then(res => {
							// appId: "wx80b9f6aacbeb5853"
							uni.requestPayment({
								provider: 'wxpay',
								appId: res.result.appId, //小程序的appid
								timeStamp: res.result.timeStamp, //时间戳，要字符串类型的
								nonceStr: res.result.nonceStr, //随机字符串，长度为32个字符以下。
								package: res.result
								.packageVal, //prepay_id 参数值，提交格式如：prepay_id=xx
								signType: res.result.signType, //MD5类型
								paySign: res.result.paySign, //签名
								success: function(res) {
									//支付成功的回调    成功之后你想做什么在这里操作  比如弹窗一个提示:支付成功等
									uni.showToast({
										title: '支付成功！',
										icon: 'none'
									})
									uni.navigateTo({
										url: `/pagesC/orderDetail/orderDetail?id=${data.id}`
									})
								},
								fail: function(err) {
									//支付失败的回调   失败之后你想做什么在这里操作  比如弹窗一个提示:支付失败等
									console.log(err);
									uni.navigateTo({
										url: `/pagesC/orderDetail/orderDetail?id=${data.id}`
									})

								}
							})
						})
					})
				})
			},
			buy() {
				if (this.productSku) {
					this.showBuy = true;
					this.showPop = false;
				}
				this.selectProduct = {
					...this.productInfo.commodityComboList.find(item => item.commodityId == this.productSku),
					merchandiseNum: 1
				}
				console.log(this.productSku, this.selectProduct)

			}

		}
	}
</script>

<style scoped lang="scss">
	.detail_wrap {
		min-height: 100vh;
		background-color: #efefef;
		padding-bottom: 100upx;

		.buy {
			padding: 30upx;
			background-color: $base-color;
		}

		.detail_info {

			padding: 20upx;

			.info {
				background-color: #fff;
				border-radius: 20upx;
				padding: 30upx 20upx;

				.collect {
					&.active {
						color: $base-color
					}
				}

				.t-left {
					.p1 {
						color: $base-color;
					}

					.p2 {
						color: $base-color;
						font-size: 38upx;
						font-weight: 600;
					}
				}

				.desc {
					margin-top: 10upx;
					font-weight: 600;
					font-size: 38upx;
				}

				.tab-wrap {
					margin-top: 20upx;

					.tab-item {
						position: relative;
						padding-left: 50upx;

						&::after {
							content: '';
							display: block;
							position: absolute;
							width: 30upx;
							height: 6upx;
							background-color: $base-color;
							left: 0;
							top: 50%;
						}
					}
				}
			}

			.share {
				margin-top: 20upx;
				padding: 30upx;
				background-color: $base-color;
				border-radius: 20upx;

				.imgs-wrap {
					.s-img {
						width: 80upx;
						border-radius: 50%;
						margin-left: -20upx;

						&:first-child {
							margin-left: 0;
						}
					}
				}

				.s-btn {
					width: 150upx;
					height: 60upx;
					background-color: #fff;
					border-radius: 50upx;
					text-align: center;
					line-height: 60upx;
					font-size: 20upx;
				}
			}

			.releated_wrap {
				margin-top: 20upx;
				background-color: #fff;
				border-radius: 20upx;
				padding: 20upx;

				.title {
					color: #000;
					margin-top: 10upx;
					font-size: 38upx;
					font-weight: 600;
				}

				.re_list {
					margin-top: 20upx;

					.re_item {
						height: 250upx;
						border-bottom: 2upx solid #efefef;

						&:last-child {
							border-bottom: none;
						}

						.c-img {
							width: 200upx;
							height: 200upx;
							border-radius: 20upx;
							margin-right: 20upx;
							flex-shrink: 0;
						}

						.re_info {
							.name_price {
								width: 70%;

								.price {
									margin-top: 30upx;

									.p1 {
										color: $base-color;
										margin-right: 20upx;
										font-size: 36upx;
									}

									.p2 {
										color: #ddd;
										font-size: 28upx;
										text-decoration: line-through;
									}
								}
							}

							.buy_btn {
								background-color: $base-color;
								width: 100upx;
								height: 50upx;
								border-radius: 30upx;
								text-align: center;
								line-height: 50upx;
								color: #fff;

							}
						}
					}
				}
			}
		}

		.sku-info-wrap {
			padding: 20upx;

			.sku-info {
				display: flex;

				.pic {
					width: 228upx;
					margin-right: 10upx;
					flex-shrink: 0;
				}

				.info {
					flex: 2;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.title {
						font-size: 36upx;
						font-weight: 600;

					}

					.price {
						color: $base-color;
					}
				}

			}

			.btn {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				border-radius: 40upx;
				background-color: $base-color;
				font-size: 36upx;
				color: #fff;
				font-weight: bold;
				margin: auto;
				margin-top: 20upx;
			}
		}

		.nav_tab {
			margin-top: 24upx;
			background-color: #fff;
			height: 120upx;

			.nav_item {
				width: 50%;
				text-align: center;
				font-size: 34upx;
				color: #333;
				height: 100%;
				line-height: 120upx;

				&.active {
					color: $base-color;
					border-bottom: 6upx solid $base-color;
				}
			}
		}

		.sku-wrap {

			.sku-title {
				height: 100upx;
				display: flex;
				width: 100%;

				.title {
					font-weight: 600;
					font-size: 36upx;
					flex: 2;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.btn {
					font-size: 30upx;
					padding: 0 20upx;
					height: 100%;
					line-height: 100upx;

					&.enter {
						color: #FB852F;
					}

					&.close {
						color: #999;
					}
				}
			}

			.sku-list {
				padding: 20upx;
				height: 500upx;
				overflow: auto;
			}
		}

		.tab-bar {
			z-index: 1000;
			height: 100upx;
			background-color: #fff;
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			box-sizing: border-box;
			padding: 0 20upx;

			.icon {
				display: flex;
				flex-direction: column;
				font-size: 28upx;
				width: 90upx;
				justify-content: center;
				align-items: center;

				image {
					height: 40upx;
				}
			}

			.btn {
				flex: 2;
				height: 80upx;
				line-height: 80upx;
				font-size: 28upx;
				color: #fff;
				border-radius: 100upx;
				background-color: #FB852F;
				margin-left: 20upx;
			}
		}

		.pro_info {
			margin-top: 20upx;
			background-color: #fff;
			height: 3000upx;
			width: 100%;

			.pro_tit {
				text-align: center;
				width: 100%;
				color: #000;
				font-size: 40upx;
				font-weight: 600;
				padding: 30upx 0;
			}
		}
	}
</style>
