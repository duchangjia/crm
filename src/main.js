import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import components from './components'
import './styles/common.scss'
import './styles/_element.scss'
import './styles/_follow-item.scss'
import router from './router'
import API from './common/api'
import store from './store'
import "./common/permission"
import { formatDate, trimString } from '@/common/util'

Vue.prototype.API = API
Vue.prototype.$trim = trimString
Vue.use(ElementUI)

// 自定义组件扩展
Object.keys(components).forEach((key) => {
  // 首字母大写
  const name = key.replace(/(\w)/, v => v.toUpperCase());
  Vue.component(`${name}`, components[key]);
});

Vue.config.productionTip = false

Vue.filter('formatDate', function (value) {
  return formatDate(value,);
});

/*if (localStorage.getItem('token')) {
  API.mdfStuChanceAlloc()
}
window.setInterval(() => {
  if (localStorage.getItem('token')) {
    API.mdfStuChanceAlloc()
  }
}, 10 * 60 * 1000)*/

new Vue({
  el: '#app',
  router,
  store, // 使用store
  components: { App },
  template: '<App/>'
})
