import Vue from 'vue'
import vuex from 'vuex'
import workbench from './modules/workbench.js' // 工作台右边
import user from './modules/user'

Vue.use(vuex);

const store = new vuex.Store({
  modules: {
    workbench, // 工作台的vuex
    user
  }
})

export default store
