// 封装用户所使用的接口
// 引入请求库
import request from '../utils/request'
// 获取评论接口
export const getComments = (params) => {
  // 返回一个promise对象
  return request({
    url: '/mp/v1_0/articles',
    method: 'GET',
    params
  })
}

export const offComments = (id, allow_comment) => {
  return request({
    url: '/mp/v1_0/comments/status',
    method: 'PUT',
    params: {
      article_id: id
    },
    data: {
      allow_comment
    }
  })
}
