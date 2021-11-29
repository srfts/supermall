<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>

</template>

<script>
//子组件
import CartList from './childComs/CartList'
import CartBottomBar from './childComs/CartBottomBar'
//公共组件
import NavBar from "components/common/navbar/NavBar"
import Scroll from 'components/common/scroll/Scroll'
//方法
import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components:{
    CartList,
    CartBottomBar,
    NavBar,
    Scroll,
  },
  computed:{
    //mapGetters辅助函数: 可以将store实例中的getters映射到组件的计算属性computed中;
    //...mapGetters({length:'cartLength'})
    ...mapGetters(['cartLength']),
  },
  //加入商品后需要重新计算可滚动区域高度
  activated(){
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
#cart{
  height: 100vh;
  position: relative;
}
.nav-bar{
  color: white;
  background-color: var(--color-tint);
}
.content{
  /*height: calc(100% - 44px);*/
  /*不显示原生滚动条*/
  overflow: hidden;
  position:absolute;
  top: 44px;
  bottom: 89px;
  right: 0;
  left: 0;
}
</style>
