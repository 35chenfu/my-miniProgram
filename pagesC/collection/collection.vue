<template>
	<view class="coll-wrap">
		<view class="list">
			<view class="item" v-for="(item,index) in productList" :key="index">
				<productInfo :info="item" type="row" from="collect" @cancelCollect="cancelCollect"></productInfo>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				status: 'loadmore',
				productList: []
			};
		},
		created() {
			this.getData()
		},
		onReachBottom() {
			this.getData()
		},
		methods: {
			cancelCollect() {
				console.log(121212112) ;
				this.page = 1; 
				this.getData()
			},
			getData() {
				this.$http(`/my-system/collection/list`, {
					page: this.page,
					size: 10
				}, 'POST').then(res => {
					this.page++;
					this.productList = res.rows;
					if (res.rows.length < 10) {
						this.status = 'nomore'
					}
					this.total = res.total
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coll-wrap {}
</style>
