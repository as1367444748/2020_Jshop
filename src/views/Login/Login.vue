<template>
	<div class="LoginContainer">
		<div class="loginInner">
			<!-- 登录头部 -->
			<div class="login_header">
				<h2 class="login_logo">傻哥外卖</h2>
				<div class="login_header_title">
					<a href="javascript:;" :class="{on:loginWay}"  @click="loginWay=true">短信登录</a>
					<a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
				</div>
			</div>
			<!-- 登录主体 -->
			<div class="login_content">
				<form @submit.prevent="submit">
					<!-- 短信登录 -->
					<div :class="{on:loginWay}">
						<section class="login_message">
							<input type="tel" placeholder="手机号" maxlength="11" v-model="phone">
							<button 
							@click.prevent="getCode"
							:disabled="!rightPhone" 
							class="get_vertification" 
							:class="{right_phone:rightPhone}"
							>{{computeTime>0?`已发送${computeTime}`:'获取验证码'}}</button>
						</section>
						<section class="login_vertification">
							<input type="text" maxlength="8" placeholder="验证码" v-model="Phonecode">
						</section>
						<section class="login_hint">
							温馨提示：未注册傻哥外卖帐号的手机号，登录时将自动注册，且代表已同意
							<a href="javascript:;">《用户服务协议》</a>
						</section>
					</div>
					<!-- 密码登录 -->
					<div :class="{on:!loginWay}">
						<section>
							<section class="login_message">
								<input type="text" placeholder="手机/邮箱/有户名" maxlength="11" v-model="name">
							</section>
							<section class="login_vertification">
								<input type="text" maxlength="8" placeholder="密码" v-if="showPWD" v-model="pwd">
								<input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
								<div class="switch_button" @click="showPWD=!showPWD" :class="showPWD?'on':'off'">
									<div class="switch_circle" :class="{right:showPWD}"></div>
									<span class="switch_text">{{showPWD?'abc':'...'}}</span>
								</div>
							</section>
							<section class="login_message">
								<input type="text" placeholder="验证码" maxlength="11" v-model="captcha">
								<img @click="changeImg" 
								src="http://localhost:4000/captcha" ref="captcha" alt="captcha" class="get_vertification">
							</section>
						</section>
					</div>
					
					<!-- 登录	 -->
					<button class="login_submit">登录</button>
				</form>
				<a href="javascript:;" class="about_us">关于我们</a>
			</div>
			<!-- 返回到我的页 -->
			<a class="go_back" @click="$router.back()">
				<i class="iconfont icon-jiantouzuo"></i>
			</a>
		</div>
		<showAlert :alertText="alertText" v-show='alertShow' @closeTip="closeTips"/>
	</div>
</template>

<script>
	import showAlert from '../../components/showAlert/showAlert.vue';
	// reqSms短信登录
	//
	import {reqLogin,reqCode,reqSms} from '../../api'
	export default{
		data(){
			return {
				loginWay:true,//切换登录类型
				phone:"",//手机号
				computeTime:0,//倒计时时间
				showPWD:false,
				alertShow:false,
				alertText:"",//弹框内容
				name:"",//密码登录模块：用户名
				pwd:"",//密码登录模块：密码
				captcha:"",//密码登录的验证码
				Phonecode:""//短信登录验证码
			}
		},
		methods:{
			//切换验证码
			changeImg(){
				//跨域是ajax请求的问题 这里不存在跨域
				//每次指定的src值不一样
				// e.target.src='http://localhost:4000/captcha?time='+Date.now()
				this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
			},
			async getCode(){
				// 倒计时
				if(!this.computeTime){
					this.computeTime = 30;
					this.itervalId = setInterval(()=>{
						if(this.computeTime<=0){
							//停止定时器
							clearInterval(this.itervalId)
						};
						this.computeTime--
					},1000)
				}
				//获取验证码
				let result = await reqCode(this.phone)
				if(result.code===1){
					//显示提示
					this.showText(result.msg)
					//停止计时
					if(this.computeTime){
						this.computeTime = 0;
						clearInterval(this.itervalId)
					}
				}
				
			},
			//错误提示函数
			showText(text){
				this.alertShow = true;
				this.alertText=text;
				
			},
			//登录模块
			async submit(){
				//短信登录
				let reslut;
				let {rightPhone,phone,Phonecode} = this;
				//前台表单验证
				if(this.loginWay){
					if(!rightPhone){
						this.showText("手机号不正确");
						return 
					}else if(!/^\d{6}$/.test(Phonecode)){
						this.showText("验证码必须是6位数");
						return 
					}
					//发送Ajax请求 短信登录
					reslut = await reqSms(phone,Phonecode);
					
				}else{
					const {name,pwd,captcha} = this;
					// 密码登录
					if(!this.name){
						this.showText("用户名为空");
						return 
					}
					if(!this.pwd){
						this.showText("密码为空");
						return 
					}
					if(!this.captcha){
						this.showText("验证码必须指定");
						return 
					}
					// 发送Ajax请求密码登录
					reslut = await reqLogin({name,pwd,captcha})
					
				}
				//无论成功失败都要清理定时器
				if(this.computeTime){
					this.computeTime = 0;
					clearInterval(this.itervalId)
				}
				//根据结果数据处理 
				if(reslut.code===0){
					const user = reslut.data;
					this.$store.dispatch('recordUser',user)
					//将user 保存在vuex的state里面
					//去个人中心页面
					this.$router.replace('/Profile')
				}else{
					this.changeImg()
					const msg = reslut.msg;
					this.showText(msg);
					
				}
				
			},
			//close组件传过来的函数
			closeTips(value){
				this.alertShow=value
			}
		},
		computed:{
			rightPhone(){
				return /^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone)
			},
		},
		components:{
			//弹框组件
			showAlert
		}
	}
