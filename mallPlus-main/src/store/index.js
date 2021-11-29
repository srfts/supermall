import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//1.安装插件
Vue.use(Vuex)

//2.创建store实例
const state = {
  cartList:[]
}
const store = new Vuex.Store({
  //ES6写法: 键名与键值同名时可简写
  state,
  mutations,
  actions,
  getters
})

//3.导出store实例挂载到vue实例上
export default store;
