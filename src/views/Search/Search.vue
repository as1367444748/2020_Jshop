<template>
	<div class="searchContainer">
		<HeaderTop title="搜索"></HeaderTop>
		<form class="search_form" @submit.prevent="getShops">
			<input type="search" class="search_input" placeholder="请输入商家名称" v-model="keywords">
			<input type="submit" class="search_submit">
		</form>
		
		<section class="list" v-if="!nosearchShops">
			<div class="list-container">
				<router-link :to="{path:'/shop'}" class="list_li" tag="li" v-for="item in searchShopsList" :key="item.id">
					<section class="item_left">
						<img :src="ImgbaseURL+item.image_path" alt="">
					</section>
					<section class="item_right">
						<div class="item_right_text">
							<p>
								<span>{{item.description}}</span>
							</p>
							<p>月售 {{item.float_minimum_order_amount}} 单</p>
							<p>{{item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
						</div>
					</section>
				</router-link>
			</div>
		</section>
		<div class="search_none" v-else>很抱歉！无搜索结果</div>
	</div>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				keywords:"",
				ImgbaseURL:"http://cangdu.org:8001/img/",
				nosearchShops:false
			}
		},
		computed:{
			//异步获取搜索的商家列表
			...mapState(['searchShopsList'])
		},
		methods:{
			getShops(){
				const keywords = this.keywords.trim();
				if(keywords){
					//点击的时候把这个变量改为false
					// this.nosearchShops = false
					this.$store.dispatch('getSearchShops',keywords)
				}
			}
		},
		watch:{
			searchShopsList(value){
				if(!value.length){//没有数据
					this.nosearchShops = true
				}else{//有数据
					this.nosearchShops = false
				}
			}
		},
		components:{
			HeaderTop
		}
	}
</script>

<style scoped lang="stylus">
	.searchContainer
		width 100%
		height 100%
		overflow hidden
		.search_none
			margin: 0 auto;
			color: #333;
			background-color: #fff;
			text-align: center;
			margin-top: 0.125rem;    
		.search_form
			margin-top 45px
			background-color #FFFFFF
			padding 12px 8px
			overflow hidden
			>input
				height 35px
				padding 0 4px
				border-radius 2px
				font-weight bold
				outline none
			.search_input
				width 79%
				float left
				border 4px solid #f2f2f2
				font-size 14px
				background-color #f2f2f2
				color #333
			.search_submit
				float right
				width 18%
				background-color #02a774
				border 4px solid #02a774
				color #fff
				font-size 16px
		.list-container
			background-color #FFFFFF
			.list_li
				display flex
				// justify-content center
				padding 10px
				border-bottom 1px solid #e4e4e4
				.item_left
					margin-right 10px
					>img
						width 50px
						height 50px
						display block
				.item_right 
					flex 1
					font-size 12px
					p
						line-height 12px
						margin-bottom 6px
					
						
			
</style>
