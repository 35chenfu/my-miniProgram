<template>
	<view class="tab-bar">
		<view class="tab-list row jc-sa">
			<view class="tab-item column" :class="'tab'+index" v-for="(item,index) in list" :key="index"
				@click="tabHandle(item,index)">
				<image :src="activeIndexProp===index?item.selectIcon:item.icon" class="t-img"></image>
				<view :class="['t-txt',{'active':activeIndexProp===index}]">{{item.label}}</view>
			</view>
		</view>
		<u-popup :show="showAdd" @close="closePopup">
			<view>
				<text>出淤泥而不染，濯清涟而不妖</text>
			</view>
		</u-popup>
		<u-popup :show="customShow" mode="center" :round="10">
			<view class="custom-wrap">
				<view class="title">
					<view>客服时间</view>
					<view>09:00 ~ 20:00</view>
				</view>
				<view class="tel">
					<view>
						<view>客服电话</view>
						<view>18150638166</view>
					</view>
					<view class="tel-btn" @click="postMobile" href="tel:18150638166">拨打热线</view>
				</view>
				<view class="ewm-wrap">
					<image src="@/static/custom-ewm.jpg" class="ewm" mode="widthFix"></image>
					<view class="text">长按识别二维码添加客服</view>
				</view>
				<view class="close">
					<u-icon @click="customShow = false" name="close" color="#fff" size="28"></u-icon>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		data() {
			return {
				value6: 0,
				activeIndex: 0,
				showAdd: false,
				customShow: false,
				list: [{
						label: '首页',
						path: '/pages/home/home',
						icon: require('@/static/tabbar/home.jpg'),
						selectIcon: require('@/static/tabbar/home-a.jpg')
					},
					{
						label: '客服',
						path: '/pages/message/message',
						icon: require('@/static/tabbar/msg.jpg'),
						selectIcon: require('@/static/tabbar/msg-a.jpg')
					},
					// {
					// 	label:'直播',
					// 	path:'/pages/message/message',
					// 	icon:require('@/static/tabbar/msg.png'),
					// 	selectIcon:require('@/static/tabbar/msg-a.png')
					// },
					{
						label: '分享',
						path: '/pages/share/share',
						icon: require('@/static/tabbar/order.jpg'),
						selectIcon: require('@/static/tabbar/order-a.jpg')
					},
					{
						label: '我的',
						path: '/pages/user/user',
						icon: require('@/static/tabbar/user.jpg'),
						selectIcon: require('@/static/tabbar/user-a.jpg')
					}
				]
			};
		},
		props: {
			activeIndexProp: {
				default: 0
			}
		},
		onLoad() {
			uni.hideTabBar()
		},
		methods: {
			
			postMobile(){
				uni.makePhoneCall({
					phoneNumber: '18150638166' //仅为示例
				});
			},
			tabHandle(item, index) {
				console.log(item,index)
				if (item.label == '客服') {
					this.customShow = true;
					return
				}

				if (index) {
					if (this.$util.isLogin()) {
						uni.switchTab({
							url: item.path
						})
					}

				} else {
					
					uni.switchTab({
						url: item.path
					})
				}

			},
			orderHandle(e) {
				if (e === 1) {
					this.navTo('/pagesB/releaseOrder/releaseOrder')
				} else {
					this.navTo('/pagesB/driverEnter/driverEnter')
				}
			},
			changeTabbar(e) {
				if (e === 2) {
					this.showAdd = true
					return
				}
			},
			closePopup(e) {
				this.showAdd = false
			}
		}
	}
</script>

<style lang="scss">
	.tab-bar {
		position: fixed;
		bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom); //兼容 IOS<11.2
		padding-bottom: env(safe-area-inset-bottom);
		width: 100%;
		background-color: #fff;
		box-shadow: 0px 11px 25px 2px #C6C6C6;

		.tab-list {
			padding: 20upx;

			.tab-item {
				.t-img {
					width: 40upx;
					height: 40upx;
				}

				.t-txt {
					font-size: 24upx;

					&.active {
						color: rgb(19, 34, 122);
					}
				}
			}
		}
	}

	.custom-wrap {
		padding: 0;
		width: 550upx;
		position: relative;

		.close {
			position: absolute;
			bottom: -120upx;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;

		}

		.title {
			overflow: hidden;
			height: 160upx;
			padding-top: 20upx;
			padding-left: 20upx;
			color: #fff;
			border-radius: 10px 10px 0 0;
			box-sizing: border-box;
			background: url('@/static/costom.jpg');
			background-size: 100% 100%;
		}

		.tel {
			padding: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.tel-btn {
				color: #FE5B07;
				border: 1px solid #FE5B07;
				display: inline-block;
				padding: 10upx 20upx;
				font-size: 30upx;
				border-radius: 10upx;
			}
		}

		.ewm-wrap {
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 30upx 0;
			.ewm {
				width: 200upx;
				margin: 40upx 0;
			}

			.text {
				border-top: 1px solid #eee;
				font-size: 28upx;
				width: 100%;
				line-height: 40upx;
				text-align: center;
			}
		}

	}

	.add {
		width: 80upx;
		height: 80upx;
	}
</style>
