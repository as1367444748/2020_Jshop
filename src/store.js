import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//直接从后台更新state多个方法对象
import {
	RECEIVE_ADDRESS,
	RECEIVE_FOODTYPES,
	RECEIVE_SHOPS,
	RECEIVE_USER_INFO,
	RESET_USER_INFO,
	RECEIVE_GOODS,
	RECEIVE_RATINGS,
	RECEIVE_SELLER,
	INCREMENT_FOOD_COUNT,
	DECREMENT_FOOD_COUNT,
	ClEAR_CAR,
	GET_SEARCH_SHOPS
	} from './mutation-types.js'

import {
	reqAddress,
	reqfoodTypes,
	reqShops,
	reqUserInfo,
	reqLogout,
	reqFoods,
	reqRatings,
	reqSeller,
	reqKeyShop
	
} from './api'

export default new Vuex.Store({
  state: {
	longitude:116.36867,//纬度
	latitude:40.10038,//经度
	//建立mutation-type.js就是把这里数据从后台赋值 然后覆盖掉这些默认数据
	address:{},// 地址相关信息对象
	reqfoodTypes:[],//食品分类数组
	shops:[],//商家数组
	userInfo:{},//用户信息
	goods:[],//商品列表
	ratings:[],//商家评价列表
	seller:{},//商家信息
	carFoods:[],//购物车列表里面的商品
	searchShopsList:[] //获取商家搜索列表
  },
  mutations: {
		//state从哪里来
		['RECEIVE_ADDRESS'](state,{address}){
			state.address = address
		},
		['RECEIVE_FOODTYPES'](state,{reqfoodTypes}){
			state.reqfoodTypes = reqfoodTypes
		},
		['RECEIVE_SHOPS'](state,{shops}){
			state.shops = shops
		},
		['RECEIVE_USER_INFO'](state,{userInfo}){
			state.userInfo = userInfo
		},
		['RESET_USER_INFO'](state){
			state.userInfo = {}
		},
		['RECEIVE_GOODS'](state,{goods}){
			state.goods = goods
		},
		['RECEIVE_RATINGS'](state,{ratings}){
			state.ratings = ratings
		},
		['RECEIVE_SELLER'](state,{seller}){
			state.seller = seller
		},
		
		['INCREMENT_FOOD_COUNT'](state,{food}){
			//当点击添加的时候判断商品中有count吗?
			if(!food.count){
				Vue.set(food,'count',1)
				state.carFoods.push(food)
			}else{
				food.count++
			}
		},
		['DECREMENT_FOOD_COUNT'](state,{food}){
			if(food.count){//只有值才去减
				food.count--
				if(food.count===0){
					state.carFoods.splice(state.carFoods.indexOf(food),1)
				}
			}
		},
		['ClEAR_CAR'](state){
			//清空food里面的Count
			state.carFoods.forEach(food=>food.count = 0)
			
			//清空购物车
			state.carFoods = []
		},
		['GET_SEARCH_SHOPS'](state,{searchShops}){
			state.searchShopsList = searchShops
		}
  },
  getters:{
	 //商品购物车总计
	 totalCount(state){
		 //reduce遍历数组 计算每个元素 返回总和
		 return state.carFoods.reduce((preToatol,food)=>preToatol+food.count,0)
	 },
	 // 商品购物车总价
	 totalPrice(state){
	 		 return state.carFoods.reduce((preToatol,food)=>preToatol+food.count*food.price,0)
	 },
	 //筛选满意的评价数据
	 positiveRate(state){
		 return state.ratings.reduce((preToatol,rating)=>preToatol+(rating.rateType===0?1:0),0)
	 }
  },
  actions: {
	//异步获取地址
	async getaddress({commit,state}){
		//发送ajax异步请求
		const geohash = state.latitude + ',' + state.longitude;
		const result = await reqAddress(geohash);
		//提交一个mutation
		if(result.code===0){
			const address = result.data;
			commit('RECEIVE_ADDRESS',{address})
		}
	},
	//异步获取食品分类列表
	async getfoodTypes({commit}){
		//发送ajax异步请求
		const result = await reqfoodTypes();
		//提交一个mutation
		if(result.code===0){
			const reqfoodTypes = result.data;
			commit('RECEIVE_FOODTYPES',{reqfoodTypes})
		}
	},
	//异步获取商家列表
	async getshops({commit,state}){
		const {longitude,latitude} =state;
		//发送ajax异步请求
		const result = await reqShops(longitude,latitude);
		//提交一个mutation
		if(result.code===0){
			const shops = result.data;
			commit('RECEIVE_SHOPS',{shops})
		}
	},
	//同步 记录用户信息 userInfo这个参数是在Login.vue中传入来的
	recordUser({commit},userInfo){
		commit('RECEIVE_USER_INFO',{userInfo})
	},
	//异步获取用户信息
	async getUserInfo({commit}){
		const result = await reqUserInfo()
		if(result.code===0){
			const userInfo = result.data
			commit('RECEIVE_USER_INFO',{userInfo})
		}
	},
	//异步登出
	async logout({commit}){
		const result = await reqLogout()
		if(result.code===0){
			commit('RESET_USER_INFO')
		}
	},
	//异步获取商品列表
	async getShopGoods({commit}){
		//通过promise 当数据更新后 通知组件
		const result = await reqFoods();
		if(result.code===0){
			const goods = result.data
			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					commit('RECEIVE_GOODS',{goods})
					resolve()
				},300)
			})
		}
	},
	//获取商品评论列表
	async getShopRatings({commit}){
		const result = await reqRatings();
		if(result.code===0){
			const ratings = result.data
			return new Promise((resolve,reject)=>{
				commit('RECEIVE_RATINGS',{ratings})
				resolve()
			})
			
			
		}
	},
	//获取店铺信息
	async getShopInfo({commit}){
		const result = await reqSeller();
		if(result.code===0){
			const seller = result.data
			commit('RECEIVE_SELLER',{seller})
		}
	},
	
	
	//同步更新商品的count 这是从carControl传过来的派发事件
	updateFoodCount({commit},{isAdd,food}){
		//判断isAdd是增加还是减少
		if(isAdd){
			commit('INCREMENT_FOOD_COUNT',{food})
		}else{
			commit('DECREMENT_FOOD_COUNT',{food})
		}
	},
	//清理购物车
	clearCar({commit}){
		commit('ClEAR_CAR')
	},
	
	//获取搜索的商家列表
	async getSearchShops({commit,state},keywords){
		const geohash = state.latitude + ',' + state.longitude;
		const result = await reqKeyShop(geohash,keywords)
		if(result.code===0){
			const searchShops = result.data
			commit('GET_SEARCH_SHOPS',{searchShops})
		}
	}
  }
})
