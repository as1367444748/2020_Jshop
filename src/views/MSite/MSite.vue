<template>
	<div class="MSiteContainer">
		<!-- S公共头部 -->
		<HeaderTop title="湖南长沙岳麓区">
			<a class="header_search" slot="left"><em class="iconfont icon-sousuo"></em></a>
			<a href="#" class="header_login" slot="right"><span class="header_login_text">登录|注册</span></a>
		</HeaderTop>
		<!-- E公共头部 -->
		
		<!-- S首页导航 -->
		<div class="miste-content-wrapper">
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide>1</swiper-slide>
				<swiper-slide>I'm Slide 2</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<!-- E首页导航 -->
	</div>
</template>

<script>
	//导入顶部组件
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	//按需导入swiper组件
	import {
		swiper,
		swiperSlide
	} from "vue-awesome-swiper";
	import "swiper/dist/css/swiper.css";
	export default {
		components: {
			HeaderTop,
			swiper,
			swiperSlide
		},
		data() {
			return {
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
				}
			};
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.MSiteContainer 
		width 100% 
		.miste-content-wrapper 
			position fixed 
			width 100% 
			top 45px 
			bottom 50px
</style>
