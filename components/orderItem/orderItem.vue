<template>
	<view class="orderItem mt20">
		<view class="jc-sb row">
			<view class="name flex2 twoHidden">{{info.commodityName}}</view>
			<view class="status">{{status[info.orderStatus]}}</view>
		</view>
		<view class="jc-sb row mt20">
			<view class="num">数量：{{info.merchandiseNum}}</view>
			<view class="price">￥{{info.orderPrice}}</view>
		</view>
		<view class="jc-sb row mt20">
			<view class="date">下单时间：{{info.createTime}}</view>
			<view class="btn-wrap">
				<view class="btn cancel mr10" @click="cancel" v-if="info.orderStatus == 0">取消</view>
				<view class="btn detail" @click="toDetail">查看详情</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "orderList",
		data() {
			return {
				status: {
					0: '待支付',
					1: '已支付',
					2: '已取消',
					3: '已过期',
					4: '已退款'
				}
			};
		},
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		methods:{
			cancel(){
				this.$http(`/my-order/order/cancel?orderId=${this.info.id}`).then(res => {
					this.$emit('update')
				})
			},
			toDetail(){
				uni.navigateTo({
					url:`/pagesC/orderDetail/orderDetail?id=${this.info.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.orderItem {
		background-color: #fff;
		padding: 20upx;

		.status {
			background-color: rgba(251, 133, 47, 0.3);
			font-size: 26upx;
			padding: 8upx 20upx;
			display: flex;
			align-items: center;
			border-radius: 100upx;
			color: $base-color;
		}

		.name {
			font-weight: 600;
		}

		.num {
			font-size: 28upx;
			color: #999;
		}

		.price {
			color: $base-color;
		}

		.date {
			color: #999;
			font-size: 24upx;
		}

		.btn-wrap {
			display: flex;

			.btn {
				padding: 6upx 20upx;
				border-radius: 100upx;
				color: #fff;
				font-size: 26upx;
			}

			.cancel {
				background: #999;

			}

			.detail {
				background: $base-color;

			}
		}
	}
</style>
