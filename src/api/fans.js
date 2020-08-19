import request from '../utils/request'
export const getFans = function (params) {
  return request({
    url: '/mp/v1_0/followers',
    method: 'GET',
    params
  })
}
export const getFansStatistics = function () {
  return request({
    url: '/mp/v1_0/statistics/followers',
    method: 'GET'
  })
}
