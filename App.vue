<script>
export default {
	globalData:{
		sysSize:{}
	},
	onLaunch: function() {
		console.log('App Launch');
		uni.hideTabBar()
		uni.getSystemInfo({
			success: (res) => {
				this.globalData.sysSize=res
			}
		})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */ 
@import "@/uni_modules/uview-ui/index.scss";
@import url("./common/css/common.scss");
@import url("./common/css/icon.css");
</style>
