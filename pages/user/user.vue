<template>
	<view class="user-wrap">
		<view class="top-bg"></view>
		<view class="info-wrap" :style="{'padding-top':pdTop+'px'}">
			<view class="user-info row jc-sb">
				<view class="left row ">
					<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image class="u-img" mode="widthFix" :src="avatar || '/static/user.png'"></image>
					</button>
					<view class="u-info">
						<view class="t1 b">{{userInfo.name || '--'}}</view>
						<!-- <view class="t2">年龄：19 ｜ 男</view> -->
						<view class="t3">手机号：{{userInfo.phone || '--'}}</view>
					</view>
				</view>
				<u-icon @click="navTo('/pagesC/info/info')" name="arrow-right" color="#fff" size="24"></u-icon>
			</view>


			<view class="model-wrap user mt20">
				<view class="title row jc-sb">
					<view class="left row">
						<image src="@/static/images/user-yh.png" class="m-img"></image>
						<text class="f32-c333 ml20">我的订单</text>
					</view>
					<!-- <view class="right row">
						<text class="r-txt">全部订单</text>
						<u-icon name="arrow-right" color="#C4C4C4" size="14"></u-icon>
					</view> -->
				</view>
				<view class="m-list row">
					<view class="m-item column" v-for="(item,index) in userList" :key="index" @click="toNav(item)">
						<view class="icon">
							<u-icon :name="item.icon" size="28"></u-icon>
						</view>
						<text class="label">{{item.label}}</text>
					</view>
				</view>
			</view>

			<!-- <view class="model-wrap user mt20">
				<view class="title row jc-sb">
					<view class="left row">
						<image src="@/static/images/user-yh.png" class="m-img"></image>
						<text class="f32-c333 ml20">我是司机</text>
					</view>
					<view class="right row">
						<text class="r-txt">全部订单</text>
						<u-icon name="arrow-right" color="#C4C4C4" size="14"></u-icon>
					</view>
				</view>
				<view class="m-list row jc-sb">
					<view class="m-item column" v-for="(item,index) in userList" :key="index">
						<text class="label">{{item.label}}</text>
					</view>
				</view>
			</view> -->

			<!-- <view class="model-wrap c-list mt20">
				<view class="row c-item" @click="navTo('/pagesC/collection/collection')">
					<image src="@/static/images/user-sc.png" class="i-img"></image>
					<text class="f32-c333">我的收藏</text>
				</view>
				<view class="row c-item" @click="settleIn">
					<image src="@/static/images/user-rz.png" class="i-img"></image>
					<text class="f32-c333">司机入驻</text>
				</view>
				<view class="row c-item">
					<image src="@/static/images/user-tj.png" class="i-img"></image>
					<text class="f32-c333">我要推荐</text>
				</view>
				<view class="row c-item" @click="navTo('/pagesC/contactUs/contactUs')">
					<image src="@/static/images/user-lx.png" class="i-img"></image>
					<text class="f32-c333">联系我们</text>
				</view>
				<view class="row c-item" @click="navTo('/pagesC/feedback/feedback')">
					<image src="@/static/images/user-yj.png" class="i-img"></image>
					<text class="f32-c333">意见反馈</text>
				</view>
			</view> -->
		</view>
		<tabbar :activeIndexProp="3"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pdTop: 0,
				avatar: '',
				userInfo: {},
				userList: [{
					icon:'order',
						label: '我的订单',
						url:'/pagesB/orderList/orderList'
					},
					{
						icon:'star',
						label: '我的收藏',
						url:'/pagesC/collection/collection'
					},

				]
			};
		},
		onLoad() {
			this.pdTop = getApp().globalData.sysSize.statusBarHeight + 30
			this.getuserinfo()

		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			onChooseAvatar(e) {
				this.avatar = e.detail.avatarUrl
			},
			getuserinfo(token) {
				this.$http('/my-system/user/info').then(r => {
					uni.setStorageSync('userInfo', r.result)
					this.userInfo = r.result
				})
			},
			toNav(item){
				uni.navigateTo({
					url:item.url
				})
			},
			settleIn() {
				uni.switchTab({
					url: '/pages/user/user'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-bg {
		background-color: $base-color;
		width: 100%;
		height: 350upx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.info-wrap {
		padding: 30upx;
		padding-bottom: 220upx;

		.user-info {
			.left {
				.avatar-wrapper {
					width: 127upx;
					height: 127upx;
					border-radius: 50%;
					margin-right: 20upx;
					padding: 0;
					overflow: hidden;
				}

				.u-img {
					width: 127upx;
					height: 127upx;
				}

				.u-info {
					color: #fff;
					font-size: 28upx;

					.t1 {
						font-size: 32upx;
					}

					.t2 {
						margin: 12upx 0;
					}

				}
			}
		}

		.model-wrap {
			padding: 0;

			&.assets {
				margin-top: 43upx;
			}

			.title {
				padding: 30upx;
				border-bottom: 2upx solid #E6E6E6;

				.m-img {
					width: 42upx;
					height: 42upx;
				}

				.r-txt {
					color: #C4C4C4;
					font-size: 24upx;
				}
			}

			.m-card {
				padding: 30upx;

				.c-t1 {
					color: #1A1A1A;
					font-size: 30upx;

					.b {
						font-size: 26upx;
						color: #333;
					}
				}
			}

			.m-list {
				padding: 30upx;

				.m-item {
					margin-right: 20upx;

					.icon {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 120upx;
						height: 120upx;
						border-radius: 50%;
						background-color: rgba(250, 243, 227, 1);
					}

					.label { 
						margin-top: 15upx; 
						color: #4D4D4D;
						font-size: 24upx;
					}
				}
			}

			&.c-list {
				.c-item {
					padding: 30upx;
					border-bottom: 2upx solid #E6E6E6;

					&:last-child {
						border: none;
					}

					.i-img {
						width: 40upx;
						height: 40upx;
						margin-right: 22upx;
					}
				}
			}
		}

	}
</style>