</script>

<style scoped lang="stylus">
.LoginContainer
	width 100%
	height 100%
	background-color #FFFFFF
	.loginInner
		width 80%
		margin 0 auto
		padding-top 60px
		.login_logo
			font-size 40px
			font-weight 700
			color #02a774
			text-align center
		.login_header_title
			padding-top 40px
			text-align center
			>a
				font-size 14px
				padding-bottom 4px
				color #333
				font-weight 700
				&:first-of-type
					margin-right 40px
				&.on
					color #02a774
					font-weight 700
					border-bottom 2px solid #02A774
		.login_content
			>form
				>div
					display none
					&.on
						display block
					input
						width 100%
						height 100%
						padding-left 10px
						box-sizing border-box
						border 1px solid #ddd
						border-radius 4px
						outline 0
						font 400 18px Arial
						&:focus
							outline 1px solid #02a774
							border-radius 4px
					.login_message
						position relative
						height 48px
						margin-top 16px
						background-color #fff
						font-size 14px
						.get_vertification
							position absolute
							top 50%
							transform translateY(-50%)
							right 10px
							color #ccc
							border 0
							font-size 14px
							background transparent
							&.right_phone
								color black
					.login_vertification
						position relative
						height 48px
						margin-top 16px
						background-color #fff
						font-size 14px
							input
								height 40px
								width 100%
								height 100%
								padding-left 10px
								box-sizing border-box
								border 1px solid #ddd
								border-radius 4px
								outline 0
								font 400 18px Arial
								&:focus
									outline 1px solid #02a774
									border-radius 4px
						.switch_button
							position absolute
							width 30px
							height 16px
							top 50%
							transform translateY(-50%)
							color #fff
							font-size 12px
							line-height 16px
							right 10px
							padding 0 6px
							border-radius 8px
							border 1px solid #ddd
							transition background-color 0.3s,border-color 0.3s
							&.off
								background-color #fff
								.switch_text
									float right
									color #ddd
							&.on
								background-color #02a774
							.switch_circle
								position absolute
								width 16px
								height 16px
								top -1px
								left -1px
								border-radius 50%
								background-color #fff
								border 1px solid #ddd
								transition transform 0.3s,-webkit-transform 0.3s
								box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
								&.right
									transform  translateX(30px)
							
					.login_hint
						margin-top 12px
						font-size 14px
						line-height 20px
						color #999
						>a
							color #02a774
				.login_submit
					display block
					width 100%
					height 42px
					margin-top 30px
					border-radius 4px
					background-color #4cd96f
					text-align center
					border 0
					line-height 42px
					font-size 16px
					color #fff
	
			.about_us
				display block
				font-size 12px
				margin-top 20px
				text-align center
				color #999
	
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
