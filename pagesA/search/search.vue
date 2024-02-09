<template>
	<view class="search-wrap">
		<navbar  @onRightClick="onRightClick" :mysNavConfig="mysNavConfig" @changeInput="changeInput">
			<view class="search-btn" slot="right">
				搜索
			</view>
		</navbar>
		<view class="search-before">
			<view class="card-wrap" v-if="historyKey.length>0">
				<view class="title row jc-sb">
					<view class="left row">
						<image src="@/static/images/lsjl.png" mode="" class="l-img mr10"></image>
						<text class="l-txt">历史搜索</text>
					</view>
					<image @click="delHistory" src="@/static/images/sc.png" mode="" class="r-img "></image>
				</view>
				<view class="list row">
					<view class="item mt20 " v-for="(item,index) in historyKey" :key="index" @click="searchHandle(item)">
						{{item}}
					</view>
				</view>
			</view>
			<view class="card-wrap">
				<view class="title row jc-sb">
					<view class="left row">
						<image src="@/static/images/huo.png" mode="" class="l-img mr10"></image>
						<text class="l-txt">热门搜索</text>
					</view>
				</view>
				<view class="list row">
					<view class="item mt20 " v-for="(item,index) in 8" :key="index"  @click="searchHandle(item)">
						汽车汽车
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mysNavConfig:{
					isHome:true,
					navPadding:true,
					navFixed:true,
					bgColor:'#F4F4F4',
					searchConfig:{
						placeholder:'输入关键词搜索',
						value:''
					}
				},
				historyKey:[],
				searchKey:''
			};
		},
		onLoad() {
			this.historyKey=uni.getStorageSync('historyKey')
		},
		methods:{
			changeInput(e){
				this.searchKey=e.detail.value
			},
			delHistory(){
				uni.removeStorageSync('historyKey')
				this.historyKey=[]
			},
			onRightClick(){
				let list=uni.getStorageSync('historyKey') || []
				let isHave=list.find(el=>{
					return el==this.searchKey
				})
				if(!isHave){
					list.push(this.searchKey)
					uni.setStorageSync('historyKey',list)
					this.historyKey=list
				}
			},
			searchHandle(key){
				uni.navigateTo({
					url:'/pagesA/searchResult/searchResult'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-wrap{
	min-height: 100vh;
	background-color: #fff;
	.search-btn{
		color: #FA842B;
	}
	.search-before{
		.card-wrap{
			padding: 30upx;
			.title{
				.l-img{
					width: 43upx;
					height: 43upx;
				}
				.r-img{
					width: 26upx;
					height: 30upx;
				}
			}
			.list{
				flex-wrap: wrap;
				.item{
					background-color: #F4F4F4;
					border-radius: 33upx 0px 33upx 0px;
					padding: 16upx 20upx;
					color: #9C9C9C;
					font-size: 28upx;
					margin-right: 30upx;
				}
			}
		}
	}
}

</style>
