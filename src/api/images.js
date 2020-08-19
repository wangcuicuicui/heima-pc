// 封装用户所使用的接口
// 引入请求库
import request from '../utils/request'
// 获取图片接口
export const getImages = (params) => {
  // 返回一个promise对象
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
// 收藏取消收藏
export const favorites = (id, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${id}`,
    data: {
      collect
    }
  })
}

// 删除
export const delImages = (id) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${id}`
  })
}
