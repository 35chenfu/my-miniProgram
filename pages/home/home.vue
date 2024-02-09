<template>
	<view class="home-wrap">
		<view class="index-top">
			<view class="nav-wrap">
				<view class="s-wrap row" @click="toSearch">
					<image src="@/static/images/search.png" class="icon-img"></image>
					<text>请输入</text>
				</view>
				<view class="search" slot="right">
					搜索
				</view>
			</view>
			<view class="index-bg">
				<u-swiper :list="list1" circular indicator :autoplay="true" height="150">
				</u-swiper>
			</view>
			<view class="top_label row jc-sb">
				<view class="label"> 品质保障 </view>
				<view class="label"> 售后无忧 </view>
				<view class="label"> 甄选好惠 </view>
				<view class="label"> 能省能赚 </view>
			</view>

		</view>
		<view class="cate-wrap ">
			<view class="row cate-list">

				<block v-for="(item,index) in menuList" :key="index">
					<view class="cate-item column" v-if="menuList.length > 8 && index == limiMenu"
						@click="limiMenu = 99">
						<image src="@/static/more.jpg" class="c-img more"></image>
						<text class="c-label">查看更多</text>
					</view>
					<view class="cate-item column" v-else-if="index < limiMenu+1" @click="toCate(item)">
						<image :src="item.imgPreviewUrl" class="c-img"></image>
						<text class="c-label">{{item.name}}</text>
					</view>
				</block>
			</view>
			<view class="cate-swiper">
				<u-swiper @click="toDetail" :list="newSwiper.map(item=>item.imageBase64)" circular indicator
					:autoplay="true" height="150">
				</u-swiper>
			</view>

		</view>
		<view class="buying-wrap">
			<view class="title">
				限时抢购
			</view>
			<scroll-view class="mt20" scroll-x="true">
				<view class="buying-list">
					<view class="buying-item" v-for="(item,index) in timeLimitList" :key="index" @click="toLimit(item)">
						<image :src="item.imgPreviewUrl" class="b-img"></image>
						<view class="buy_info">
							<view class="name twoHidden">{{item.title}}</view>
							<view class="price-wrap">
								<text class="p1">￥{{item.rushPurchasePrice}}</text>
								<text class="p2">￥{{item.price}}</text>
							</view>
							<view class="time">
								<!-- <countDown :ctime="item.limitedEndTime"></countDown> -->
								<liu-countdown :auto="true" ref="countdown" mode="4" :endDate="getTime(item)" @change="countdownChange"></liu-countdown>
							</view>
							<view class="buy" v-if="!item.status">
								立即抢购
							</view>
							<view class="buy" v-else-if="item.status == 1">
								即将开售
							</view>
							<view class="buy" v-else-if="item.status == 2">
								已结束
							</view>
						</view>

					</view>
				</view>
			</scroll-view>
		</view>
		<view class="buying-after row jc-sa">
			<view class="a-item">
				往期抢购
			</view>
			<view class="a-item">
				下期抢购
			</view>
			<view class="a-item">
				预约使用
			</view>
		</view>


		<view class="con-box bg1">
			<view class="con-top row jc-sb">
				<view class="title">
					近期上新 New Arrival
				</view>
				<view class="more" @click="toCate({id:'new'})">
					查看更多
				</view>
			</view>
			<!-- <image :src="home0" class="con-image" mode="widthFix"></image> -->
			<view class="list ">
				<view class="item" v-for="(item,index) in newList" :key="index">
					<productInfo :info="item" type="row"></productInfo>
				</view>

			</view>
		</view>

		<view class="con-box box2 bg2">
			<view class="con-top row jc-sb">
				<view class="title">
					餐饮美食 Dining Gourmet Food
				</view>
				<view class="more" @click="toCate({id:'f5f5bf1d22794704a1603136674a536b'})">
					查看更多
				</view>
			</view>
			<image src="https://www.my-klcl.cn/api/my-file/file/preview/da7b82e85797392d1e0f16104f51c1c5" class="con-image" mode="widthFix"></image>
			<view class="list">
				<view class="item" v-for="(item,index) in productList0" :key="index">
					<productInfo :info="item"></productInfo>
				</view>

			</view>
		</view>

		<view class="con-box box2 bg3">
			<view class="con-top row jc-sb">
				<view class="title">
					休闲娱乐 Leisure Entertainment
				</view>
				<view class="more" @click="toCate({id:'1a19f3644c0544bab087165629d9aa88'})">
					查看更多
				</view>
			</view>
			<image src="https://www.my-klcl.cn/api/my-file/file/preview/dae69d23851cc1318723de754d4e94eb" class="con-image" mode="widthFix"></image>
			<view class="list ">
				<view class="item" v-for="(item,index) in productList1" :key="index">
					<productInfo :info="item"></productInfo>
				</view>
			</view>
		</view>

		<view class="con-box box2 bg4">
			<view class="con-top row jc-sb">
				<view class="title">
					研学旅游 Study Tourism
				</view>
				<view class="more" @click="toCate({id:'7f1011053f5742b0ae75fe7636a05c34'})">
					查看更多
				</view>
			</view>
			<image src="https://www.my-klcl.cn/api/my-file/file/preview/f2dcf80bda14622da81ebf78e388f218" class="con-image" mode="widthFix"></image>
			<view class="list">
				<view class="item" v-for="(item,index) in productList2" :key="index">
					<productInfo :info="item"></productInfo>
				</view>
			</view>
		</view>

		<view class="con-box box2 bg5">
			<view class="con-top row jc-sb">
				<view class="title">
					找好工作 Find Good Job
				</view>
				<view class="more" @click="toCate({id:'4af74be01d2d41708dab00cef66c3a6e'})">
					查看更多
				</view>
			</view>
			<image src="https://www.my-klcl.cn/api/my-file/file/preview/def6ffd2c07233c5514af0cba3259603" class="con-image" mode="widthFix"></image>
			<view class="list">
				<view class="item" v-for="(item,index) in productList3" :key="index">
					<productInfo :info="item"></productInfo>
				</view>
			</view>
		</view>
		<tabbar :activeIndexProp="0"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				home0: '',
				home1: '',
				home2: '',
				home3: '',

				productList0: [],
				productList1: [],
				productList2: [],
				productList3: [],
				menuList: [],
				timeLimitList: [],
				newList: [],
				newSwiper: [],
				limiMenu: 7,
				mysNavConfig: {
					isHome: false,
					navPadding: false,
					navFixed: false,
					// searchConfig:{
					// 	placeholder:'输入关键词搜索'
					// }
				},
				list1: [
					require('@/static/home1.png'),
					require('@/static/home1.png'),
					require('@/static/home1.png'),
				],
				cateList: [

				]
			};
		},
		mounted() {

		},
		onLoad() {
			uni.setNavigationBarColor({
				fontColor: "#ffffff",
			})
			uni.hideTabBar()
			this.init()
		},
		onPullDownRefresh(res) {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 3000)
		},
		methods: {
			countdownChange(obj){
				// console.log(obj)
			},
			getTime(item){
				const start = new Date(item.limitedStartTime).getTime();
				const now = new Date().getTime();
				const end = new Date(item.limitedEndTime).getTime();
				console.log(start,now)
				if(start > now) {
					item.status = 1
					return item.limitedStartTime
				}else if(end < now){
					item.status = 2
					return item.limitedEndTime
				}else{
					return item.limitedEndTime
				}
			},
			init() {
				this.$http(`/my-system/wechatMenu/list`, {
					size: 99
				}, 'post').then(res => {
					this.menuList = res.rows

				})
				this.$http(`/my-merchandise/timeLimitCommodity/list`, {
					size: 99
				}, 'post').then(res => {
					this.timeLimitList = res.rows;
					
					
				})
				this.$http(`/my-merchandise/commodity/newList`, {
					size: 10
				}, 'post').then(res => {
					this.newList = res.rows;
				})
				this.$http(`/my-merchandise/homeRecommend/list`, {
					size: 99
				}, 'post').then(res => {
					this.newSwiper = res.rows

				})
				this.$http(`/my-merchandise/commodity/list`, {
					page: 1,
					size: 10,
					wxMenuId: 'f5f5bf1d22794704a1603136674a536b'
				}, 'post').then(product => {
					this.productList0 = product.rows
				})
				
				this.$http(`/my-merchandise/commodity/list`, {
					page: 1,
					size: 10,
					wxMenuId: '1a19f3644c0544bab087165629d9aa88'
				}, 'post').then(product => {
					this.productList1 = product.rows
				})
				
				this.$http(`/my-merchandise/commodity/list`, {
					page: 1,
					size: 10,
					wxMenuId: '7f1011053f5742b0ae75fe7636a05c34'
				}, 'post').then(product => {
					this.productList2 = product.rows
				})
				this.$http(`/my-merchandise/commodity/list`, {
					page: 1,
					size: 10,
					wxMenuId: '4af74be01d2d41708dab00cef66c3a6e'
				}, 'post').then(product => {
					this.productList3 = product.rows
				})
			},
			getCommodityList(id,pusData){
				this.$http(`/my-merchandise/commodity/list`, {
					wxMenuId: id,
					page: 1,
					size: 20
				}, 'post').then(res => {
					this.productList = res.rows;
				})
			},
			toDetail(index) {
				uni.navigateTo({
					url: `/pagesA/detail/detail?id=${this.newSwiper[index].commodityId}`
				})
			},
			toLimit(data) {
				uni.navigateTo({
					url: `/pagesA/detail/detail?id=${data.commodityId}`
				})
			},
			toCate(item) {
				uni.navigateTo({
					url: `/pagesA/cate/cate?id=${item.id}`,

				})
			},
			toSearch() {
				uni.navigateTo({
					url: '/pagesA/search/search'
				})
			},
			onRightClick() {
				this.toSearch()
				console.log('search')
			},
			countDown(time) {
				var nowTime = +new Date(); //返回当前时间总的毫秒数
				var inputTime = +new Date(time); //返回用户输入时间总毫秒数
				var times = (inputTime - nowTime) / 1000; //剩余时间总的秒数
				//转换时分秒
				var d = parseInt(times / 60 / 60 / 24);
				var h = parseInt(times / 60 / 60 % 24);
				var m = parseInt(times / 60 % 60);
				var s = parseInt(times % 60);
				// setInterval(()=>{
				// 	this.countDown(inputTime-1000)
				// 	console.log(1212121)
				// 	return `${d}天 ${h}:${m}:${s}`
				// },1000)
				
			},

		}
	}
