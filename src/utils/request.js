// 进行 axios 请求库的封装
import axios from 'axios'
// 配置
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})
export default instance
