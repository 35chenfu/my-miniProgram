<template>
	<view class="driver-wrap">
		<u--form
		labelPosition="left"
		:model="info"
		:rules="rules"
		labelWidth="90"
		ref="uForm">
			<view class="model">
				<view class="f32-c333 title">个人信息</view>
				<u-form-item  prop="name" label="姓名:" borderBottom>
					<u-input v-model="info.name" placeholder="请输入您的名字" border="none" >
						
					</u-input>
					<template slot="right">
						<view class="sex row">
							
						</view>
					</template>
				</u-form-item>
				<u-form-item  prop="name" label="驾龄:" borderBottom>
					<u-input v-model="info.name" placeholder="请输入您的名字" border="none" ></u-input>
				</u-form-item>
				<u-form-item  prop="name" label="驾照类型:" borderBottom>
					<u-input v-model="info.name" placeholder="请输入您的名字" border="none" ></u-input>
				</u-form-item>
				<u-form-item  prop="name" label="联系方式:" borderBottom>
					<u-input v-model="info.name" placeholder="请输入您的名字" border="none" ></u-input>
				</u-form-item>
				<u-form-item  prop="name"   >
					<view class="upload">
						<view class="u-t">上传照片:</view>
						<u-upload
							class="mt20"
							:fileList="fileList"
							@delete="deletePic"
							@afterRead="afterRead"
							name="4"
							multiple
							:maxCount="2"
						></u-upload>
					</view>
				</u-form-item>
			</view>
			<view class="model mt20">
				<view class="f32-c333 title">车辆信息</view>
				<u-form-item  prop="name" label="准驾车型:" borderBottom>
					<u-input v-model="info.name" placeholder="请输入您的名字" border="none" ></u-input>
				</u-form-item>
				<u-form-item  prop="name" label="上岗证类型:" borderBottom>
					<u-input v-model="info.name" placeholder="请输入您的名字" border="none" ></u-input>
				</u-form-item>
				
				<u-form-item  prop="name"   >
					<view class="upload">
						<view class="u-t">上传驾照照片:</view>
						<u-upload
							class="mt20"
							:fileList="fileList"
							@delete="deletePic"
							@afterRead="afterRead"
							name="4"
							multiple
							:maxCount="2"
						></u-upload>
					</view>
				</u-form-item>
			</view>
		</u--form>
		
		<view class=" btn_default">
			提交申请
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				sexType:1,  //1男，2女
				rules:{}
			};
		}
	}
</script>

<style lang="scss" scoped>
	.driver-wrap{
		padding: 15upx 30upx;
		.model{
			background: #fff;
			padding: 20upx;
			border-radius: 14upx;
			.m-img{
				width: 20upx;
				height: 20upx;
			}
		}
	}

</style>
