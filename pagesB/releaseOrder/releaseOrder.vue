<template>
	<view class="release-wrap">
		<view class="row jc-sa">
			<view class="card column" @click="navTo('/pagesB/orderDetail/orderDetail?type=1')">
				<view class="img-box row">
					<image class="img" src="@/static/images/car2.png" mode=""></image>
				</view>
				<text class="f32-c333 b mt30">营运需求 </text>
			</view>
			<view class="card column" @click="navTo('/pagesB/orderDetail/orderDetail?type=2')">
				<view class="img-box row">
					<image class="img" src="@/static/images/car2.png" mode=""></image>
				</view>
				<text class="f32-c333 b mt30">代工需求 </text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
.release-wrap{
	padding-top: 34upx;
	.img-box{
		width: 273upx;
		height: 273upx;
		background-color: #fff;
		border-radius: 14upx;
		justify-content: center;
		.img{
			width: 270upx;
			height: 118upx;
		}
	}
}
</style>
