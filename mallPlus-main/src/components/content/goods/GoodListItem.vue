<template>
  <div class="goodsitem" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <!--<img v-lazy="showImage" alt="" @load="imageLoad">-->         <!--图片懒加载-->
    <div class="goodsinfo">
      <div class="title">{{goodsItem.title}}</div>
      <div>
        <span class="price">￥ {{goodsItem.price}}</span>
        <span class="collect">
          <img src="~assets/img/common/collect.svg" alt="">
          {{goodsItem.cfav}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      //逻辑或运算: 左边为真则不看右边,左边为假则判断右边 (换位报错？)
      //return this.goodsItem.image || this.goodsItem.show.img;
      //分类页图片--推荐页图片--商品页图片
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods:{
    //1.防抖处理: 分别发送图片加载完成的事件
    imageLoad(){
      if(this.$route.path.indexOf('/home')){
        this.$bus.$emit('homeImageLoad')
      }
      else if(this.$route.path.indexOf('/detail')){
        this.$bus.$emit('detailImageLoad')
      }
    },
    //2.监听item点击事件: 实现路由跳转并且根据iid进入对应商品的详情页
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goodsitem{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goodsitem img{
  width: 100%;
  height: 100%;
  border-radius:5px;
}
.goodsinfo{
  font-size: 12px;
  text-align: center;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.goodsinfo div{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 3px;
}
.price{
  color: var(--color-high-text);
  margin-right: 10px;
}
.collect img{
  width: 12px;
  height: 12px;
}
</style>
