<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper">
				<ul>
					<li  class="menu-item" 
					:class="{current:currentIndex==index}"  
					v-for="(good,index) in goods" 
					:key="index"
					@click="goIndex(index)"
					>
						<span class="text bottom-border-1px">
							<img v-if="good.icon" :src="good.icon" alt="" class="icon">
							{{good.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper">
				<ul ref="foodUl">
					<li class="food-list-hook" v-for="(good,index) in goods" :key="index">
						<h1 class="title">{{good.name}}</h1>
						<ul>
							<li @click="showFood(food)" class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
								<div class="icon">
									<img width="57px" height="57px" :src="food.icon" alt="">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span>
										<span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<del class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</del>
									</div>
									<div class="carcontrol-wrapper">
										<carControl :food="food" />
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<!-- 这是商品详情 -->
		<food ref="food" :food="food"/>
		<shopCar :food="food"/>
	</div>
</template>

<script>
	import BetterScroll from 'better-scroll'
	
	import {mapState} from 'vuex'
	import carControl from '../../../components/carControl/carControl.vue'
	import food from '../../../components/Food/food.vue'
	import shopCar from '../../../components/shopCar/shopCar.vue'
	//这里创建有问题 回想swiper要在列表显示之后才创建 用到watch+nextTick 、、初始化代码 和回调代码
	
	export default{
		data(){
			return {
				scrollY:0,
				tops:[],//列表第一次显示收集
				food:{}
			}
		},
		mounted() {
			this.$store.dispatch('getShopGoods').then(()=>{//数据更新后执行一样
				//这里和swiper 数据更新后执行一样 用的方式就是监视数据是否更新 通过promise resolve一个回调函数
				this.$nextTick(()=>{//数据更新显示之后执行
					this._initScrollY()
					this._initTops()
				})
			})
			
		},
		methods:{
			getIndex(e){
				this.id = e.currentTarget.dataset.index
			},
			_initScrollY(){
				const mentScroll = new BetterScroll('.menu-wrapper',{
					
				})
				this.foodScroll = new BetterScroll('.foods-wrapper',{
					 probeType: 2//因为惯性的滑动不会触发 3的话会
				})
				//给右侧列表绑定scroll监听
				this.foodScroll.on('scroll',(position)=>{
					//收集foodScroll实时移动的Y轴距离
					this.scrollY = Math.abs(position.y)
				})
				//解决惯性移动不改变的问题 监听滚动结束时的回调
				this.foodScroll.on('scrollEnd',(position)=>{
					//收集foodScroll实时移动的Y轴距离
					this.scrollY = Math.abs(position.y)
				})
				
			},
			_initTops(){
				const tops = [];//定义一个空数组
				let top = 0;//初始化第一个值
				tops.push(top)
				//获取foods的li 因为lis是伪数组
				const lis = this.$refs.foodUl.getElementsByClassName('food-list-hook')
				//转真数组
				Array.prototype.slice.call(lis).forEach(li=>{
					top+=li.clientHeight
					tops.push(top)
				})
				
				this.tops = tops
			},
			goIndex(index){
				//使右侧列表滑动到对应位置
				//得到目标scrollY
				const scrollY = this.tops[index]
				//立即更新scrollY(让点击的分类项成为当前的分类)
				this.scrollY = scrollY
				//平滑滚动右侧列表
				this.foodScroll.scrollTo(0,-scrollY,300)
			},
			showFood(food){
				//将数据传入food组件里面
				this.food = food
				//显示food组件
				this.$refs.food.toggleShow()
			}
		},
		computed:{
			...mapState(['goods']),
			currentIndex(){
				let {scrollY,tops} = this
				const index = tops.findIndex((top,index)=>{
					// scrollY>=当前的top && scrollY<下一个top
					 return scrollY>=top && scrollY<tops[index+1]
				})
				return index
			}
		},
		components:{
			carControl,
			food,
			shopCar
		}
	}
</script>

<style lang="stylus" scoped>
	.goods
		position absolute
		width 100%
		bottom 46px
		display flex
		background-color #fff
		overflow hidden
		top 195px
		.menu-wrapper
			width 80px
			flex 0 0 80px
			background-color #f3f5f7
			.menu-item
				display table
				height 54px
				width 56px
				line-height 14px
				padding 0 12px
				.text
					display table-cell
					width 56px
					vertical-align middle
					position relative
					border 0
					font-size 12px
					.icon
						display inline-block
						width 12px
						height 12px
						vertical-align top
						margin-right 5px
						background-size 12px 12px
						background-repeat no-repeat
					&::after
						content ""
						position absolute
						bottom 0
						left 0
						width 100%
						height 1px
						background-color rgba(7,17,27,0.1)
						transform scaleY(0.5)
				&.current
					background-color #fff
					color #02a774
					font-weight 700
					margin-top 0px
					position relative
					z-index 10
		.foods-wrapper
			flex 1
			-webkit-box-flex 1
			.title
				height 26px
				line-height 26px
				padding-left 14px
				font-size 12px
				border-left 2px solid #d9dde1
				color #93999f
				background 	#f3f5f7
			.food-item
				display flex
				margin 18px
				padding-bottom 18px
				position relative
				border none
				.carcontrol-wrapper
					position absolute
					right 0
					bottom 12px
				.icon
					flex 0 0 57px
					margin-right 10px
				.content
					flex 1
					.name
						height 14px
						margin 2px 0 8px 0
						line-height 14px
						color #07111b
						font-size 14px
					.desc
						line-height 12px
						margin-bottom 8px
						font-size 10px
						color #93999f
					.extra
						line-height 10px
						font-size 10px
						color #93999f
					.price
						line-height 24px
						font-weight 700
						.now
							font-size 14px
							margin-right 8px
							color #f01414
						.old
							font-size 14px
							margin-right 8px
							color #ccc
				&::after
					content ""
					position absolute
					bottom 0
					left 0
					height 1px
					width 100%
					background-color rgba(7,17,27,0.1)
					transform scaleY(0.5)
</style>
