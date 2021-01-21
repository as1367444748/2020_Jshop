<template>
	<div>
		<div class="shopCar">
			<div class="content">
				<div class="content-left" @click="toggleShow">
					<div class="logo-wrapper">
						<div class="logo-highlight" :class="{highlight:totalCount}">
							<span class="iconfont icon-gouwuche" :class="{highlight:totalCount}"></span>
						</div>
						<!-- 商品总计 -->
						<div class="num" v-if="totalCount">{{totalCount}}</div>
					</div>
					<!-- 商品总价 -->
					<div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
				</div>
				<div class="content-right">
					<div class="pay" :class="payClass">{{payText}}</div>
				</div>
			</div>
			<!-- 购物车列表 -->
			<transition name="move">
			<div class="shopcar-list" v-show="listShow">
				<div class="list-header">
					<div class="title">购物车</div>
					<div class="empty" @click="clearCar">清空</div>
				</div>
				<div class="list-content">
					<ul>
						<li class="food" v-for="(food,index) in carFoods">
							<span class="name">{{food.name}}</span>
							<div class="price"><span>￥{{food.price}}</span></div>
							<div class="carcontrol-wrapper"><carControl :food="food"/></div>
						</li>
					</ul>
				</div>
			</div>
			</transition>
		</div>
		<div class="list-mark" v-show="listShow" @click="toggleShow"></div>
	</div>
</template>

<script>
	// 引入vuex中的state
	import {mapState,mapGetters} from 'vuex'
	import BetterScroll from 'better-scroll'
	import { MessageBox } from 'mint-ui';
	import carControl from '../carControl/carControl.vue'
	export default{
		props:{
			food:Object
		},
		data(){
			return {
				isShow:false
			}
		},
		computed:{
			//在computed中通过..mapState取出该数据
			...mapState(['carFoods','seller']),
			...mapGetters(['totalCount','totalPrice']),
			
			// 购物车样式的计算属性
			payClass(){
				const {totalPrice} =this;
				const {minPrice} = this.seller
				return totalPrice>=minPrice?'enough':'not-enough'
			},
			
			payText(){
				const {totalPrice} =this;
				const {minPrice} = this.seller
				//如果totalPrice=0
				if(totalPrice===0){
					return `￥${minPrice}元起送`
				}else if(minPrice>totalPrice){
					return `还差￥${minPrice-totalPrice}元起送`
				}else{
					return '结算'
				}
			},
			//总数量等于0 不显示购物车列表
			listShow () {
				if(!this.totalCount){
					return false;
				}
				if(this.isShow){
					this.$nextTick(()=>{
						if(!this.scroll){
							this.scroll=new BetterScroll('.list-content',{
								click:true
							})
						}else{
							this.scroll.refresh()
						}
					})
				}
				return this.isShow
			}
		},
		//显示和隐藏切换函数
		methods:{
			toggleShow(){
				if(this.totalCount){
					this.isShow = !this.isShow
				}
				
			},
			clearCar () {
				MessageBox.confirm('确定清空购物车吗?').then(action => {
				  this.$store.dispatch('clearCar')
				},()=>{});
				
			}
			
		},
		
		components:{
			//按钮
			carControl
		}
	}
</script>

<style scoped lang="stylus">
	.shopCar
		position fixed
		left 0
		bottom 0
		z-index 50
		width 100%
		height 48px
		.content
			display flex
			background-color #141d27
			font-size 0
			color rgba(255,255,255,0.4)
			.content-left
				flex 1
				.logo-wrapper
					display inline-block
					width 56px
					height 56px
					vertical-align top
					margin 0 12px
					border-radius 50%
					background-color #141d27
					box-sizing border-box
					padding 6px
					position relative
					top -10px
					.num
						position absolute
						top 0
						right 0
						width 24px
						height 16px
						line-height 16px
						font-size 9px
						font-weight 700
						color #FFFFFF
						background-color #f01414
						box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
						border-radius 6px
						text-align center
					.logo-highlight
						width 100%
						height 100%
						border-radius 50%
						text-align center
						&.highlight
							background-color green
						.icon-gouwuche
							font-size 29px
							line-height 44px
							&.highlight
								color #FFFFFF
				.price
					display inline-block
					line-height 24px
					padding-right 12px
					font-size 16px
					box-sizing border-box
					font-weight 700
					margin-top 5px
					vertical-align top
					&.highlight
						color #fff
				.desc
					display inline-block
					vertical-align bottom
					margin-bottom 15px
					margin-left -45px
					font-size 10px
			.content-right
				flex 0 0 105px
				width 105px
				.pay
					height 48px
					line-height 48px
					text-align center
					font-weight 700
					font-size 12px
					color #fff
					&.not-enough
						background-color #2b333b
					&.enough
						background-color #4CD96F
		.shopcar-list
			position absolute
			left 0
			top 0
			z-index -1
			width 100%
			transform translateY(-100%)
			&.move-enter-active,&.move-leave-active
				transition transform .3s
			&.move-enter,&.move-leave-to
				transform translateY(0)
			.list-header
				height 40px
				line-height 40px
				padding 0 18px
				background-color #F3F5F7
				border-bottom 1px solid rgba(7,17,27,0.1)
				overflow hidden
				.title
					float left
					font-size 14px
					color #07111b
				.empty
					float right
					font-size 12px
					color #00a0dc
			.list-content
				padding 0 18px
				max-height 217px
				overflow hidden
				background-color #FFFFFF
				.food
					position relative
					padding 12px 0
					box-sizing border-box
					border none
					.name
						line-height 24px
						font-size 14px
						color #07111b
					.price
						position absolute
						right 90px
						bottom 12px
						line-height 24px
						font-size 14px
						font-weight 700
						color #f01414
					.carcontrol-wrapper
						position absolute
						right 0
						bottom 6px
	.list-mark
		position fixed
		top 0
		left 0
		width 100%
		height 100%
		z-index 40
		opacity 1
		backdrop-filter blur(10px)
		background-color rgba(7,17,27,.6)
</style>
