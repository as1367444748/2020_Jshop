import Vue from 'vue'
// var moment = require('moment');
import { compareAsc, format } from 'date-fns'//时间格式化库

//自定义过滤器
Vue.filter('data-format',function(value,formatStr=`yyyy-mm-dd HH:mm:ss`){
	// return moment(value).format(formatStr)
	return format(value,formatStr)
})