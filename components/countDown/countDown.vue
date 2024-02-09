<template>
	<view>
		 <liu-countdown ref="countdown" mode="1" :endDate="ctime"></liu-countdown>
	</view>
</template>

<script>
	export default {
		name:"countDown",
		props:{
			ctime:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				countDownTime:''
			};
		},
		created() {
			this.countDown()
		},
		
		methods:{
			countDown() {
				var nowTime = +new Date();//返回当前时间总的毫秒数
				var inputTime = +new Date(this.ctime); //返回用户输入时间总毫秒数
				var times = (inputTime - nowTime) / 1000; //剩余时间总的秒数
				//转换时分秒
				var d = parseInt(times / 60 / 60 / 24);
				var h = parseInt(times / 60 / 60 % 24);
				var m = parseInt(times / 60 % 60);
				var s = parseInt(times % 60);
				console.log(2222,times)
				if(times>0){
					this.countDownTime=`${d}天 ${h}:${m}:${s}`
					// setTimeout(this.countDown(), 1000)
				}else{
					this.countDownTime=`已结束`
				}
				
				
			},
		}
	}
</script>

<style lang="scss">

</style>