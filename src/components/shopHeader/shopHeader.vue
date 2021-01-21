<template>
	<div class="shopHeader">
		<!-- 店铺头部 -->
		<nav class="shop-nav" :style="{backgroundImage:`url(${seller.bgImg})`}">
			 <a class="back" href="javascript:;" @click="$router.back('/miste')">
				<em class="iconfont icon-jiantou2"></em>
			 </a>
		</nav>
		<!-- 店铺内容 -->
		<div class="shop-content" @click="toggleShopshow">
			<img class="content-img" :src="seller.avatar" alt="">
			<div class="header-content">
				<!-- 店铺名称标题 -->
				<h2 class="content-title">
					<span class="content-tag">
						<span class="mini-tag">品牌</span>
					</span>
					<span class="content-name">{{seller.name}}</span>
					<span class="iconfont icon-yousanjiao"></span>
				</h2>
				<!-- 店铺配送信息标题 -->
				<div class="shop-message">
					<span class="shop-message-detail">{{seller.score}}</span>
					<span class="shop-message-detail">月售{{seller.sellCount}}单</span>
					<span class="shop-message-detail">
						蓝骑士转送
						<span>约{{seller.deliveryTime}}分钟</span>
					</span>
					<span class="shop-message-detail">距离{{seller.distance}}</span>
				</div>
			</div>
			
		</div>
		<!-- 店铺优惠标题 -->
		<div class="shop-header-discounts" @click="toggleSupports" v-if="seller.supports">
			<div class="discounts-left">
				<div class="activity">
					<span class="content-tag" :class="supportsClasses[seller.supports[0].type]">
						<span class="mini-tag">{{seller.supports[0].name}}</span>
					</span>
					<span class="activity-content ellipsis">
						{{seller.supports[0].content}}
					</span>
				</div>
			</div>
			<div class="discounts-right">
				{{seller.supports.length}}个优惠
			</div>
		</div>
		
		
		<!-- 店铺基本信息 -->
		<transition name="fade">
			<div class="shop-brief-modal" v-show="shopShow">
				<div class="brief-modal-content">
					<h2 class="content-title">
						<div class="content-tag">
							<div class="mini-tag">品牌</div>
						</div>
						<div class="content-name">
							嘉禾一品（温都水城）
						</div>
					</h2>
					<ul class="brief-modal-msg">
						<li>
							<h3>{{seller.score}}</h3>
							<p>评分</p>
						</li>
						<li>
							<h3>{{seller.sellCount}}单</h3>
							<p>月售</p>
						</li>
						<li>
							<h3>骑士专送</h3>
							<p>约{{seller.deliveryTime}}分钟</p>
						</li>
						<li>
							<h3>{{seller.deliveryPrice}}元</h3>
							<p>配送费用</p>
						</li>
						<li>
							<h3>{{seller.distance}}</h3>
							<p>距离</p>
						</li>
					</ul>
					<h3 class="bried-modal-title">
						<span>公告</span>
					</h3>
					<div class="bried-modal-notice">
						{{seller.bulletin}}
					</div>
					<div class="mask-footer" @click="shopShow=!shopShow">
						<span class="iconfont icon-guanbicopy"></span>
					</div>
				</div>
				<div class="brief-modal-cover"></div>
			</div>
		</transition>
		<!-- 优惠活动栏 底部显示 -->
		<transition name="slide">
			<div class="activity-sheet" v-show="supportsShow">
					<div class="activity-sheet-content">
						<h2 class="activity-sheet-title">优惠活动</h2>
						<!-- 优惠列表 -->
						<ul class="list">
							<li v-for="(item,index) in seller.supports" :key="index" class="activity-item" :class="supportsClasses[item.type]">
								<span class="content-tag">
									<span class="mini-tag">
										{{item.name}}
									</span>
								</span>
								<span>{{item.content}}</span>
							</li>
						</ul>
						<div class="activity-sheet-close" @click="supportsShow=!supportsShow">
							<span class="iconfont icon-guanbi"></span>
						</div>
					</div>
				<!-- 遮罩层 -->
				<div class="activity-sheet-cover"></div>
			</div>
		</transition>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				supportsClasses:['activity-green','activity-blue','activity-red'],//优惠活动样式
				shopShow:false,//展示店铺信息
				supportsShow:false,//展示活动栏
			}
		},
		methods:{
			toggleShopshow(){
				this.shopShow = !this.shopShow
			},
			toggleSupports(){
				this.supportsShow = !this.supportsShow
			}
		},
		computed:{
			...mapState(['seller'])
		}
	}
