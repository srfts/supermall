<template>
  <div id="cart-list-item">
    <div class="item-selector">
      <CheckButton :isChecked="product.checked" @checkBtnClick="checkedChange"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述: {{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'
export default {
  name: "CartList",
  components:{
     CheckButton
  },
  //获取父组件中遍历的商品列表中的每个item
  props:{
    product:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    checkedChange(){
      //商品是否选中的状态应该在vuex模型中记录 !! 不能简单地在组件中设置一个属性记录
      //即点击加入购物车确定是新添加的商品时直接设置默认是否选中;
      this.product.checked = !this.product.checked;
    }
  }
}
</script>

<style scoped>
#cart-list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}
.item-img img {
  width: 60px;
  height: 80px;
  display: block;
  border-radius: 2px;
}
.item-info {
  font-size: 14px;
  color: #333;
  padding: 15px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 13px;
  color: #666;
  margin-top: 10px;
}
.item-title, .item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-bottom {
  position: absolute;
  bottom: 15px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
}
</style>
