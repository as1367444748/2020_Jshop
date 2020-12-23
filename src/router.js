import Vue from 'vue'
import Router from 'vue-router'
import MSite from './views/MSite/MSite.vue'
import Search from './views/Search/Search.vue'
import Order from './views/Order/Order.vue'
import Profile from './views/Profile/Profile.vue'
import Login from './views/Login/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  activeClass:"router-link-active",
  base: process.env.BASE_URL,
  routes: [
    {
		path:"/msite",
		component:MSite,
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
		path:"/",
		redirect:"/msite"
	},
    
  ]
})
