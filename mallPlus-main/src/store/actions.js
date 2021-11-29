//如果是复杂的逻辑判断语句需要先通过actions处理,再调用mutaitions中的方法修改state的状态;
//导入定义的常量
import {
  ADD_COUNT,
  ADD_TO_CART
} from "./const-type"

export default {
  //加入到购物车列表: payload是新添加的商品
  addCart(context,payload){
    return new Promise((resolve,reject) =>{

      //1.如果新添加的商品id已经存在,则将商品浅拷贝到oldProduct变量中保存;
      /*******************************
      //方式一
      let oldProduct = null;
      for(item of state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item;
        }
      }
      *********************************/
      //方式二
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //2.如果oldProduct有值,证明该商品已经存在,则该商品数量+1;
      if(oldProduct){
        context.commit(ADD_COUNT,oldProduct);   //再传递到mutations改变state的状态
        resolve("当前商品重复加购");
      }
      //3.如果oldProduct没有值,证明该商品在购物车列表中没有;则添加count属性赋值1,并且将商品push到购物车列表;
      else{
        context.commit(ADD_TO_CART,payload);
        resolve("加入购物车成功");
      }
    })
  }
}
