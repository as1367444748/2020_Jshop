<template>
  <div id="app">
    <router-view></router-view>
	<footerGuide v-show="$route.meta.showFooter"/>
  </div>
</template>
<script>
	import footerGuide from './components/footerGuide/footerGuide.vue'
	export default{
		components:{
			footerGuide
		}
	}
</script>
<style lang="stylus">
	#app
		height 100%
		width 100%
		background-color #f5f5f5
</style>
