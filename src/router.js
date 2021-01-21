import Vue from 'vue'
import Router from 'vue-router'

// //主页
// import MSite from './views/MSite/MSite.vue'
// //搜索页
// import Search from './views/Search/Search.vue'
// //订单页
// import Order from './views/Order/Order.vue'
// //登录
// import Login from './views/Login/Login.vue'

const MSite = ()=>import ('./views/MSite/MSite.vue')
const Search = ()=>import ('./views/Search/Search.vue')
const Order = ()=>import ('./views/Order/Order.vue')
const Login = ()=>import ('./views/Login/Login.vue')




import Profile from './views/Profile/Profile.vue'
import UserInfo from './views/userInfo/userInfo.vue'
import Shop from './views/Shop/Shop.vue'
import Food from './views/Shop/components/food.vue'
import Ratting from './views/Shop/components/ratting.vue'
import Seller from './views/Shop/components/seller.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  activeClass:"router-link-active",
  base: process.env.BASE_URL,
  routes: [
	  {
	  	path:"/",
	  	redirect:"/msite"
	  },
    {
		path:"/msite",
		component:MSite,//返回路由组件的函数，只有执行此函数才会加载路由组件
		meta:{
			showFooter:true
		}
	},
	{
		path:"/search",
		component:Search,
		meta:{
			showFooter:true
		}
	},
	{
		path:"/order",
		component:Order,
		meta:{
			showFooter:true
		}
	},
	{
		path:"/profile",
		component:Profile,
		meta:{
			showFooter:true
		}
	},
	{
		path:"/Login",
		component:Login
	},
	{
		path:"/userInfo",
		component:UserInfo
	},
	{
		path:"/shop",
		component:Shop,
		children:[
			{
				path:"",
				redirect:'/shop/food'
			},
			{
				path:"/shop/food",
				component:Food
			},
			{
				path:"/shop/ratting",
				component:Ratting
			},
			{
				path:"/shop/seller",
				component:Seller
			}
		]
	},
	
    
  ]
})
