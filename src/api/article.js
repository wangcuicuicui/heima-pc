// 封装用户所使用的接口
// 引入请求库
import request from '../utils/request'
// 封装登录接口请求
export const getList = function (params) {
  // 返回一个promise对象
  return request({
    url: '/mp/v1_0/articles',
    method: 'GET',
    params
  })
}
