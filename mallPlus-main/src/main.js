import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from 'components/common/toast/index'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import './assets/css/base.css'
import './assets/icon/iconfont.css'

Vue.prototype.$bus = new Vue()    //添加事件总线对象
Vue.use(toast)                    //安装toast插件
Vue.use(VueLazyLoad)              //使用图片懒加载插件 (将src改为v-lazy后在手机上不显示图片?)
FastClick.attach(document.body)   //调用attach方法解决移动端300ms延迟
Vue.config.productionTip = false  //阻止启动生产消息提示

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
