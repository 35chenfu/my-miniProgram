import Vue from 'vue'
import Vuex from 'vuex'
import {request} from '@/common/js/request'

Vue.use(Vuex) // vue的插件机制

// Vuex.Store 构造器选项
const store = new Vuex.Store({
    // 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
    state: {
        // 用户信息
        $userInfo: {
            id: 1
        },
		$StockManageInfo:{},
		$WareHouseList:[],
        $orderData:{}
    },
	actions:{
		Get_Ware_House_List(state){
			request('api/workhous/getWorkhousList').then(res=>{
				state.commit('GET_WARE_HOUSE_LIST',res)
			})
		}
	},
	mutations:{
		SET_STOCK_MANAGE_INFO(state,data){
			state.$StockManageInfo=Object.assign({},state.$StockManageInfo,data)
		},
		CLEAR_STOCK_MANAGE(state,data){
			state.$StockManageInfo={}
		},
		GET_WARE_HOUSE_LIST(state,data){
			state.$WareHouseList=data
		},
        SET_ORDER_DATA(state,data){
            state.$orderData=Object.assign({},state.$orderData,data)
        },
        INIT_ORDER_DATA(state,data){
            state.$orderData={}
        }
	}
})

export default store
