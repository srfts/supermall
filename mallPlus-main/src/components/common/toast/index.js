import Toast from './Toast'
//声明对象
let obj = {};

//vue使用插件时默认调用插件的install方法
obj.install = function(Vue){
  //创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  //实例化组件对象
  const toast = new toastConstructor()
  //将组件对象手动挂载到元素上
  toast.$mount(document.createElement('div'));
  //toast.$el对应的就是div，将div添加到body中
  document.body.appendChild(toast.$el)
  //将toast对象添加到vue原型上
  Vue.prototype.$toast = toast
}
//导出对象
export default obj;
