<template>
	<div class="shopsContainer">
		<ul class="shop_list" v-if="shops.length">
			<!-- S商家店铺列表 -->
			<li @click="$router.push('./shop')" class="shop-item border-1px" v-for="(shop,index) in shops" :key="index">
				<a href="javascript:;">
					<div class="shop-left">
						<img src="./images/shop/shop.jpg" alt="" >
					</div>
					<div class="shop-right">
						<section class="shop-header">
							<h4 class="shop-title ellipsis">
								<em class="iconfont icon-pinpai"></em>
								{{shop.name}}
							</h4>
							<ul class="shop_detail_ul">
								<li class="supports">保</li>
								<li class="supports">准</li>
								<li class="supports">票</li>
							</ul>
						</section>
						<section class="shop-rating-order">
							<section class="shop_raing_order_left">
								<!-- 评分 -->
								<Stars :score="shop.float_delivery_fee" size="star-24"/>
								<div class="rating_section">
									{{shop.float_delivery_fee}}
								</div>
								<div class="order_section">
									月售106单
								</div>
							</section>
							<section class="shop_raing_order_right">
								<span class="delivery_style delivery_right">团长专送</span>
							</section>
						</section>
						<section class="shop-distance">
							<p class="shop_delivery_msg">
								<span>￥{{shop.float_minimum_order_amount}}起送</span>
								<span class="segmentation">/</span>
								<span>配送费约¥{{shop.float_delivery_fee}}</span>
							</p>
						</section>
					</div>
				</a>
			</li>
			<!-- E商家店铺列表 -->
		</ul>
		<ul v-else>
			<li v-for="item in 6">
				<img src="./images/shop/shop_back.svg" alt="">
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import Stars from '../Stars/stars.vue'
	export default{
		data(){
			return {
				baseURL:"http://cangdu.org:8001/img/"
			}
		},
		computed:{
			...mapState(['shops'])
		},
		components:{
			Stars
		}
	}
</script>

<style lang="stylus" scoped>
	.shopsContainer
		width 100%
		padding-bottom 50px
		.shop-item 
			position relative
			border none
			width 100%
			>a
				display block
				box-sizing border-box
				padding 15px 8px
				width 100%
				overflow hidden
				.shop-left
					float left
					width 23%
					height 75px
					box-sizing border-box
					padding-right 10px
					img
						display block
						width 100%
						height 100%
				.shop-right
					float right
					width 77%
					.shop-header
						width 100%
						overflow hidden
						.shop-title
							float left
							width 200px
							color #333
							font-size 16px
							font-weight 700
							.icon-pinpai
								color #F5A100
								font-size 18px
						.shop_detail_ul
							float right
							overflow hidden
							margin-top 3px
							.supports
								float left
								font-size 10px
								color #999
								border 1px solid #f1f1f1
		
					.shop-rating-order
						width 100%
						margin 18px 0 8px 0
						overflow hidden
						.shop_raing_order_left
							float left
							color #ff9a0d
							.stars
								float left
								font-size 10px
							.rating_section
								float left
								font-size 10px
								margin-left 4px
								color #ff6000
							.order_section
								float left
								font-size 10px
								color #666
								transform scale(0.9)
						.shop_raing_order_right
							float right
							.delivery_right
								color #02a774
								border 1px solid #02a774
							.delivery_style
								transform-origin 35px 0
								transform scale(0.7) 
								display inline-block
								font-size 12px
								padding 1px
								border-radius 2px
					.shop-distance
						width 100%
						font-size 12px
						overflow hidden
						.shop_delivery_msg
							float left
							transform scale(0.9)
							color #666
							transform-origin 0
							.segmentation
								margin 0 5px
							
						
								
						
						
						
						
						
</style>
				
					