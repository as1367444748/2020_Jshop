// 引入mockjs
import Mock from 'mockjs'
import data from './data.json'
/*
 Mock.mock( rurl, template )
 记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。
 */

//商品列表接口
Mock.mock('/goods',{code:0,data:data.goods})

//商品评价接口
Mock.mock('/ratings',{code:0,data:data.ratings})

//店铺信息接口
Mock.mock('/info',{code:0,data:data.info})

//export default xxx ??? 这里不需要到处 比较特殊