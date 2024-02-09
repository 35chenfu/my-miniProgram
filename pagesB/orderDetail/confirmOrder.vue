<template>
	<view class="confirm-wrap">
		<view class="item row">
			<text class="f28-c333 left">发布姓名：</text>
			<text class="f28-c333 b">测试</text>
		</view>
		<view class="item row">
			<text class="f28-c333 left">公司姓名：</text>
			<text class="f28-c333 b">测试</text>
		</view>
		<view class="item row">
			<text class="f28-c333 left">联系方式：</text>
			<text class="f28-c333 b">测试</text>
		</view>
		<view class="item mt20 row">
			<text class="f28-c333 left">需求类型：</text>
			<text class="f28-c333 b">测试</text>
		</view>
		<view class="item row">
			<text class="f28-c333 left">起始地：</text>
			<text class="f28-c333 b">测试</text>
			<u-icon name="map-fill" color="#FB852F" size="18"></u-icon> 
		</view>
		<view class="item row">
			<text class="f28-c333 left">目的地：</text>
			<text class="f28-c333 b">测试</text>
			<u-icon name="map-fill" color="#FB852F" size="18"></u-icon> 
		</view>
		<view class="item row">
			<text class="f28-c333 left">里程：</text>
			<text class="f28-c333 b">测试</text>
		</view>
		<view class="item row">
			<text class="f28-c333 left">返程要求：</text>
			<text class="f28-c333 b">测试</text>
		</view>
		<view class="item row">
			<text class="f28-c333 left">佣金：</text>
			<text class="f28-c333 b">测试</text>
		</view>
		<view class="content">
			<view class="title">任务详细说明</view>
			<u--textarea  v-model="info.content" placeholder="请输入任务要求" ></u--textarea>
		</view>
		<view class="btn-wrap mt30">
			<view class="btn" @click="toPay">
				支付确认
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				
			};
		},
		methods:{
			toPay(){
				uni.navigateTo({
					url:'./confirmPay'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.confirm-wrap{
	.item{
		background-color: #fff;
		border-bottom: 2upx solid #f2f2f2;
		padding: 20upx 30upx;
		.left{
			// width: 150upx;
		}
	}
	.content{
		padding: 30upx;
		.title{
			font-size: 32upx;
			color: $base-color;
			font-weight: bold;
			margin-bottom: 10upx;
		}
	}
	.btn-wrap{
		display: flex;
		justify-content: center;
		align-items: center;
		.btn{
			width: 430upx;
			height: 84upx;
			border-radius: 8upx;
			background-color: $base-color;
			color: #fff;
			font-size:40upx;
			text-align: center;
			line-height: 84upx;
		}
	}
}
</style>
