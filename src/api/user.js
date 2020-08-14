// 封装用户所使用的接口
// 引入请求库
import request from '../utils/request'
// 封装登录接口请求
export const login = function (mobile, code) {
  // 返回一个promise对象
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

export const userGet = function () {
  // 返回一个promise对象
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'GET'
  })
}
