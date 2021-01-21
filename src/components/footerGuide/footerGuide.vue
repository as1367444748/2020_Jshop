<template>
  <div class="footer_guide">
	<router-link replace class="guide_item" to="/msite">
		<span class="item_icon">
			<em class="iconfont icon-waimai-"></em>
		</span>
		<span>外卖</span>
	</router-link>
	<router-link replace class="guide_item" to="/search">
		<span class="item_icon">
			<em class="iconfont icon-sousuo2"></em>
		</span>
		<span>搜索</span>
	</router-link>
	<router-link replace class="guide_item" to="/order">
		<span class="item_icon">
			<em class="iconfont icon-dingdan1"></em>
		</span>
		<span>订单</span>
	</router-link>
	<router-link replace class="guide_item" to="/profile">
		<span class="item_icon">
			<em class="iconfont icon-geren"></em>
		</span>
		<span>我的</span>
	</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="stylus">
	@import "../../../public/stylus/mixins.styl"
	.footer_guide
		top-border-1px(#e4e4e4)
		position fixed
		z-index 100
		left 0
		right 0
		bottom 0
		background-color #FFFFFF
		width 100%
		height 50px
		display flex
		.router-link-active
			color #02A774
		.iconfont
			font-size 24px
		.guide_item
			display flex
			flex 1
			text-align center
			flex-direction column
			align-items center
			margin 5px
</style>
