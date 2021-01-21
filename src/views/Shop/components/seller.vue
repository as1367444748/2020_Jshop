<template>
	<div class="shopInfo">
		<div class="info-content">
			<section class="section">
				<h3 class="section-title">配送信息</h3>
				<div class="delivery">
					<div>
						<span class="delivery-icon">骑士专送</span>
						<span>由商家配送提供配送，约{{seller.deliveryTime}}分钟送达，距离{{seller.distance}}</span>
					</div>
					<div class="delivery-money">配送费￥{{seller.deliveryPrice}}</div>
				</div>
			</section>
			<div class="split"></div>
			<section class="section">
				<h3 class="section-title">活动与服务</h3>
				<div class="activity">
					<div v-for="(support,index) in seller.supports" class="activity-item" :class="activeClass[support.type]" :key="index">
						<span class="content-tag ">
							<span class="mini-tag">{{support.name}}</span>
						</span>
						<div class="activity-content">{{support.content}}</div>
					</div>
				</div>
			</section>
			<div class="split"></div>
			<section class="section">
				<div class="section-title">商家实景</div>
				<div class="pic-wrapper">
					<ul ref="picsUl">
						<li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
							<img width="120px" height="90px" :src="pic" alt="">
						</li>
					</ul>
				</div>
			</section>
			<section class="section">
				<h3 class="section-title">商家信息</h3>
				<ul class="detail">
					<li class="bottom-border-1px">
						<span class="blod">品类</span>
						<span>{{seller.category}}</span>
					</li>
					<li class="bottom-border-1px">
						<span class="blod">商家电话</span>
						<span>{{seller.phone}}</span>
					</li>
					<li class="bottom-border-1px">
						<span class="blod">地址</span>
						<span>{{seller.address}}</span>
					</li>
					<li class="bottom-border-1px">
						<span class="blod">营业时间</span>
						<span>09:35-24:00</span>
					</li>
				</ul>
			</section>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import BetterScroll from 'better-scroll'
	export default{
		data(){
			return{
				activeClass:['activity-green','activity-red','activity-orange']
			}
		},
		computed:{
			...mapState(['seller'])
		},
		methods:{
			_sellerScroll(){
				//商家列表的滑动
				new BetterScroll('.shopInfo')
				const ul = this.$refs.picsUl
				const liWidth = 120
				const space = 6
				const count = this.seller.pics.length
				ul.style.width =( liWidth+space) * count - space + 'px'
				//图片滑动
				new BetterScroll('.pic-wrapper',{
					scrollX:true//水平滑动
				})
			}
		},
		mounted() {
			//判断this.seller.pics是否有数据
			if(!this.seller.pics){
				return
			}
			this._sellerScroll();
		},
		watch:{
			seller(){
				//因为这个seller是异步获取的
				this.$nextTick(()=>{//异步创建
					this._sellerScroll();
				})
			}
		}
	}
</script>

<style scoped lang="stylus">
	.shopInfo
		position absolute
		top 195px
		bottom 0
		left 0
		width 100%
		background-color #FFFFFF
		overflow hidden
		.split
			width: 100%;
			height: 16px;
			border-top: 1px solid rgba(7,17,27,0.1);
			border-bottom: 1px solid rgba(7,17,27,0.1);
			background: #f3f5f7;    
		.section
			padding 16px 14px 14px
			font-size 16px
			background-color #FFFFFF
			color #666666
			position relative
			border-bottom 1px solid #eee
			.detail
				margin-bottom -16px
				>li
					display flex
					justify-content space-between
					align-items center
					margin-right -10px
					padding 16px 12px 16px 0
					position relative
					font-size 0.8125rem
					border none
					.blod
						font-weight 700
						color #333333
			.pic-wrapper
				width 100%
				overflow hidden
				margin-top 16px
				white-space nowrap
				.pic-item
					display inline-block
					margin-right 6px
					width 120px
					height 90px
			.section-title
				color #000000
				font-weight 700
				line-height 16px
			.delivery
				margin-top 16px
				font-size 13px
				line-height 18px
				.delivery-icon
					display inline-block
					width 55px
					height 17px
					padding 1px 0
					margin-right 10px
					font-size 11px 
					text-align center
					border-radius 4px
					background-color #0097ff
					color #FFFFFF
			.delivery-money
				margin-top 5px	
			.activity
				margin-top 16px
				.activity-item
					display flex
					font-size 0.8125rem
					margin-bottom 12px
					align-items center
					&.activity-green
						.content-tag
							background-color #02A774
					&.activity-red
						.content-tag
							background-color #ccc
					&.activity-orange
						.content-tag
							background-color #f60
					.content-tag
						display: inline-block
						border-radius: 2px
						width: 36px
						height: 18px
						margin-right: 10px
						color: #fff
						font-style: normal
						position: relative
						.mini-tag
							position: absolute
							left: 0
							top: 0
							right: -100%
							bottom: -100%
							font-size: 24px
							-webkit-transform: scale(0.5)
							transform: scale(0.5)
							-webkit-transform-origin: 0 0
							transform-origin: 0 0
							display: -webkit-box
							display: -ms-flexbox
							display: flex
							-webkit-box-align: center
							-ms-flex-align: center
							align-items: center
							-webkit-box-pack: center
							-ms-flex-pack: center
							justify-content: center   
						
</style>
