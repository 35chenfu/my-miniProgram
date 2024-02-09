<template>
	<view class="register">
		<!-- <view class="form-wrap">
			<u--form
			labelPosition="left"
			:model="userInfo"
			:rules="rules"
			ref="uForm">
				<u-form-item  prop="name" >
					<u-input v-model="userInfo.name" placeholder="请输入您的账号" border="surround" customStyle="border-radius:14upx">
						<image slot="prefix" src="@/static/images/zhanghu.png"  class="u-img mr20"></image>
					</u-input>
				</u-form-item>
				
				<u-form-item  prop="pwd" >
					<u-input 
					v-model="userInfo.pwd" 
					placeholder="请输入您的密码" 
					border="surround" 
					:type="eyeName=='eye-fill'?'text':'password'"
					customStyle="border-radius:14upx">
						<image slot="prefix" src="@/static/images/suo.png"  class="u-img mr20"></image>
						<template slot="suffix">
							<u-icon @click="showPwd" :name="eyeName" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				
				<u-form-item  prop="newpwd" >
					<u-input 
					v-model="userInfo.newpwd" 
					placeholder="请输入您的新密码" 
					border="surround" 
					:type="eyeNewName=='eye-fill'?'text':'password'"
					customStyle="border-radius:14upx">
						<image slot="prefix" src="@/static/images/suo.png"  class="u-img mr20"></image>
						<template slot="suffix">
							<u-icon @click="showNewPwd" :name="eyeNewName" size="24"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item prop="code" >
					<u-input  v-model="userInfo.code" placeholder="请输入您的验证码" border="surround">
						<image slot="prefix" src="@/static/images/youxiang.png"  class="u-img mr20"></image>
					</u-input>
					<template slot="right">
						<view  class="code-wrap ml20">
							<view class="code"  v-if="buttonStatus" @click="sendSms">
								获取验证码
							</view>
							<view class="code-text row " v-else>
								<u-count-down 
								:autoStart="false"
								:time="59* 1000" 
								format="ss" 
								@finish="showButton"
								ref="countdown" >
								</u-count-down>
								S后重发
							</view>
						</view>
					</template>
				</u-form-item>
			</u--form>
			<view class="btn">
				确认
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				eyeName:'eye-off',
				eyeNewName:'eye-off',
				buttonStatus:true,
				sexType:1,  //1男，2女
				rules:{}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		watch:{
			buttonStatus(val){
				if(!val){
					setTimeout(()=>{
						this.$refs.countdown.start()
					},500)
				}
			},
		},
		methods:{
			showPwd(){
				this.eyeName=this.eyeName=='eye-off'?'eye-fill':'eye-off'
			},
			showNewPwd(){
				this.eyeNewName=this.eyeNewName=='eye-off'?'eye-fill':'eye-off'
			},
			sendSms(){
				this.showButton()
			},
			showButton() {
				this.buttonStatus = !this.buttonStatus
			},
		}
	}
</script>

<style lang="scss" scoped>
.register{
	height: 100vh;
	background-color: #fff;
	.form-wrap{
		padding: 10upx 45upx;
		.u-img{
			width: 43upx;
			height: 50upx;
		}
		.age-wrap{
			.left{
				width: 335upx;
				height: 70upx;
				border-radius: 14upx;
				border-width: 2upx;
				border-style: solid;
				border-color: #D6D6D6;
				.x-img{
					width: 47upx;
					height: 43upx;
				}
				.sex{
					.m-img{
						width: 20upx;
						height: 20upx;
					}
				}
			}
		}
		.code-wrap{
			width: 156upx;
			height: 70upx;
			text-align: center;
			line-height: 70upx;
			border-width: 2upx ;
			border-color: #dadbde ;
			border-style: solid;
			border-radius: 14upx;
			font-size: 26upx;
			color: #999;
			.code-text{
				/deep/ .u-count-down__text{
					color: #999;
				}
				justify-content: center;
			}
			
		}
	}
	.btn{
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		border-radius: 40upx;
		background-color: $base-color;
		font-size: 36upx;
		color: #fff;
		font-weight: bold;
		margin: auto;
		margin-top: 200upx;
	}
}
</style>
