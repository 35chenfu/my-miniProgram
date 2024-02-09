<template>
	<view :class="['product_info',type]" @click="toDetial">
		<image :src="info.imgPreviewUrl || info.commodityFileInfo[0].imgPreviewUrl" class="c-img" mode="widthFix">
		</image>
		<view class="info column jc-sb flex2">
			<view class="name twoHidden">{{info.title || info.commodityName}}</view>
			<view class="price row jc-sb flex2">
				<view>
					<text class="p1"> ￥{{info.rushPurchasePrice || info.price || 0}} </text>
					<text class="p2" v-if="info.price"> ￥{{info.price }} </text>
				</view>
				<view>
					<u-button szie="mini" class="btn" v-if="from == 'collect'" @tap.stop="cancelCollect">取消收藏</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "productInfo",
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				}
			},
			type: {
				type: String,
				default: ''
			},
			from: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			cancelCollect() {
				this.$http(`/my-system/collection/cancel/${this.info.id}`).then(res => {
					uni.showToast({
						title: '取消收藏成功',
						icon: 'none'
					})
					this.$emit('cancelCollect')
				})
			},
			toDetial() {
				// commodityId
				let id = this.info.id
				if (this.from == 'collect') {
					id = this.info.commodityId
				}
				uni.navigateTo({
					url: `/pagesA/detail/detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product_info {
		width: 100%;
		height: auto;
		flex-shrink: 0;
		background-color: #fff;
		border-radius: 20upx;
		overflow: hidden;

		.c-img {
			width: 100%;
			display: block;
		}

		.info {
			height: 160upx;
			background-color: #fff;
			padding: 20upx;
			align-items: flex-start;

			.price {

				.p1 {
					color: $base-color;
					font-size: 36upx;
					font-weight: 600;
					margin-right: 8upx;
				}

				.p2 {
					color: #999;
					text-decoration: line-through;
				}
			}
		}

		&.row {
			.c-img {
				flex-shrink: 0;
				width: 228upx;
				// height: 200rpx;
			}

			.info {
				height: 160upx;
				background-color: #fff;
				padding: 20upx;
				align-items: flex-start;

				.price {
					width: 100%;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
