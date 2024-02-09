<template>
	<view class="count-down">
		<span v-if="showDays">
			<span :class="{'count-number':mode==3 || mode==4}">{{zero(days)}}</span>
			<text class="count-name">{{mode==1?':':'天'}}</text>
		</span>
		<span>
			<span :class="{'count-number':mode==3 || mode==4}">{{zero(hours)}}</span>
			<text class="count-name">{{mode==1 || mode==4?':':'时'}}</text>
		</span>
		<span>
			<span :class="{'count-number':mode==3 || mode==4}">{{zero(minutes)}}</span>
			<text class="count-name">{{mode==1 || mode==4?':':'分'}}</text>
		</span>
		<span>
			<span :class="{'count-number':mode==3 || mode==4}">{{zero(seconds)}}</span>
			<text class="count-name" v-if="showSeconds">秒</text>
		</span>
	</view>
</template>

<script>
	export default {
		props: {
			//显示模式(1:默认模式；2:文字分隔符；3:自定义样式；4:天数显示文字分隔符，其他默认)
			mode: {
				type: String,
				default: '1'
			},
			//倒计时结束时间
			endDate: {
				type: String,
				required: true,
			},
			//是否显示天数
			showDays: {
				type: Boolean,
				default: true,
			},
			//是否显示秒字
			showSeconds: {
				type: Boolean,
				default: false,
			},
			//是否在数字前面补零
			padZeroes: {
				type: Boolean,
				default: true,
			},
			//是否自动开启倒计时
			auto: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				countdownInterval: null,
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0
			};
		},
		mounted() {
			if (this.auto) return this.open()
		},
		beforeDestroy() {
			this.close()
		},
		methods: {
			open() {
				console.log(1111111,this.endDate)
				const endTime = new Date(this.endDate).getTime()
				if (isNaN(endTime)) {
					console.error(`传入的倒计时结束时间格式有误: ${this.endDate}`)
					return
				}
				this.setTime(endTime)
				this.countdownInterval = setInterval(() => {
					this.setTime(endTime)
				}, 1000)
			},
			setTime(endTime){
				const now = new Date().getTime()
				const distance = endTime - now
				if (distance <= 0) {
					clearInterval(this.countdownInterval)
					this.days = 0
					this.hours = 0
					this.minutes = 0
					this.seconds = 0
					this.change(this.days, this.hours, this.minutes, this.seconds)
					return
				}
				this.days = Math.floor(distance / (1000 * 60 * 60 * 24))
				this.hours = Math.floor(
					(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				)
				this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
				this.seconds = Math.floor((distance % (1000 * 60)) / 1000)
				this.change(this.days, this.hours, this.minutes, this.seconds)
			},
			close() {
				clearInterval(this.countdownInterval)
			},
			zero(num) {
				return this.padZeroes ? String(num).padStart(2, '0') : num
			},
			change(days, hours, minutes, seconds) {
				let obj = {
					days: this.zero(days),
					hours: this.zero(hours),
					minutes: this.zero(minutes),
					seconds: this.zero(seconds)
				}
				this.$emit('change', obj)
			}
		},
	};
</script>

<style scoped>
	.count-name {
		margin: 0 4rpx;
	}

	.count-number {
		/* background: #F5F5F5; */
		border-radius: 4rpx;
		/* padding: 2rpx 10rpx; */
		text-align: center;
		font-size: 28rpx;
		line-height: 28rpx;
		/* color: #3579FF; */
		/* margin: 0 8rpx; */
	}
</style>
