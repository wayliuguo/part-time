import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入reset.css
import '@/assets/css/reset.css'
// 引入rem.js
import '@/assets/js/rem.js'
// 导入axios
import axios from 'axios'
// 引入retreat 组件
import Retreat from './components/Retreat'
// 引入navigation 组件
import Navigation from './components/Navigation'
// 引入icon
import './assets/icon/iconfont.css'

import {
  Tabbar, TabbarItem, Field, Button, Toast,
  Image as VanImage, Divider, Icon, Uploader,
  RadioGroup, Radio, Tab, Tabs, Cell, CellGroup,
  Grid, GridItem, Empty
} from 'vant'

// socket.io
import SocketIO from 'vue-socket.io'
import ClientSocketIO from 'socket.io-client'

Vue.use(new SocketIO({
  debug: true,
  connection: ClientSocketIO.connect('http://localhost:8000/', {
    autoConnect: false, // 关闭自动连接
    transports: ['websocket']
  })
}))

Vue.use(Tabbar).use(TabbarItem).use(Field).use(Button).use(Toast).use(VanImage)
  .use(Divider).use(Icon).use(Uploader).use(RadioGroup).use(Radio).use(Tab).use(Tabs)
  .use(Cell).use(CellGroup).use(Grid).use(GridItem).use(Empty)
// axios 全局配置
axios.defaults.baseURL = 'http://localhost:3000'
// axios 实例，此实例用于需要登陆验证的请求
let authAxios = axios.create({})
authAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth')
    // 把token塞入Authorization里
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
authAxios.interceptors.response.use(
  res => {
    return res
  }, err => {
    return Promise.reject(err)
  }
)
Vue.prototype.$authHttp = authAxios
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 全局注册组件
Vue.component('Retreat', Retreat)
Vue.use(Retreat)
Vue.component('Navigation', Navigation)
Vue.use(Navigation)

// 全局路由守卫
router.beforeEach((to, from, next) => {
  let isLogin = store.state.logined
  if (isLogin) {
    next()
  } else {
    if (to.path === '/profile') {
      next()
    } else {
      next({ name: 'profile' })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
