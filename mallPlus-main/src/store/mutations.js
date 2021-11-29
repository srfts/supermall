//mutations修改state的唯一方式,而且方法功能要单一,方便跟踪记录到状态信息;
//导入定义的常量
import {
  ADD_COUNT,
  ADD_TO_CART
} from "./const-type"

export default {
  [ADD_COUNT](state,payload){
    payload.count++;
  },
  [ADD_TO_CART](state,payload){
    payload.count = 1;            //count属性: 记录新添加的商品数量 !
    payload.checked = false;      //checked属性: 记录新添加的商品是否选中的默认状态 !!
    state.cartList.push(payload);
  }
}
