<template>
	<div class="LoginContainer">
		<a class="go_back" @click="$router.back()">
			<i class="iconfont icon-jiantouzuo"></i>
		</a>
	</div>
</template>

<script>
</script>

<style scoped lang="stylus">
.LoginContainer
	width 100%
	height 100%
	background-color #FFFFFF
	.go_back
		position absolute
		top 5px
		left 5px
		width 30px
		height 30px
		.icon-jiantouzuo
			font-size 22px
			color #999999
</style>
