<template>
	<div class="carcontrol">
		<transition name="move">
			<div class="iconfont icon-jianshao" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
		</transition>
		<div class="car-count" v-if="food.count">{{food.count}}</div>
		<div class="iconfont icon-tianjia" @click.stop="updateFoodCount(true)"></div>
	</div>
</template>

<script>
	export default{
		props:{
			food:Object
		},
		methods:{
			updateFoodCount(isAdd){
				//派发一个事件给到vue的actions
				this.$store.dispatch('updateFoodCount',{isAdd,food:this.food})
			}
		}
	}
</script>

<style scoped lang="stylus">
	.carcontrol
		font-size 0
		.icon-jianshao
			display inline-block
			padding 6px
			left 24px
			font-size 24px
			color #007AFF
			&.move-enter-active,&.move-leave-active
				transition all .3s
			&.move-enter,&.move-leave-to
				opacity 0
				transform translateX(15px) rotate(180deg)
		.icon-tianjia
			display inline-block
			padding 6px
			left 24px
			font-size 24px
			color #007AFF
		.car-count
			display inline-block
			vertical-align top
			padding-top 6px
			line-height 24px
			text-align center
			font-size 10px
			color #93999f
</style>
