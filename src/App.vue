<template>
	<div id="app">
		<router-view></router-view>
		<footerGuide v-show="$route.meta.showFooter" />
	</div>
</template>
<script>
	import footerGuide from './components/footerGuide/footerGuide.vue';
	//mapActions vuex的映射函数
	import {mapActions} from 'vuex'//获取请求数据
	import {
		reqfoodTypes
	} from './api'
	export default {
		mounted() {
			//发请求方式
			// 1、可以用this.$store.dispatch('')来获取数据
			// this.$store.dispatch('getaddress')
			
			//2、获取地址数据
			this.getaddress()
			// this.getfoodTypes()//获取地址数据
			
			//获取用户信息
			this.getUserInfo()
		},
		methods:{
			
			//2、也可以用...mapActions来或与数据 然后通过this.getaddress()调用
			...mapActions(['getaddress','getUserInfo'])
		},
		components: {
			footerGuide
		}
	}
</script>
<style lang="stylus">
	#app 
		height 100% 
		width 100% 
</style>
