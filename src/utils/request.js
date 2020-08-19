// 进行 axios 请求库的封装
import axios from 'axios'
import JSONbig from 'json-bigint'
import { getUserInfo } from '../store'
// 配置
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [(data) => {
    // 当前接口获取的原声JSON格式的数据data

    // 使用JSONbig.parse替代默认方法JSON.parse处理数据
    // try catch  容错机制
    try {
      const hadTransData = JSONbig.parse(data)
      return hadTransData
    } catch (e) {
      console.log('数据转换错误' + e)
      return data
    }
  }]
})
instance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // config是个对象，代表当前的请求头对象 header
  const userInfo = getUserInfo()
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default instance
