import Vue from 'vue'
import store from '@/store'
import router from "@/router";
import { USER_INFO } from '@/store/mutations'

// const whiteList = ['/login', '/404'] // 白名单页面，不需要经过登录也能进去

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    if (to.path === '/login') {
      next({path: '/'})//已经登录过，不需要重新登录
    } else {
      // 检查是否有访问权限
      let checkPerm = (to, next) => {
        let perm = store.state.user.perm
        //if (to.matched.some(item => item.meta.requirePerm)) {
        if (to.meta.requirePerm) {
          if (perm[to.meta.requirePerm]) {
            next()
          } else {
            next({ path: '/403' })
          }
        } else {
          next()
        }
      }

      if (!store.state.user.userInfo) { // 判断当前用户是否已拉取完用户信息
        store.dispatch(USER_INFO).then(res => { // 拉取用户信息
          Vue.prototype.perm = store.state.user.perm
          checkPerm(to, next)
          //next();
        }).catch(() => {
          //登出
          store.dispatch('USER_LOGOUT').then(() => {
            next({path: '/login'})
          })
        })
      } else {
        checkPerm(to, next)
        //next();
      }
    }
  } else {
    //if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    if (to.meta.requireLogin === false) {
      next()
    } else {
      next('/login') // 否则重定向到登录页
    }
  }

  document.title = to.meta.title ? to.meta.title + ' - CRM系统' : 'CRM系统'
})