</script>

<style lang="scss" scoped>
	.home-wrap {
		min-height: 100vh;
		background-color: #fff;
		padding-bottom: 130upx;
	}

	.index-top {
		width: 100%;
		height: 530upx;
		background-color: #DBD9B7;

		// background-image: url('@/static/bg2.png');
		// padding-bottom: 50upx;
		// padding-top: 100upx;
		.nav-wrap {
			padding: 20upx;
			display: flex;
			align-items: center;
		}

		.search {
			color: #fff;

		}

		.s-wrap {
			padding: 16upx 24upx;
			border-radius: 32upx;
			font-size: 24upx;
			background-color: #fff;
			flex: 2;

			.icon-img {
				width: 28upx;
				height: 28upx;
				margin-right: 34upx;
			}
		}

		.index-bg {
			padding: 20upx;
		}

		.top_label {
			padding: 0 20upx;

			.label {
				color: #fff;
			}
		}
	}

	.cate-wrap {
		padding: 30upx;
		background-color: #fff;
		border-radius: 30upx;
		margin-top: -30upx;

		.cate-list {
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.cate-item {
			margin-bottom: 20upx;

			.c-img {
				width: 150upx;
				height: 150upx;
			}

			.more {
				padding: 30upx;
				box-sizing: border-box;
			}
		}

		.cate-swiper {}

	}

	.buying-wrap {
		padding: 30upx;
		// background-image: url('@/static/bg2.png');
		background-color: #F0B2A8;
		border-radius: 30upx;

		.title {
			color: #fff;
			font-size: 40upx;
			font-weight: 600;
			padding-left: 20upx;
			position: relative;

			&::after {
				display: block;
				content: "";
				position: absolute;
				width: 10upx;
				height: 100%;
				background-color: #fff;
				left: 0;
				top: 0;
			}
		}

		.buying-list {
			display: flex;
			flex-wrap: nowrap;
			width: 100%;

			.buying-item {
				width: 260upx;
				display: inline-block;
				margin-right: 20upx;
				background-color: #fff;
				border-radius: 20upx;
				overflow: hidden;
				flex-shrink: 0;

				&:last-child {
					margin-right: 0;
				}

				.b-img {
					width: 260upx;
					height: 260upx;
				}

				.buy_info {

					padding: 20upx;

					.name {
						height: 76upx;
					}

					.price-wrap {
						margin-top: 10upx;

						.p1 {
							color: red;
							font-size: 28upx;
							font-weight: 600;
						}

						.p2 {
							color: rgba(0, 0, 0, 0.6);
							font-size: 24upx;
							text-decoration: line-through;
							margin-left: 10upx;
						}
					}
					.time{
						margin-top: 10upx;
						text-align: center;
						color: #000;
						font-weight: 600;
					}
					.buy {
						background-color: rgba(238, 70, 70, 0.3);
						text-align: center;
						padding: 12upx 0;
						border-radius: 10upx;
						color: red;
						margin-top: 10upx;
					}
				}
			}
		}

	}

	.pd20 {
		padding: 20upx;
	}

	.con-box {
		border-radius: 30upx;
		padding: 30upx 20upx;
		margin-top: 30upx;

		&.bg1 {
			background: linear-gradient(180deg, rgba(234, 141, 118, 1) 0%, rgba(234, 141, 118, 0.3) 100%);
		}

		&.bg2 {
			background: linear-gradient(180deg, rgba(234, 141, 118, 1) 0%, rgba(234, 141, 118, 0.3) 100%);
		}

		&.bg3 {
			background: linear-gradient(180deg, rgba(179, 68, 34, 1) 0%, rgba(179, 68, 34, 0.3) 100%);
		}

		&.bg4 {
			background: linear-gradient(180deg, rgba(71, 207, 151, 1) 0%, rgba(71, 207, 151, 0.3) 100%);
		}

		&.bg5 {
			background: linear-gradient(180deg, rgba(226, 176, 123, 1) 0%, rgba(226, 176, 123, 0.3) 100%);
		}

		.con-image {
			width: 100%;
			margin-top: 20upx;
		}

		.list {
			margin-top: 30upx;

			.item {
				margin-bottom: 20upx;
				border-radius: 20upx;
				overflow: hidden;
				// height: 200upx;

			}
		}

		&.box2 {
			.list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;

				.item {
					width: 48%;
					height: auto;
					flex-shrink: 0;

					.c-img {
						height: 200upx;
						width: 100%;
						display: block;
					}
				}
			}
		}
	}
</style>