### liu-countdown适用于uni-app项目的倒计时组件
### 本组件目前兼容微信小程序、H5
### 本组件是简单好用的倒计时组件，可自定义样式、动态赋值、开始、暂停，可动态获取剩余天数、剩余小时数、剩余分钟数、剩余秒数，源码简单易修改
# --- 扫码预览、关注我们 ---

## 扫码关注公众号，查看更多插件信息，预览插件效果！ 

![](https://uni.ckapi.pro/uniapp/publicize.png)

### 使用方式
``` 组件示例
<template>
	<view class="page-main">
		<span>1、默认倒计时</span>
		<liu-countdown ref="countdown" mode="1" endDate="2024-12-14 12:30:00"></liu-countdown>
		<span>2、文字分隔符</span>
		<liu-countdown ref="countdown2" auto mode="2" endDate="2024-12-14 12:30:00"></liu-countdown>
		<span>3、不显示天数</span>
		<liu-countdown ref="countdown3" auto mode="2" :showDays="false" endDate="2024-12-14 12:30:00">
		</liu-countdown>
		<span>4、自定义样式</span>
		<liu-countdown ref="countdown4" auto mode="3" endDate="2024-12-14 12:30:00"></liu-countdown>
		<span>5、天数显示文字分隔符，其他默认</span>
		<liu-countdown ref="countdown5" auto mode="4" endDate="2024-12-14 12:30:00"></liu-countdown>
		<span>6、倒计时回调</span>
		<liu-countdown ref="countdown6" auto mode="3" :showSeconds="true" endDate="2024-12-14 12:30:00"
			@change="change">
		</liu-countdown>
		<view>剩余天数：{{obj && obj.days || ''}}</view>
		<view>剩余小时数：{{obj && obj.hours || ''}}</view>
		<view>剩余分钟数：{{obj && obj.minutes || ''}}</view>
		<view>剩余秒数：{{obj && obj.seconds || ''}}</view>
		<view @click="openCount(1)" class="btn">开始倒计时</view>
		<view @click="openCount(2)" class="btn">停止倒计时</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {},
				type: ''
			}
		},
		methods: {
			//开始、停止倒计时
			openCount(type) {
				if (type == this.type) return
				this.type = type
				if (type == 1) this.$refs.countdown.open()
				else this.$refs.countdown.close()
			},
			//倒计时回调数据
			change(e) {
				this.obj = e
			}
		}
	}
</script>

<style lang="scss">
	.page-main {
		height: auto;
		padding: 32rpx;

		.btn {
			width: 686rpx;
			height: 88rpx;
			background: #2182FE;
			border-radius: 8rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			color: #FFFFFF;
			margin-top: 20rpx;
		}

		view {
			line-height: 66rpx;
		}
	}
</style>

```

### 属性说明
| 名称                         | 类型           | 默认值                  | 描述            |
| ----------------------------|--------------- | ---------------------- | ---------------|
| mode                        | String         | '1'                    | 1:默认模式；2:文字分隔符；3:自定义样式；4:天数显示文字分隔符，其他默认
| endDate                     | String         | ''                     | 倒计时结束时间
| showDays                    | Boolean        | true                   | 是否显示天数
| showSeconds                 | Boolean        | false                  | 是否显示秒字
| padZeroes                   | Boolean        | true                   | 是否在数字前面补零
| auto                        | Boolean        | false                  | 是否开启自动倒计时



