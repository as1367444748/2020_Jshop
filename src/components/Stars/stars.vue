<template>
	<div class="stars" :class="size">
		<span class="star-item" v-for="(item,index) in StarArr" :class="item" :key="index"></span>
	</div>
</template>

<script>
	const CLASS_ON = 'on';
	const CLASS_HALF = 'half';
	const CLASS_OFF = 'off';
	
	export default{
		props:{
			size:String,
			score:Number
		},
		data(){
			return {
				
			}
		},
		computed:{
			// 3.5 : 3 + 1 + 1
			// 3.2 : 3 + 0 + 1
			StarArr(){
				let {score} = this;
				let arr = [];
				//显示判断整星的个数
				let scoreInter = Math.floor(score);
				for(let i=0;i<scoreInter;i++){
					//把整星的添加进来
					arr.push(CLASS_ON);
				}
				//显示判断半星的 1/0
				if(score*10- scoreInter*10>=5){
					arr.push(CLASS_HALF);
				}
				while(arr.length<5){
					arr.push(CLASS_OFF);
				}
				
				return arr;
			}
		}
	}
</script>

<style lang="stylus" scoped >
	@import "../../../public/stylus/mixins.styl"
	.stars
		float left
		font-size 0
		.star-item
			display inline-block
			background-repeat no-repeat
		&.star-48
			.star-item
				width 20px
				height 20px
				margin-right 22px
				background-size 20px 20px
			&:last-child
				margin-right: 0
			&.on
				bg-image('./images/star48_on')
			&.half
				bg-image('./images/star48_half')
			&.off
				bg-image('./images/star48_off')
		&.star-36
			.star-item
				width 15px
				height 15px
				margin-right 6px
				background-size 15px 15px
		    &:last-child
				margin-right 0
		    &.on
				bg-image('./images/star36_on')
		    &.half
				bg-image('./images/star36_half')
		    &.off
				bg-image('./images/star36_off')
		&.star-24
			.star-item
				width 10px
				height 10px
				margin-right 3px
				background-size 10px 10px
		    &:last-child
				margin-right 0
		    &.on
				bg-image('./images/star24_on')
		    &.half
				bg-image('./images/star24_half')
		    &.off
				bg-image('./images/star24_off')
</style>
