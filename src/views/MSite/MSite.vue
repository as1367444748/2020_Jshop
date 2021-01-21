<template>
	<div class="MSiteContainer">
		<!-- S公共头部 -->
		<HeaderTop :title="address.name">
			<router-link to="/search" class="header_search" slot="left">
				<em style="font-size: 26px;font-weight: bold;" class="iconfont icon-sousuo"></em>
			</router-link>
			<router-link :to="userInfo._id?'/UserInfo':'/Login'" class="header_login" slot="right">
				<span style="color: #fff;" class="header_login_text" v-if="!userInfo._id">登录|注册</span>
				<span style="color: #fff;" class="header_login_text" v-else>
					<em class="iconfont icon-geren1" style="color: #007AFF;font-size: 22px;"></em>
				</span>
			</router-link>
		</HeaderTop>
		<!-- E公共头部 -->
		
		<!-- S中间区域 -->
		<div class="miste-content-wrapper">
			
			<!--  S首页导航 -->
			<nav class="mite_nav">
				<swiper class="swiper" :options="swiperOption" ref="mySwiper" v-if="reqfoodTypes.length">
					<swiper-slide class="swiper-slide" v-for="(foods,index) in foodTypesArr" :key="index">
						<a href="#" v-for="(item,index) in foods" :key="index">
							<div class="food-container"><img :src="baseURL+item.image_url" alt=""></div>
							<span>{{item.title}}</span>
						</a>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
				<img src="./images/nav/msite_back.svg" alt="" v-else>
			</nav>
			<!--  E首页导航  -->
			<div class="shop-list">
				<div class="nearshop-header">
					<em class="iconfont icon-option"></em>
					<span class="text">附近商家</span>
				</div>
				<Shoplist/>
			</div>
			
		</div>
		<!-- E中间区域 -->
	</div>
</template>

<script>
	//导入顶部组件
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	import Shoplist from '../../components/Shoplist/Shoplist.vue'
	import BetterScroll from 'better-scroll'
	//映射vuex中的state
	import {mapState} from 'vuex';
	//按需导入swiper组件
	import {
		swiper,
		swiperSlide
	} from "vue-awesome-swiper";
	//导入swiper样式
	import "swiper/dist/css/swiper.css";
	
	
	export default {
		components: {
			HeaderTop,
			Shoplist,
			swiper,
			swiperSlide,
		},
		mounted() {
			// 
			//获取数据
			this.$store.dispatch('getfoodTypes')
			this.$store.dispatch('getshops')
		},
		data() {
			return {
				baseURL:"https://fuss10.elemecdn.com/",
				swiperOption: {
					loop: true,
					slidesPerView: 1, //数量
					spaceBetween: 30, //间距
					slidesPerGroup: 1, //分几组
					direction: 'horizontal', //设置水平还是垂直vertical
					// 显示分页
					pagination: {
						el: ".swiper-pagination",
						clickable: true //允许分页点击跳转
					},
					// 设置点击箭头
				},
			};
		},
		watch:{
			//监听reqfoodTypes的数据变化 一旦改变就是用$nextTick更新swiper
			reqfoodTypes(value){//reqfoodTypes数组中有了数据，!在异步更新界面之前执行
				this.$nextTick(()=>{
					return this.$refs.mySwiper.swiper;
					new BetterScroll('.miste-content-wrapper')
				})
			}
		},
		computed: {
			//读取数据
			...mapState(['address','reqfoodTypes','userInfo']),
			foodTypesArr(){
				//这里面的this指向是？
				let {reqfoodTypes} = this;
				//准备一个二维数组
				let arr = [];
				let minArr = [];//最大长度为8
				//遍历
				reqfoodTypes.forEach(c=>{
					//如果当前数组已满创建一个新的
					if(minArr.length===8){
						minArr = [];
					}
					//如果MinArr为空 将小数组保存到大数组里面去
					if(minArr.length===0){
						arr.push(minArr)
					}
					minArr.push(c)
				})
				return arr;
			},
			// //全局映射
			
		}
	}
</script>

<style lang="stylus" scoped>
	.MSiteContainer 
		width 100% 
		.miste-content-wrapper 
			position relative 
			width 100% 
			top 45px 
			bottom 50px
			.mite_nav
				position relative
				margin-top 15px
				background-color #FFFFFF
				height 200px
				.swiper
					width 100%
					height 200px
					.swiper-slide
						display flex
						flex-wrap wrap
						height 100%
						justify-content center
						a
							width 25%
							.food-container
								display block
								width 100%
								text-align center
								padding-bottom 10px
								font-size 0
								img
									display inline-block
									width 50px
									height 50px
							span
								display block
								width 100%
								text-align center
								font-size 13px
								color #666
			.shop-list
				position relative
				border-top 1px solid #ddd
				.nearshop-header
					padding 10px 
					display flex
					align-items center
					.icon-option
						font-size 12px
					.text
						font-size 14px
						color #999999
						margin-left 10px
				
				
			
</style>
