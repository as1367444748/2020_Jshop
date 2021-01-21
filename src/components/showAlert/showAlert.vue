<template>
	<div class="alert_Container">
		<div class="tip_text_container">
			<span class="iconfont icon-gantanhao"></span>
			<p class="tip_text">{{alertText}}</p>
			<div class="confirm" @click="confirm">确认</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			alertText:String
		},
		methods:{
			confirm(){
				this.$emit('closeTip')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@keyframes tipMouve
		0% 
			transform scale(1)
		35%
			transform scale(.8)
		70%
			transform scale(1.1)
		100%
			transform scale(1)
	
	.alert_Container
		position fixed
		top 0
		bottom 0
		left 0
		right 0
		background rgba(0,0,0,.5)
		z-index 200
		.tip_text_container
			position absolute
			width 60%
			left 50%
			top 50%
			animation tipMouve .4s
			background-color rgba(255,255,255,1)
			margin-top -90px
			margin-left -110px
			border 1px
			padding-top 20px
			display flex
			flex-direction column
			justify-content center
			align-items center
			border-radius 5px
			.icon-gantanhao
				font-size 60px
				color #F5A100
			.tip_text
				font-size 14px
				color #333
				line-height 20px
				text-align center
				margin-top 10px
				padidng 0 5px
			.confirm
				font-size 18px
				font-weight bold
				margin-top 10px
				background-color #4cd964
				text-align center
				width 100%
				line-height 35px
				border 1px 
				border-bottom-right-radius 5px
				border-bottom-left-radius 5px
				color #fff
	
</style>
