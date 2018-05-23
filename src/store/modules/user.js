import Vue from 'vue'
import API from '@/common/api';
import md5 from 'js-md5';
import { USER_INFO, USER_TOKEN, USER_PERM, USER_LOGIN, USER_LOGOUT, USER_CLEAR, USER_CODE,DEPT_INFO} from '@/store/mutations'

let handlePerm = (list) => {
  let ret = {}
  list.forEach(item => {
    if (item.perms) {
      ret[item.perms] = 1
    }
  })
  return ret
}

const user = {
  state: {
    token: localStorage.getItem('token'),
    userInfo: '', // 用户信息
    perm: '',     // 权限信息
    code: '',     //外呼中心的code值，为0或12时才能拨打电话
    deptInfo: ''  //部门信息
  },

  mutations: {
    [USER_TOKEN]: (state, token) => {
      state.token = token
    },
    [USER_CODE]: (state, code) => {
      state.code = code
    },
    [USER_INFO]: (state, userInfo) => {
      state.userInfo = userInfo
    },
    [DEPT_INFO]: (state, deptInfo) => {
      state.deptInfo = deptInfo
    },
    [USER_PERM]: (state, perm) => {
      state.perm = perm
    },
  },

  actions: {
    // 登录
    [USER_LOGIN] ({commit}, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
          let res={token:"123456y123344",code:6}
          localStorage.setItem('token',"123456y123344");
          localStorage.setItem('code', 6);
          commit(USER_TOKEN, res.token);
          commit(USER_CODE, res.code);
          resolve(res)
       /* API.login({
          online:userInfo.online,
          userName: username,
          transformPassword: md5(userInfo.password),
        }).then(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('code', res.code);
          commit(USER_TOKEN, res.token);
          commit(USER_CODE, res.code);
          resolve(res)
        }).catch(error => {
          reject(error)
        })*/
      })
    },

    //获取用户信息
    [USER_INFO] ({commit, state}) {
      return new Promise((resolve, reject) => {
        let res={
          userVO:'1111e',
          deptInfo:'33e',
          menuList:[
            {perms:'GZT_XSMK'},
            {perms:'SY_XSMK'}
          ]
        }
        //API.getUserInfo().then(res => {
          commit(USER_INFO, res.userVO)
          commit(DEPT_INFO, res.deptInfo)
          let perm = handlePerm(res.menuList)
          commit(USER_PERM, perm)
          resolve(res)
        //}).catch(error => {
          //reject(error)
        //})
      })
    },

    // 前端 登出
    [USER_LOGOUT] ({commit}) {
      return new Promise(resolve => {
        API.logout().then(()=>{
          commit(USER_TOKEN, '')
          commit(USER_INFO, '')
          commit(USER_CODE, '')
          localStorage.removeItem('token')
          localStorage.removeItem('code')
          resolve()
        }).catch(()=>{
          commit(USER_TOKEN, '')
          commit(USER_INFO, '')
          commit(USER_CODE, '')
          localStorage.removeItem('token')
          localStorage.removeItem('code')
        });
      })
    },

    // 前端 清理数据
    [USER_CLEAR] ({commit}) {
      return new Promise(resolve => {
        commit(USER_TOKEN, '')
        commit(USER_INFO, '')
        commit(USER_CODE, '')
        commit(DEPT_INFO, '')
        commit(USER_PERM, '')
        localStorage.removeItem('token')
        localStorage.removeItem('code')
        resolve()
      })
    }
  }
}

export default user
