<template>
	<div class="header">
		<slot name="left"></slot>
		<span class="header_title">
			<span class="header_title_text ellipsis">{{title}}</span>
		</span>
		<slot name="right"></slot>
	</div>
</template>

<script>
	export default{
		props:{
			title:String
		}
	}
</script>

<style lang="stylus" scoped>
	.header
		position: fixed;
		width 100%
		height 45px
		background-color #02A774
		z-index 100
		left 0
		top 0
		.header_search
			position absolute
			left 15px
			// 垂直居中
			top 50%
			transform translateY(-50%)
			//比例
			width 10%
			height 50%
			color #FFFFFF
			.iconfont
				font-size 25px
				color #FFFFFF
				font-weight bolder
		.header_login
				position absolute
				right 15px
				font-size 14px
				top 50%
				transform translateY(-50%)
				.header_login_text
					color #FFFFFF
		.header_title
			position absolute
			left 50%
			top 50%
			transform translate(-50%,-50%)
			width 50%
			color #FFFFFF
			text-align center
			.header_title_text
				font-size 20px
				color #FFFFFF
				display block
</style>
