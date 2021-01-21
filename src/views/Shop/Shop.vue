<template>
	<div class="shopContainer">
		<shopHeader/>
		
		<!-- 点餐-评论-商家 -->
		<div class="tab">
			<div class="tab-item">
				<router-link replace to="/shop/food">点餐</router-link>
			</div>
			<div class="tab-item">
				<router-link replace to="/shop/ratting">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link replace to="/shop/seller">商家</router-link>
			</div>
		</div>
		<!-- 点餐-评论-商家 -->
		<!-- 好处：复用路由组件对象，复用路由组件获取后台的数据 -->
		<keep-alive>
			<router-view/>
		</keep-alive>
		
	</div>
</template>

<script>
	import shopHeader from '../../components/shopHeader/shopHeader.vue';
	export default{
		data(){
			return{
				
			}
		},
		mounted() {
			this.$store.dispatch('getShopGoods')
			this.$store.dispatch('getShopRatings')
			this.$store.dispatch('getShopInfo')
		},
		components:{
			shopHeader
		}
	}
</script>

<style scoped lang="stylus">
	
	.tab
		height 40px
		line-height 40px
		background-color #fff
		border-bottom 1px solid #ccc
		position relative
		.tab-item
			float left
			width 33.33%
			text-align center
			font-size 14px
			color #4d555d
			>a
				display block
				position relative
				text-decoration none
				color #4d555d
				&.router-link-active
					color #02a774
					&::after
						content ''
						position absolute
						left 50%
						transform translateX(-50%)
						background-color #02a774
						bottom -1px
						height 2px
						width 35px
</style>
