<template>
	<div class="profileContainer">
		<HeaderTop title="我的"></HeaderTop>
			<!-- S登录注册 -->
			<div class="profile_number">
				<router-link  class="profile_link" :to="userInfo._id?'/UserInfo':'/Login'">
					<div class="profile_image">
						<i class="iconfont icon-geren"></i>
					</div>
					<div class="user-info">
						<p class="user-info-top" v-if="!userInfo.phone">{{userInfo.name || '登录注册'}}</p>
						<p>
							<span class="user-icon">
								<i class="iconfont icon-shouji"></i>
							</span>
							<span class="icon-mobile-number">{{userInfo.phone || '暂无手机号登录'}}</span>
						</p>
					</div>
					<div class="arrow">
						<i class="iconfont icon-jiantou"></i>
					</div>
				</router-link>
			</div>
			<!-- E登录注册 -->
			
			<!-- S用户数据列表 -->
			<div class="profile_info_data">
				<div class="info-item">
					<span class="info-data-top">
						<span style="color: #f90;">0.00</span>元
					</span>
					<span class="info-data-bottom">
						我的余额
					</span>
				</div>
				<div class="info-item">
					<span class="info-data-top">
						<span style="color: #ff5f31;">0.00</span>个
					</span>
					<span class="info-data-bottom">
						我的优惠
					</span>
				</div>
				<div class="info-item">
					<span class="info-data-top">
						<span style="color: #6ac20b;">0</span>分
					</span>
					<span class="info-data-bottom">
						我的积分
					</span>
				</div>
			</div>
			<!-- E用户数据列表 -->
			
			<!-- S用户订单 -->
			<div class="profile_my_order">
				<a href="#" class="my_order">
					<span>
						<i class="iconfont icon-dingdan1" style="color: #02a774;"></i>
					</span>
					<div class="my_order_div">
						<span>我的订单</span>
						<span class="my_order_icon">
							<i class="iconfont icon-jiantou"></i>
						</span>
					</div>
				</a>
				<a href="#" class="my_order">
					<span>
						<i class="iconfont icon-fuwu" style="color: #ff5f3e;"></i>
					</span>
					<div class="my_order_div">
						<span>积分商城</span>
						<span class="my_order_icon">
							<i class="iconfont icon-jiantou"></i>
						</span>
					</div>
				</a>
				<a href="#" class="my_order">
					<span>
						<i class="iconfont icon-huiyuan" style="color: #f90;"></i>
					</span>
					<div class="my_order_div">
						<span>会员卡</span>
						<span class="my_order_icon">
							<i class="iconfont icon-jiantou"></i>
						</span>
					</div>
				</a>
			</div>
			<!-- E用户订单 -->
			
			<!-- S服务商城 -->
			<div class="profile_my_order">
				<a href="#" class="my_order">
					<span>
						<i class="iconfont icon-82" style="color: #02a774;"></i>
					</span>
					<div class="my_order_div">
						<span>服务商城</span>
						<span class="my_order_icon">
							<i class="iconfont icon-jiantou"></i>
						</span>
					</div>
				</a>
			</div>
			<!-- E服务商城 -->
			<mt-button @click="logout" type="danger" class="logout" v-if="userInfo._id">退出登录</mt-button>
	</div>
</template>

<script>
	//接受来自vuex中state的数据
	import {mapState} from 'vuex'
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import { MessageBox,Toast } from 'mint-ui';
	
	export default{
		methods:{
			logout(){
				MessageBox.confirm('确定退出?').then(
				action => {
				  this.$store.dispatch('logout')
				  Toast('登出成功')
				},
				action => {
				  console.log("取消")
				}
				);
			}
		},
		computed:{
			//抽取出来用
			...mapState(['userInfo'])
		},
		components:{
			HeaderTop,
		}
	}
</script>

<style scoped lang="stylus">
	@import "../../../public/stylus/mixins.styl"
.profileContainer
	width 100%
	overflow hidden
	.logout
		position  absolute
		left 50%
		margin-left -170px
		margin-top 20px
		width 340px
		height 40px
		text-align center
		line-height 40px
		color #fff
		font-size 18px
	.profile_number
		margin-top 45.5px
		.profile_link
			clearFix()
			position relative
			display block
			background-color #02A774
			padding 20px 10px
			.profile_image
				float left
				width 60px
				height 60px
				border-radius 50%
				overflow hidden
				vertical-align top
				.icon-geren
					font-size 62px
					background-color #e4e4e4
			.user-info
				float left
				margin-top 8px
				margin-left 15px
				p
					font-weight 400
					color #FFFFFF
					font-size 18px
				.user-info-top
					padding-bottom 8px
				.user-icon
					display inline-block
					width 20px
					height 20px
					margin-left -3px
					.icon-shouji
						font-size 18px
				.icon-mobile-number
					font-size 14px
					color #FFFFFF
			.arrow
				position absolute
				right 15px
				top 40%
				width 12px
				height 12px
				color #FFFFFF
	.profile_info_data
		position relative
		display flex
		background-color #FFFFFF
		overflow hidden
		width 100%
		.info-item
			display flex
			width 33.33%
			flex-direction column
			justify-content center
			align-items center
			border-right 1px solid #f1f1f1
			height 80px
			.info-data-top
				margin-bottom 10px
				span
					font-size 30px
					font-weight 700
			.info-data-bottom
				font-size 14px
		.info-item:last-child
			border none
	.profile_my_order
		position relative
		margin-top 10px
		background-color #FFFFFF
		.my_order
			display flex
			padding-left 15px
			align-items center
			>span
				display flex
				align-items center
				width 20px
				height 20px
				>.iconfont
					margin-left -10px
					font-size 20px
			.my_order_div
				width 100%
				border-bottom 1px solid #f1f1f1
				padding 18px 10px 18px 0
				font-size 16px
				display flex
				justify-content space-between
			
				
</style>
