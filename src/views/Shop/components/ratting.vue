<template>
	<div class="ratings" ref="rating">
		<div class="rating-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家99%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<div class="title">服务态度</div>
						<Star :score="seller.score" size="star-36"></Star>
						<div class="score">{{seller.serviceScore}}</div>
					</div>
					<div class="score-wrapper">
						<div class="title">商品评分</div>
						<Star :score="seller.score" size="star-36"></Star>
						<div class="score">{{seller.foodScore}}</div>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="split"></div>
			<!-- 评价筛选 -->
			<div class="ratingselect">
				<div class="rating-type border-1px" @click.stop="selectTypeHandle(2)">
					<span class="block positive " :class="{'active':selectType===2}">
						全部<span class="count">{{ratings.length}}</span>
					</span>
					<span class="block positive" :class="{'active':selectType===0}"  @click.stop="selectTypeHandle(0)">
						满意
						<span class="count">{{positiveRate}}</span>
					</span>
					<span class="block positive" :class="{'active':selectType===1}"  @click.stop="selectTypeHandle(1)">
						不满意<span class="count">{{ratings.length-positiveRate}}</span>
					</span>
				</div>
				<div class="switch " :class="{'on':onlyContent}" @click.stop="onlyContentHandle">
					<span class="iconfont icon-duigou"></span>
					<span class="text">只看有内容评价</span>
				</div>
			</div>
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="(rating,index) in ratingsFilter" :key="index">
						<div class="avatar">
							<img width="28px" height="28px" :src="rating.avatar" alt="">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<Star :score="rating.score" size="star-24"></Star>
								<span class="delivery">{{rating.deliveryTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommed" >
								<span class="iconfont" :class="rating.rateType===0?'icon-zan2':'icon-like'"></span>
								<span class="item" v-for="(item,index) in rating.recommend">{{item}}</span>
							</div>
							<!-- 自定义过滤器 -->
							<div class="time">{{rating.rateTime | data-format}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Star from '../../../components/Stars/stars.vue'
	import {mapState} from 'vuex'
	import {mapGetters} from 'vuex'
	import BetterScroll from 'better-scroll'
	export default{
		data(){
			return {
				onlyContent:true,
				selectType:2
			}
		},
		computed:{
			...mapState(['seller','ratings']),
			...mapGetters(['positiveRate']),
			ratingsFilter(){
				const {ratings,onlyContent,selectType} = this;
				return ratings.filter(rating=>{
					const {rateType,text} = rating;
					//条件一 
					/*	selecType ===2
						selecType 0/1
						rateType 0/1
					*/
					// selectType===2 || selectType === rateType
					//条件二
					//onlyContent:true/false
					//text:有值/没值
					//!onlyContent || text.length>0
					//交集
					return (selectType===2 || selectType === rateType) && (!onlyContent || text.length>0)
				})
			}
			
		},
		mounted() {
			this.$store.dispatch('getShopRatings').then(()=>{
				//这里注意要用到this.$nextTick()
				this.$nextTick(()=>{
					new BetterScroll(this.$refs.rating, {
					  click:true
					})
				})
			})
		},
		methods:{
			selectTypeHandle(rateType){
				console.log(rateType)
				this.selectType = rateType
			},
			onlyContentHandle(){
				this.onlyContent = !this.onlyContent
			}
		},
		components:{
			Star
		}
	}
</script>

<style scoped lang="stylus">
	.ratings
		position absolute
		top 195px
		bottom 0
		left 0
		width 100%
		overflow hidden
		background-color #FFFFFF
		.overview
			display flex
			padding 18px 0
			.overview-left
				flex  0  0 137px
				padding 6px 0
				width 137px
				border-right 1px solid rgba(7,17,27,0.1)
				text-align center
				.score
					margin-bottom 6px 
					line-height 28px
					font-size 24px
					color #f90
				.title
					margin-bottom 8px
					line-height 12px
					font-size 12px
					color #07111b
				.rank
					line-height 10px 
					font-size 10px
					color #93999f
			.overview-right
				flex 1
				padding 6px 0 6px 24px
				.score-wrapper
					margin-bottom 8px 
					font-size 0
					.title
						display inline-block
						line-height 18px
						vertical-align top
						font-size 12px
						color #07111b
					.score
						display inline-block
						color #f90
						font-size 12px
						vertical-align top
						line-height 18px
				.delivery-wrapper
					font-size 0
					.title
						font-size 12px
						color #07111b
						line-height 18px
					.delivery
						margin-left 12px
						font-size 12px
						color #93999f
		.split
			width 100%
			height 16px
			border-top 1px solid rgba(7,17,27,0.1)
			border-bottom 1px solid rgba(7,17,27,0.1)
			background #f3f5f7	
		.ratingselect
			.rating-type
				padding 18px 0
				margin 0 18px
				.block
					display inline-block
					padding 8px 12px 
					margin-right 8px 
					line-height 16px
					border-radius 1px
					font-size 12px
					color #4d555d
					background-color rgba(77,85,93,0.2)
					&.active
						background-color #02a774
						color #FFFFFF
			.switch
				padding 12px 18px 
				line-height 24px
				border-bottom 1px solid rgba(7,17,27,0.1)
				color #93999f
				font-size 0
				.icon-duigou
					display inline-block
					vertical-align top
					margin-right 4px 
					font-size 20px
				&.on
					color #02a774
				.text
					display inline-block
					vertical-align top
					font-size 12px
		.rating-wrapper
			padding 0 18px
			.rating-item
				display flex
				padding 18px 0
				position relative
				border none
				.avatar
					flex  0 0 28px
					width 28px
					margin-right 12px
					img
						border-radius 50%
				.content
					position relative
					flex 1
					.name
						margin-bottom 4px 
						font-size 10px
						line-height 12px
						color #07111b
					.star-wrapper
						margin-bottom 6px
						font-size 0
						.delivery
							display inline-block
							vertical-align top
							line-height 12px
							font-size 10px
							color #93999f
					.text
						margin-bottom 8px
						line-height 18px
						color #07111b
						font-size 12px
					.recommed
						line-height 16px
						font-size 0
						.icon-zan2
							color #f5a100
						.icon-like
							color #ccc
						.item
							display inline-block
							margin 0 8px 4px 0
							font-size 9px
							padding 0 6px
							border 1px solid rgba(7,17,27,0.1)
							border-radius 1px
							color #93999f
							background-color #FFFFFF
					.time
						position absolute
						top 0
						right 0
						line-height 12px
						font-size 10px
						color #93999f
</style>
