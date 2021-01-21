//会根据接口文档写接口请求
//解决ajax跨域 ：配置代理 浏览器提交的是当前前台应用的请求也就是请求：8080
 //前台应用运行在前台服务器上的 除了前台服务器 还运行一个代理程序 代理程序会拦截这个请求8080 转发4000请求 作用是帮我们拦截请求转发请求的
 //代理是什么么？是一个和后台交互
 //而后台应用是运行在后台服务器上的
//接口请求函数返回值是promise 
import ajax from './ajax'
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`/position/${geohash}`);

// 2、获取食品分类列表
export const reqfoodTypes = () => ajax('/index_category');

// 3、根据经纬度获取商铺列表
export const reqShops = (longitude,latitude) => ajax('/shops',{longitude,latitude});

// 4、根据经纬度和关键字搜索商铺列表
export const reqKeyShop = (geohash,keyword) => ajax('/search_shops',{geohash,keyword});

// 5、用户名密码登陆:三个参数的 用对象传入
export const reqLogin = ({name,pwd,captcha}) => ajax('/login_pwd',{name,pwd,captcha},'POST');

// 6、发送短信验证码
export const reqCode = (phone) => ajax('/sendcode',{phone});

// 7、短信登陆
export const reqSms = (phone,code) => ajax('/login_sms',{phone,code},'POST');

// 8、根据会话获取用户信息
export const reqUserInfo = () => ajax('/userinfo');

// 9、用户登出
export const reqLogout = () => ajax('/logout');


//10、获取食品列表数据
export const reqFoods = () => ajax('/goods');
//11、获取评论数据
export const reqRatings = () => ajax('/ratings');
//12、获取商店信息数据
export const reqSeller = () => ajax('/info');
