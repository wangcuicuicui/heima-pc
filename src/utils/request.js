// 进行 axios 请求库的封装
import axios from 'axios'
import { getUserInfo } from '../store'
// 配置
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
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
