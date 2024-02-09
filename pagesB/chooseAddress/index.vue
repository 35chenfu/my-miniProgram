<template>
	<view class='app'>
		<!-- 当前选择地址 -->
		<view class="current-address row b-b">
			<view class="left">
				<view class="row">
					<text class="red">[当前]</text>
					<text class="title">{{currentAddress.title}}</text>
				</view>
				<text class="addr clamp">{{currentAddress.address}}</text>
			</view>
			<!-- 搜索图标 -->
			<image
				class="ser-icon" 
				src="https://b2bmall2022.oss-cn-hangzhou.aliyuncs.com/search.png"
				@click="navTo('./search?city='+curCity)"
			></image>
		</view>
		<!-- 补充详细地址 -->
		<view class="confirm-wrap row">
			<input class="input" placeholder="补充详细地址：楼号、门牌等(选填)" placeholder-class="placeholder" v-model="room" @confirm='submit'></input>
			<view class="btn" @click="submit">确定</view>
		</view>
		<map 
			id="map"
			class="map"
			:scale="15" 
			:show-location="true" 
			:longitude="map.longitude" 
			:latitude="map.latitude"
			@regionchange="onRegionchange"
		>
			<cover-image class="map-center-icon" src="https://7478-tx-cloud-mix-mall-d6944c-1302673523.tcb.qcloud.la/5bfbd58b18200d8e16f6b17a02e6ed9.png"></cover-image>
		</map>
		<!-- 结果集 -->
		<scroll-view scroll-y class="addr-list-scroll">
			<view class="addr-list">
				<view class="addr-item b-b row" v-for="(item, index) in list" :key="index" @click="chooseAddress(index)">
					<view class="left">
						<text class="title">{{item.title}}</text>
						<text class="addr">{{item.address}}</text>
					</view>
					<image
						v-if='checked === index'
						class="icon_circle" 
						src="https://b2bmall2022.oss-cn-hangzhou.aliyuncs.com/quanzhong%402x.png"
						mode="widthFix"
					></image>
					
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import config from '@/config'
	const QQMapWX = require('./js/qqmap-wx-jssdk.min.js')
	const qqmapsdk = new QQMapWX({
		key: config.qqmapWxKey
	})
	let _mapCtx = null;
	export default {
		name:'chooseAddress',
		data() {
			return {
				curCity: '',
				mapStatus: 1,
				map: {
					longitude: 116.39742,
					latitude: 39.909,
				},
				room: '', //补充地址 门牌号、房间号
				list: [], //地址列表
				checked: 0, //当前选择选择地址下标
				tempAddress: null, //编辑或者搜索到地址时，需要手动将结果添加到poi集
				type:''
			}
		},
		computed: {
			currentAddress(){
				if(this.list.length === 0){
					return {};
				}
				return this.list[this.checked];
			}
		},
		created() {
			_mapCtx = uni.createMapContext('map');
		},
		onNavigationBarButtonTap() {
			this.submit();
		},
		async onLoad(options) {
			//编辑地址时参数
			let optionData = options.data;
			this.type=options.type
			let lng, lat;
			if(optionData){
				//编辑地址时
				this.tempAddress = JSON.parse(optionData);
				this.room = this.tempAddress.room;
				this.type=this.tempAddress.type;
				lng = this.tempAddress.location.lng;
				lat = this.tempAddress.location.lat;
			}else{
				//没有传坐标时获取用户当前定位
				const userLocation = await this.getLocation();
				lng = +userLocation.longitude;
				lat = +userLocation.latitude;
			}
			this.map = {
				longitude: lng,
				latitude: lat
			}
			this.position = {
				longitude: lng,
				latitude: lat
			}
			this.getAddressList(1)
		},
		methods: {
			//确定选择
			submit() {
				const {currentAddress, room, } = this;
				const {ad_info, address, location, title} = currentAddress;
				/* if(!room){
					this.$util.msg('请补充详细地址');
					return;
				} */
				let type=this.type
				this.$util.prePage().setAddress(Object.assign({}, {
					ad_info, address, location, title,room,type
				}));
				uni.navigateBack();
			},
			//获取poi列表  
			getAddressList(s = 0) {
				//在ios下防止搜索返回时多次加载地址列表的问题
				if(this.isSetTempAddress === 1){
					return;
				}
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: this.position.latitude,
						longitude: this.position.longitude
					},
					get_poi: 1,
					poi_options: "page_size=30;page_index=1", 
					success: res=> {
						this.initRegion(s,res)
					},
					fail: err=> {
						console.log(err)
					}
				})
			},
			initRegion(s,res){
				res.result.pois.forEach(poi=>{
					if(!poi.ad_info){
						poi.ad_info = {
							adcode: poi.adcode,
							city: poi.city,
							district: poi.district,
							province: poi.province
						}
					}
				})
				//有搜索结果时，手动追加到列表顶部
				if(this.tempAddress){
					if(this.tempAddress.title != res.result.pois[0].title){
						if(!this.tempAddress.ad_info){
							this.tempAddress.ad_info = {
								adcode: this.tempAddress.adcode,
								city: this.tempAddress.city,
								district: this.tempAddress.district,
								province: this.tempAddress.province
							}
						}
						res.result.pois.unshift(this.tempAddress);
					}
					this.tempAddress = null;
					this.isSetTempAddress = 1;
					setTimeout(()=>{
						this.isSetTempAddress = 0;
					}, 500)
				}
				if (s) {
					const ad_info = res.result.pois[0].ad_info;
					this.curCity = ad_info.city || '';
					res.result.pois[0].select = 1
					this.list = res.result.pois;
					this.checked = 0;
				} else {
					this.list = res.result.pois;
				}
			},
			//地图区域改变
			onRegionchange(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					//h5 end  安卓 regionchange
					if (e.type === 'end' || e.type === 'regionchange') {
						_mapCtx.getCenterLocation({
							success: res => {
								this.position = {
									latitude: res.latitude,
									longitude: res.longitude
								}
								if (this.mapStatus == 1) { // 防止地图点击时 进行多次加载
									this.getAddressList(1)
								}
							},
							fail: err=>{
								console.log(err);
							}
						})
					}
				}, 200)
			},
			//地址列表点击
			chooseAddress(index) {
				let list = this.list
				this.map = {
					longitude: list[index].location.lng,
					latitude: list[index].location.lat
				}
				this.checked = index;
				this.mapStatus = 0;
				//防止ios下触发多次加载列表的bug
				clearTimeout(this.mapStatusTimer);
				this.mapStatusTimer = setTimeout(()=>{
					this.mapStatus = 1;
				}, 1000)
			},
			//获取用户定位
			getLocation (){
				return new Promise(resolve=> {
					uni.getLocation({
						type: 'wgs84',
						success: res=> {
							resolve({
								longitude: res.longitude,
								latitude: res.latitude
							})
						},
						err: err=> {
							resolve({
								longitude: 116.39742,
								latitude: 39.909,
							})
						},
						complete(res) {
						}
					})
				})
			},
			navTo(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #F6F6F6;
	}
