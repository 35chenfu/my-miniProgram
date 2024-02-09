<template>
	<view class="search-wrap">
		<navbar  @onRightClick="onRightClick" :mysNavConfig="mysNavConfig" @changeInput="changeInput" >
			<view class="search-left" slot="left" @click="navTo('back')">
				<i class="iconfont">&#xe630;</i>
			</view>
			<view class="search-btn" slot="right">
				搜索
			</view>
		</navbar>
		<view class="top-nav row">
			<view class="left row" @click="changeSort">
				<text class="l-txt mr10">驾龄</text>
				<view class="sort column" >
					<i class="iconfont" :class="sortType==1 && 'active'">&#xeb6e;</i>
					<i class="iconfont" :class="sortType==2 && 'active'">&#xeb6d;</i>
				</view>
			</view>
			<view class="right row">
				<text class="l-txt mr10">驾照类型</text>
			</view>
		</view>
		<view class="list">
			<view class="item mt20 row jc-sb" v-for="(item,index) in 8" :key="index">
				<view class="left row">
					<image src="@/static/images/car3.png" mode="" class="l-img mr20"></image>
					<view class="l-info">
						<view class="f28-c333">
							姓名
						</view>
						<view class="mt10 f26-c666">
							驾龄：5年 | A1驾照
						</view>
						<view class="mt10 f26-c666">
							已服务50次
						</view>
					</view>
				</view>
				<view class="right" @click="navTo('/pagesA/driveDetail/driveDetail')">
					详情
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
					navPadding:true,
					navFixed:true,
					bgColor:'#FB852D',
					searchConfig:{
						placeholder:'输入关键词搜索',
						value:''
					}
				},
				searchKey:'',
				sortType:1,
				options:{
					'A1':'A1',
					'A2':'A2',
					'A3':'A3',
					'A4':'A4',
					'A5':'A6',
				}
			};
		},
		onLoad() {
			
		},
		methods:{
			changeSort(){
				this.sortType=this.sortType==1?2:1
			},
			getValue(e){
				console.log(e)
			},
			changeInput(e){
				this.searchKey=e.detail.value
			},
			onRightClick(){
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.search-wrap{
	.search-left{
		color: #fff;
	}
	.search-btn{
		color: #fff;
	}
	.top-nav{
		justify-content: center;
		background-color: #fff;
		padding: 17upx 0;
		.left{
			margin-right: 100upx;
			.l-txt{
				color: #333;
				font-size: 30upx;
			}
			.iconfont{
				font-size: 18upx;
				&.active{
					color: #FB852F;
				}
			}
		}
	}
	.list{
		padding-bottom: 50upx;
		.item{
			background-color: #fff;
			padding: 20upx 40upx;
			align-items: flex-end;
			.l-img{
				width: 112upx;
				height: 112upx;
				border-radius: 50%;
			}
			.right{
				background-color: #FB8534;
				width: 113upx;
				height: 44upx;
				line-height: 44upx;
				text-align: center;
				border-radius: 22upx;
				color: #fff;
				font-size: 26upx;
			}
		}
	}
}

</style>
