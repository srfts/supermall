<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods:{
    addToCart(){
      this.$emit('addCart');
    }
  }
}
</script>

<style  scoped>
.bottom-bar{
  height: 49px;
  text-align: center;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #f5f5f5;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item>div {
  flex: 1;
}
.bar-left .text {
  font-size: 12px;
}
.bar-left .icon {
  display: block;
  width: 20px;
  height: 20px;
  margin: 5px auto 0;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bar-left .service {
  background-position:0 -48px;
}
.bar-left .shop {
  background-position:0 -89px;
}
.bar-right {
  font-size: 14px;
  line-height: 49px;
}
.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}
.bar-right .buy {
  background-color: #f69;
  color: #fff;
}
</style>
