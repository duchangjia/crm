import axios from 'axios'
import qs from 'qs'
import {Message,Loading} from 'element-ui'
import router from '@/router';

//console.log(process.env.BASE_API)

const service = axios.create({
  //baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'//'application/json;charset=utf-8'
  }
})

let loadingRequestCount = 0,
  loading;

function showLoading() {
  if (loadingRequestCount === 0) {
    loading = Loading.service({
      lock: true,
      text: '加载中……'
    })
  }
  loadingRequestCount++
}

function hideLoading() {
  if (loadingRequestCount <= 0) return
  loadingRequestCount--
  if (loadingRequestCount === 0) {
    loading.close();
  }
}

//添加请求拦截器
service.interceptors.request.use(request => {
  // 若有做鉴权token，需要请求头自动加上token
  if (localStorage.getItem('token')) {
    request.headers.token = localStorage.getItem('token')
  }
  //显示loading
  if(!request.hideLoading){
    showLoading();
  }

  if (request.data && (request.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1)) {
    request.data = qs.stringify(request.data)
  }

  return request
}, error => {
  Message({
    showClose: true,
    message: error,
    type: 'error'
  })
  return Promise.reject(error)
})

//添加响应拦截器
service.interceptors.response.use(res => {
    //隐藏loading
    if(!res.config.hideLoading) {
      hideLoading();
    }
    const result = res.data
    const status = result.status
    if (result.status !== '0') {
      // 显示接口报错信息
      let msg = result.msg || '服务器出错了'
      Message({
        showClose: true,
        message: msg,
        type: 'error'
      });

      if (result.status === "2") {
        // token失效返回到登录页面中
        localStorage.removeItem('token');
        localStorage.removeItem('code');
        router.push({
          path: '/login'
        })
      }

      return Promise.reject(msg)
    }
    return result.data
  }, error => {
    hideLoading();
    // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
    if (error.response.status === "2") {
      // 重定向，登录超时，返回到登录页面中
      localStorage.removeItem('token');
      localStorage.removeItem('code');
      router.push({
        path: '/login'
      })
    }
    if (error.response.status === 404) {
      /*router.push({
        path: '/404'
      })*/
      Message({
        showClose: true,
        message: '请求接口不存在',
        type: 'error'
      })
    }
    if (error.response.status === 502) {
      /*router.push({
        path: '/404'
      })*/
      Message({
        showClose: true,
        message: '服务器出错了',
        type: 'error'
      })
    }
    // 返回 response 里的错误信息
    return Promise.reject(error)
  })

export default service
