<template>
	<transition name="fadeIn">
	<div class="food" v-show="showfood">
		<div class="food-content">
			<div class="img-header">
				<img v-lazy="food.image" alt="">
				<p class="foodpanel-desc">{{food.info}}</p>
				<div class="back" @click="showfood = !showfood">
					<span class="iconfont icon-jiantou2"></span>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月销{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<div class="now">￥{{food.price}}</div>
					<div class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</div>
				</div>
				<div class="carcontrol-wrapper">
					<carControl :food="food"/>
				</div>
			</div>
		</div>
		<div class="food-cover" @click="toggleShow"></div>
	</div>
	</transition>
</template>

<script>
	import carControl from '../carControl/carControl.vue'
	export default{
		props:{
			food:Object
		},
		data(){
			return {
				showfood:false
			}
		},
		methods:{
			toggleShow(){
				this.showfood = !this.showfood
			}
		},
		components:{
			carControl
		}
	}
</script>

<style lang="stylus" scoped>

	.food
		position fixed
		width 100%
		top 0
		left 0
		bottom 48px
		z-index 101
		&.fadeIn-enter-active,&.fadeIn-leave-active
			transition opacity .3s
		&.fadeIn-enter,&.fadeIn-leave-to
			opacity 0
		.food-content
			position absolute
			left 50%
			top 50%
			transform translate(-50%,-50%)
			width 80%
			height 65%
			z-index 66
			background-color #FFFFFF
			border-radius 5px
			.content
				position relative
				padding 18px
				.title
					line-height 14px
					margin-bottom 8px
					font-size 14px
					font-weight 700
					color #07111b
				.detail
					margin-bottom 18px
					line-height 10px
					height 10px
					font-size 0
					.sell-count
						margin-right 12px
					.sell-count,.rating
						font-size: 10px;
						color: #93999f
				.price
					font-weight 700
					left 24px
					.now
						margin-right 8px
						font-size 14px
						color #f01414
					.old
						text-decoration line-through
						font-size 10px
						color #93999f
				.carcontrol-wrapper
					position absolute
					right 12px
					bottom 12px
			.img-header
				position relative
				width 100%
				height 0
				padding-top 100%
				>img
					position absolute
					left 0
					top 0
					width 100%
					height 100%
				
				.foodpanel-desc
					position absolute
					left 0
					right 0
					bottom 0
					padding 0 10px 10px
					font-size 10px
					letter-spacing 0
					color #333
				.back
					position absolute
					top 10px
					left 0
					>.iconfont
						display block
						padding 10px
						font-size 20px
						color #FFFFFF
		.food-cover
			position absolute
			z-index 55
			background-color rgba(0,0,0,0.5)
			left 0
			right 0
			bottom -48px
			top 0
</style>