</style>
<style scoped lang="scss">
	.app{
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}
	.row{
		display: flex;
		align-items: center;
	}
	.b-b{
		position: relative;
		
		&:after{
			position: absolute;
			z-index: 3;
			left: 0;
			top: auto;
			bottom: 0;
			right: 0;
			height: 0;
			content: '';
			transform: scaleY(.5);
			border-bottom: 1px solid #e5e5e5;
		}
	}
	.clamp {
		/* #ifdef APP-PLUS-NVUE */
		lines: 1;
		/* #endif */
		/* #ifndef APP-PLUS-NVUE */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		/* #endif */
	}
	.current-address{
		height: 120upx;
		padding: 0 24upx;
		background-color: #fff;
		
		.left{
			width: 634upx;
		}
		.red{
			flex-shrink: 0;
			margin-right: 6upx;
			font-size: 28upx;
			color: $base-color;
			line-height: 36upx;
		}
		.title{
			font-size: 28upx;
			color: #333;
			font-weight: bold;
			line-height: 36upx;
		}
		.addr{
			width: 700upx;
			margin-top: 12upx;
			font-size: 24upx;
			color: #909399;
			line-height: 1.4;
		}
		.ser-icon{
			flex-shrink: 0;
			width: 36upx;
			height: 40upx;
			padding: 12upx 4upx 12upx 20upx;
		}
	}	
	.confirm-wrap{
		height: 88upx;
		padding: 0 24upx;
		background-color: #fff;
		
		.input{
			flex: 1;
			font-size: 28upx;
			color: #303133;
		}
		.btn{
			padding: 0 24upx;
			font-size: 26upx;
			color: #fff;
			line-height: 50upx;
			background-color: $base-color;
			border-radius: 100upx;
		}
	}
	.map{
		width: 750upx;
		height: 700upx;
		
		.map-center-icon{
			position: absolute;
			left: 339upx;
			top: 264upx;
			width: 72upx;
			height: 72upx;
		}
	}
	.addr-list-scroll{
		flex: 1;
		overflow: hidden;
		
		.addr-list{
			background-color: #fff;
		}
		.addr-item{
			padding: 24upx;
		}
		.left{
			flex: 1;
			display: flex;
			flex-direction: column;
			padding-right: 50upx;
		}
		.title{
			font-size: 28upx;
			color: #303133;
		}
		.addr{
			margin-top: 10upx;
			font-size: 24upx;
			color: #909399;
			line-height: 1.4;
		}
	}
	.icon_circle{
		width: 50upx;
	}
</style>
