/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import base from './api/base'
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, code, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      break
    case 403:
      break
      // 404请求不存在
    case 404:
      break
    default:
      console.log('axios request error ,but default status ******' + status)
  }
}

/**
 * 请求成功，但服务器返回内部错误码
 * @param {Object} data 服务器返回的数据
 */
const serverErrorHandler = (data) => {
  switch (data.code) {
    case '10901008':
      break
    default:
      break
  }
}
// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 12
})

const special = ['/app/user/login', '/app/com/sms/send', '/app/com/verifycode/verify', '/app/user/register', '/app/user/pwd/reset']

// 是否需要检查sessionid
function nosession (url) {
  return special.includes(url)
}

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    if (config.url === '/app/device/onlinestate') {
      // 在线状态使用特殊域名
      config.baseURL = base.onlineBase1
    } else {
      config.baseURL = base.base1
    }
    if (nosession(config.url)) {
      return config
    }
    return config
  },
  error => Promise.reject(error))

// 响应拦截器
// 1.http错误在拦截器中处理
// 2.status===200 但特殊错误码也在拦截器中处理
// 3.其他普通错误码由调用方处理
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      if (res.data.code === '0') {
        return Promise.resolve(res.data)
      } else {
        serverErrorHandler(res.data)
        return Promise.reject(res.data)
      }
    }
  },
  // 请求失败
  error => {
    const {response} = error
    console.log(response)
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.code, response.data.msg)
      return Promise.reject(response)
    } else {
      console.log(response)
    }
  })

export default instance
