// 封装用户所使用的接口
// 引入请求库
import request from '../utils/request'
// 封装登录接口请求
export const getList = (params) => {
  // 返回一个promise对象
  return request({
    url: '/mp/v1_0/articles',
    method: 'GET',
    params
  })
}
// 获取频道数据接口
export const getChannels = () => {
  return request({
    url: '/mp/v1_0/channels',
    method: 'GET'
  })
}
// 删除文章接口
export const delArticle = (ArticleId) => {
  return request({
    url: `/mp/v1_0/articles/${ArticleId}`,
    method: 'DELETE'
  })
}
// 添加文章
export const addArtice = (draft,data) =>{
  return request({
    url: '/mp/v1_0/articles',
    method: 'POST',
    params:{
      draft
    },
    data
  })
}
// 获取编辑文章
export const editArtice = (id) =>{
  return request({
    url: `/mp/v1_0/articles/${id}`,
    method: 'GET',
  })
}
// 编辑文章

export const aeditArtice = (draft,id,data) =>{
  return request({
    url: `/mp/v1_0/articles/${id}`,
    method: 'PUT',
    params:{
      draft
    },
    data
  })
}
