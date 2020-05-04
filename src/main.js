import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'lib-flexible'; //引入自动转rem，这个不用注册

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
Vue.use(BootstrapVue)
  .use(IconsPlugin)

// 引入echarts
import ECharts from 'echarts'
Vue.prototype.$echarts = ECharts
//引入地图
// import 'echarts/map/js/china'; //引入广东地图

//导入vant组件
import {
  Button,
  Cell,
  CellGroup,
  Image,
  Lazyload,
  Checkbox,
  Tabbar,
  TabbarItem,
  Icon,
  Toast,
  Overlay,
  NoticeBar,
  Search
} from 'vant'
// 全局注册组件 注册组件不能和上面一样在里面用，分开，而是需要.user .user这样子
Vue.use(Button)
   .use(Cell)
   .use(CellGroup)
   .use(Image)
   .use(Lazyload)
   .use(Checkbox)
   .use(Tabbar)
   .use(TabbarItem)
   .use(Icon)
   .use(Toast)
   .use(Overlay)
   .use(NoticeBar)
   .use(Search)

// import nav from './components/nav.vue'
// Vue.component(nav.name,nav)


//导入vue-axios 、 axios
import axios from 'axios'
import VueAxios from 'vue-axios'
//注册vue-axios
Vue.use(VueAxios, axios)
//配置vue-axios 的 post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
