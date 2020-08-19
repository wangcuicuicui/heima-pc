import request from '../utils/request'
export const userPhoto = function (data) {
  return request({
    url:'/mp/v1_0/user/photo',
    method:'PATCH',
    data
  })
}
export const userProfile = function (name,intro,email) {
  return request({
    url:'/mp/v1_0/user/profile',
    method:'PATCH',
    data:{
      name,
      intro,
      email
    }
  })
}
