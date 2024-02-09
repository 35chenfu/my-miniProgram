<template>
	<view class="cate_wrap">
		<view class="cate_search row">
			<view class="search_left row" @click="showPop=true">
				<view class="">{{cateLabel}}/{{areaLabel}}</view>

				<u-icon name="arrow-down" color="#333" size="20"></u-icon>
			</view>
			<view class="search_right">
				<u--input placeholder="请输入内容" border="none" v-model="searchKey"></u--input>
			</view>
		</view>
		<view class="cate_bg" v-if="imgPreviewUrl">
			<image class="bg_img" :src="imgPreviewUrl" mode="widthFix"></image>
		</view>
		<view class="cate_list">
			<view class="cate_title">
				—— {{cateInfo.remarks}} ——
			</view>
			<view class="list row jc-sb">
				<view class="item" v-for="(item,index) in productList" :key="index">
					<productInfo :info="item"></productInfo>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" />
		<u-popup :show="showPop">
			<view class="cate_pop">
				<view class="top_cate row jc-sb">
					<scroll-view scroll-x="true" class="scroll_x">
						<view class="top_cate_list">
							<view :class="['top_cate_item',{'active':topCateActive==index}]" v-for="(item,index) in 20"
								:key="index" @click="selectTopCate(item,index)">
								分类
							</view>
						</view>
					</scroll-view>

					<view class="filter row" @click="filterPop=true">
						<u-icon name="grid" color="#333" size="20"></u-icon>
						筛选
					</view>
				</view>


				<view class="close">
					<view class="close_btn" @click="showPop=false">
						关闭
					</view>
				</view>

				<u-popup :show="filterPop" mode="right" @close="filterPop=false">
					<view class="">
						筛选
					</view>
				</u-popup>

			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateLabel: '分类',
				areaLabel: '地区',
				searchKey: '',
				showPop: false,
				topCateActive: 0,
				filterPop: false,
				cateInfo: {},
				productList: [],
				status: 'loadmore',
				page: 1,
				id: '',
				imgPreviewUrl:''
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getData(options.id)
			const obj = {
				'f5f5bf1d22794704a1603136674a536b':'da7b82e85797392d1e0f16104f51c1c5',
				'1a19f3644c0544bab087165629d9aa88':'dae69d23851cc1318723de754d4e94eb',
				'7f1011053f5742b0ae75fe7636a05c34':'f2dcf80bda14622da81ebf78e388f218',
				'4af74be01d2d41708dab00cef66c3a6e':'def6ffd2c07233c5514af0cba3259603'
			}
			if(obj[options.id]){
				this.imgPreviewUrl = 'https://www.my-klcl.cn/api/my-file/file/preview/'+obj[options.id]
				// uni.request({
				// 	url: `https://www.my-klcl.cn/api/my-file/file/base64/${obj[options.id]}`,
				// 	method: 'GET',
				// 	success: (res) => {
				// 		this.imgPreviewUrl = res.data
				// 	}
				// })
			}

		},
		onReachBottom() {
			this.getProduct(this.id)
		},
		methods: {
			selectTopCate(item, index) {
				this.topCateActive = index
			},
			getProduct(id){
				if(id=='new'){
					this.$http(`/my-merchandise/commodity/newList`, {
						page: this.page,
						size: 10
					}, 'post').then(res => {
						this.page++;
						this.productList = res.rows;
						if(res.rows.length < 10 ){
							this.status = 'nomore'
						}
						this.total = res.total
					})
				}else{
					this.$http(`/my-merchandise/commodity/list`, {
						wxMenuId: id,
						page: this.page,
						size: 10
					}, 'post').then(res => {
						this.page++;
						this.productList = res.rows;
						console.log(res.rows.length)
						if(res.rows.length < 10 ){
							this.status = 'nomore'
						}
						this.total = res.total
					})
				}
			},
			getData(id) {
				if (id == 'new') {

					this.cateInfo = {
						remarks: '最近上新 New Arrival'
					}
					uni.setNavigationBarTitle({
						title: this.cateInfo.remarks
					})
					this.getProduct(id)
					
					return

				}
				this.$http(`/my-system/wechatMenu/info/${id}`).then(res => {
					this.cateInfo = res.result;
					uni.setNavigationBarTitle({
						title: this.cateInfo.remarks
					})
				})
				this.getProduct(id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cate_wrap {
		background-color: #efefef;
		min-height: 100vh;

		.cate_search {
			background-color: #fff;
			// position: fixed;
			padding: 20upx;
			border-radius: 50upx;
			// top: 20upx;
			margin: 20upx;
			// left: 50%;
			// transform: translateX(-50%);
			// width: 90%;
			// z-index: 99;

			.search_left {
				flex-shrink: 0;
				margin-right: 10upx;
			}
		}

		.cate_bg {
			width: 100%;

			.bg_img {
				width: 100%;
			}
		}

		.cate_list {
			background-color: #fff;
			padding: 30upx 20upx;

			.cate_title {
				font-size: 32upx;
				text-align: center;
			}

			.list {
				margin-top: 30upx;
				flex-wrap: wrap;

				.item {
					width: 48%;
					margin-bottom: 20upx;

					/deep/ .info {
						background-color: rgba(0, 0, 0, 0.1);
					}
				}
			}
		}

		.cate_pop {
			width: 100vw;
			height: 100vh;
			position: relative;

			.top_cate {
				padding: 30upx;

				.scroll_x {
					width: 80%;

					.top_cate_list {
						display: flex;
						flex-wrap: nowrap;

						.top_cate_item {
							flex-shrink: 0;
							display: inline-block;
							margin-right: 20upx;
							padding: 10upx 20upx;
							border: 2upx solid #ddd;
							border-radius: 50upx;

							&.active {
								border: 2upx solid $base-color;
							}
						}
					}

				}

				.filter {
					padding-left: 20upx;
				}
			}

			.close {
				position: fixed;
				bottom: 0;
				background-color: #fff;
				width: 100%;
				z-index: 99;

				.close_btn {
					width: 90%;
					margin: 20upx auto;
					background-color: #fff;
					border-radius: 100upx;
					background-color: #efefef;
					text-align: center;
					height: 80upx;
					line-height: 80upx;
				}
			}
		}
	}
</style>
