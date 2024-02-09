import {request} from '@/common/js/request'
const state = {
    $carList:[],
}
const mutations={
	GETCARLIST(state,data){
		state.$carList=data
	}
}

const actions={
	getCarList(state, payload){
		request('api/bmallshoppingcart/getShoppingCartPage').then(res=>{
			state.commit('GETCARLIST',res)
		})
	}
}
export default {
    state,
    mutations,
    actions,
}