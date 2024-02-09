<template>
	<view class="orderList-wrap">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<orderItem v-for="item in orderList" :key="item.id" :info="item" @update="update"></orderItem>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '待支付'
				}, {
					name: '已支付'
				}, {
					name: '已取消',
				}, {
					name: '无效',
				}, {
					name: '已退款',
				}],
				orderList: [],
				status: 'loadmore',
				page: 1,
				current: 0,
				total: 0,
			};
		},

		created() {
			this.getData()
		},
		onReachBottom() {
			this.getData()
		},
		methods: {
			update(){
				this.page = 1
				this.getData()
			},
			getData() {
				if (this.status = 'nomore')
					this.$http(`/my-order/order/userList`, {
						"orderStatus": this.current, //订单状态 0-未确认 1-已确认 2-已取消 3-无效 4-退款
						"page": this.page, //当前页码
						"size": 10, //每页显示条数
					}, 'POST').then(res => {
						this.page++;
						this.orderList = this.orderList.concat(res.rows);
						if (res.rows.length < 10) {
							this.status = 'nomore'
						}
						this.total = res.total
					})
			},
			change(obj) {
				this.current = obj.index;
				this.orderList = [];
				this.loadmore = 'loadmore';
				this.page = 1;
				this.getData()
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
