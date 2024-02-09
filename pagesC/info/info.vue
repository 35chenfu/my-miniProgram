<template>
	<view class="info-wrap">
		<view class="form-wrap">
			<u--form labelPosition="left" :model="userInfo" ref="uForm">
				<u-form-item prop="name" label="姓名:" borderBottom labelWidth="100">
					<u-input v-model="userInfo.name" placeholder="请输入姓名" border="none"></u-input>
				</u-form-item>
				<u-form-item prop="name" label="手机号:" borderBottom labelWidth="100">
					<u-input v-model="userInfo.phone" placeholder="请输入手机号" border="none"></u-input>
				</u-form-item>
				<u-form-item prop="email" label="邮箱:" borderBottom labelWidth="100">
					<u-input v-model="userInfo.email" placeholder="请输入邮箱" border="none"></u-input>
				</u-form-item>
				<u-form-item prop="name" label="地址:" borderBottom labelWidth="100">
					<u-input v-model="userInfo.address" placeholder="请输入地址" border="none"></u-input>
				</u-form-item>
			</u--form>
			<view class="btn-wrap">
				<view class="btn" @click="save">
					保存
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					sex: 1
				},
				fileList: []
			};
		},
		created(){
			this.userInfo = uni.getStorageSync('userInfo');
		},
		methods: {
			save() {
				this.$http('/my-system/user/update', this.userInfo, 'POST').then(r => {
					uni.setStorageSync('userInfo', this.userInfo);
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					})
					uni.switchTab({
						url: '/pages/user/user'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-wrap {
		min-height: 100vh;
		background-color: #fff;
		padding: 32upx;

		.btn-wrap {
			width: 80%;
			margin: 0 auto;
			margin-top: 80upx;
			.btn {
				text-align: center;
				height: 80upx;
				background: #FB852F;
				border-radius: 10upx;
				line-height: 80upx;
				color: #fff;
			}
		}
	}
</style>