</script>

<style scoped lang="stylus">
	.shopHeader
		position relative
		width 100%
		height 100%
		background-color #FFFFFF
		color #FFFFFF
		overflow hidden
		.shop-nav
			position relative
			background-size cover
			background-repeat no-repeat
			height 40px
			padding 5px 10px
			.back
				position absolute
				top 10px
				left 0
				.icon-jiantou2
					display block
					font-size 20px
					padding 5px
					color #fff
		.shop-content
			position relative
			display flex
			text-align center
			background-color #fff
			padding 30px 20px 5px 20px
			.content-img
				position absolute
				width 66px
				height 66px
				top 0
				left 50%
				margin-left -33px
				margin-top -40px
				border-radius 2px
			.header-content
				-webkit-box-flex 1
				flex 1
				width 80%
				.content-title
					font-size 20px
					line-height 24px
					white-space nowrap
					position relative
					display flex
					align-items center
					justify-content center
					color #333
					font-weight 700
					.content-tag
						width 36px
						height 18px
						background-image linear-gradient(90deg ,#fff100, #ffe339)
						border-radius 2px
						margin-right 10px
						color #6a3709
						font-weight 700
						position relative
						font-style normal
						.mini-tag
							position absolute
							left 0
							top 0
							right -100%
							bottom -100%
							font-size 24px
							font-weight 600
							transform scale(0.5)
							transform-origin 0 0
							display flex
							align-items center
							justify-content center
					.content-name
						font-weight 700
						text-align left
						overflow hidden
						text-overflow ellipsis
					.icon-yousanjiao
						width 20px
						position relative
						height 16px
						line-height 16px
				.shop-message
					white-space nowrap
					height 12px
					margin-top 8px
					color #333
					font-size 11px
					.shop-message-detail
						&:not(:last-child)::after
							content " \B7"
							opacity 0.2
							margin 0 2px
		.shop-header-discounts
			display flex
			background-color #FFFFFF
			border-radius 1px
			border 1px solid #eee
			padding 5px 7px
			font-size 11px
			color #666
			margin 0 30px
			align-items center
			.discounts-left
				flex 1
				overflow hidden
				.activity
					display flex
					align-items center
					.content-tag
						border-radius 1px
						background-color #70bc46
						width 25px
						height 13px
						margin-right 5px
						color #FFF
						position relative
						font-size 700
						font-style normal
						.mini-tag
							position absolute
							left 0
							top 0
							right -100%
							bottom -100%
							font-size 18px
							font-weight 600
							transform scale(0.5)
							transform-origin 0 0
							display flex
							align-items center
							justify-content center
			.discounts-right
				width 50px
				flex-shrink 0
				position relative
				padding-right 10px
				text-align right
				&::after
					content ""
					position absolute
					top 50%
					right 0
					transform translateY(-50%)
					display block
					border-style solid
					border-width 4px 4px 0 
					width 0
					border-color rgba(0,0,0,.5) transparent transparent 
		.activity-sheet
			position fixed
			top 0
			left 0
			width 100%
			height 100%
			z-index 99
			&.slide-enter-active,&.slide-leave-active
				transition opacity 0.3s
			&.slide-enter,&.slide-leave-to
				opacity 0
			.list
				font-size 16px
				height 160px
				overflow-y auto
				.activity-item
					display flex
					font-size 13px
					margin-bottom 12px
					align-items center
					&.activity-green
						>.content-tag
							background-color #70bc46
					&.activity-red
						>.content-tag
							background-color #007AFF
					&.activity-blue
						>.content-tag
							background-color #FF6000
					.content-tag
						position: relative
						display: inline-block
						border-radius: 2px
						width: 36px
						height: 18px
						margin-right: 10px
						color: #fff
						font-style: normal
						.mini-tag
							position: absolute;
							left: 0;
							top: 0;
							right: -100%;
							bottom: -100%;
							font-size: 24px;
							-webkit-transform: scale(0.5);
							transform: scale(0.5);
							transform-origin: 0 0;
							display: flex;
							align-items: center;
							justify-content: center;   
			.activity-sheet-content
				position absolute
				background-color #f5f5f5
				box-shadow 0 -1px 5px 0 rgba(0,0,0,0.4)
				padding 20px 30px
				bottom 0
				left 0
				right 0
				z-index 100
				box-sizing border-box
				transform transform 0.2s
				will-change transform
				color #333
				
				.activity-sheet-title
					font-size 20px
					margin-bottom 20px
					font-weight 600
					text-align center
				.activity-sheet-close
					position absolute
					right 10px
					top 10px
					.icon-guanbi
						font-size 26px
						font-weight 700
			.activity-sheet-cover
				width 100%
				height 100%
				left 0
				top 0
				background-color rgba(0,0,0,0.5)
		.shop-brief-modal
			position fixed
			top 0
			bottom 0
			right 0
			left 0
			color #333
			display flex
			flex-direction column
			justify-content center
			align-items center
			z-index 52
			&.fade-enter-active,&.fade-leave-active
				transition opacity 0.3s
			&.fade-enter,&.fade-leave-to
				opacity 0
			.brief-modal-content
				position relative
				width 80%
				padding 25px 20px
				border-radius 5px
				background-color #fff
				z-index 99
				display flex
				flex-direction column
				.content-title
					font-size 20px
					line-height 24px
					font-weight 700
					white-space nowrap
					position relative
					display flex
					align-items center
					justify-content center
					.content-tag
						border-radius: 2px;
						background-image: -webkit-gradient(linear, left top, right top, from(#fff100), to(#ffe339));
						background-image: linear-gradient(90deg, #fff100, #ffe339);
						width: 36px;
						height: 18px;
						margin-right: 10px;
						color: #6a3709;
						font-style: normal;
						position: relative;
						.mini-tag
							position: absolute;
							left: 0;
							top: 0;
							right: -100%;
							bottom: -100%;
							font-size: 24px;
							-webkit-transform: scale(0.5);
							transform: scale(0.5);
							-webkit-transform-origin: 0 0;
							transform-origin: 0 0;
							display: -webkit-box;
							display: -ms-flexbox;
							display: flex;
							-webkit-box-align: center;
							-ms-flex-align: center;
							align-items: center;
							-webkit-box-pack: center;
							-ms-flex-pack: center;
							justify-content: center;
							
					.content-name
						font-weight 700
				.brief-modal-msg
					display flex
					margin 20px -10px 0
					>li
						flex 1
						text-align center
						>h3
							font-size 15px
							font-weight 600
							color #333333
							margin-bottom 8px
						>p
							font-size 12px
							color #999999
				.bried-modal-title
					position relative
					margin 15px auto 15px
					text-align center
					width 85px
					background-image linear-gradient(90deg ,#fff ,#333 50%,#fff)
					background-size 100% 1px
					background-position 50%
					background-repeat no-repeat
					>span
						padding 0 6px
						color #999999
						font-size 12px
						background-color #fff
				.bried-modal-notice
					font-size 13px
					color #333
					line-height 1.54
					overflow-y auto
				.mask-footer
					position absolute
					left 50%
					margin-left -14px
					bottom -60px
					.icon-guanbicopy
						font-size 28px
						color rgba(255,255,255,0.7)
			.brief-modal-cover
				position absolute
				width 100%
				height 100%
				z-index 1
				left 0
				top 0
				background-color rgba(0,0,0,.5)
				
</style>
