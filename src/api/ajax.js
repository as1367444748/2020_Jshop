import axios 'axios'
//ajax请求函数模块
//返回值：Promise对象（异步返回的数据是：res.data）
export default function ajax (url,data={},methods='GET'){
	return new Promise(function(resolve,reject){
		let promise;
		if(methods==='GET'){
			 // 准备url query参数数据
			let dataStr='';//数据拼接字符串
			Object.keys(data).forEach(key=>{
				dataStr+=key+'='data[key]+'&'
			})
			if(dataStr!==''){
				dataStr=dataStr.substring(0,dataStr.lastIndexOf('&'))
				url = url + '?'+dataStr
			}
			 // 发送get请求
			promise=axios.get(url);
		}else{
			// 发送post请求
			promise = axios.post(url, data)
		}
		Promise.then(function(res){
			// 成功了调用resolve()
			resolve(res.data)
		}).catch(function(error){
			//失败了调用reject()
			reject(error)
		})
	})