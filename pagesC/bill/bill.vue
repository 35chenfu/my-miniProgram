<template>
	<view class="bill-wrap page-fff">
		<view class="top row jc-sb">
			<view class="left row" @click="showTime=true">
				账单{{timeVal}}
				<image src="@/static/images/xia.png" mode="" class="x-img ml10"></image>
			</view>
			<view class="right row">
				<view class="f28-c999 mr20">
					支出999￥
				</view>
				<view class="f28-c999">
					转入999￥
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item row jc-sb" v-for="(item,index) in 6" :key="index">
				<view class="left row">
					<image src="@/static/images/jia1.png" class="u-img"></image>
					<view class="u-info">
						<view class="f28-c333">姓名</view>
						<view class="f22-c999">
							时间
						</view>
					</view>
				</view>
				<view class="right row">
					<text class="m-txt">-10</text>￥
				</view>
			</view>
		</view>
		
		<u-datetime-picker
		    :show="showTime"
		    v-model="nowTime"
		    mode="year-month"
			@confirm="confirm"
		></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeVal:'',
				nowTime:'',
				showTime:false,
			};
		},
		onLoad() {
			this.nowTime=new Date().getTime()
			this.timeVal = uni.$u.timeFormat(new Date().getTime(), 'yyyy年mm月');
		},
		methods:{
			confirm(e){
				this.timeVal = uni.$u.timeFormat(e.value, 'yyyy年mm月');
				this.showTime=false
			}
		}
		
	}
</script>

<style lang="scss" scoped>
.top{
	padding: 30upx;
	box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
	.x-img{
		width: 17upx;
		height: 15upx;
	}
}
.list{
	.item{
		.u-img{
			width: 86upx;
			height: 86upx;
			border-radius: 50%;
		}
	}
}
</style>
