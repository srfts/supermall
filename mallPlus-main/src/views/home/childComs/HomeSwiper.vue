<template>
  <swiper>
      <!-- 使用v-for 需要:key保证唯一性 -->
    <swiper-item v-for="(item,index) in banners" :key="index">
      <!-- 要使用item变量中的属性值作为链接与图片路径,需要使用v-bind:动态绑定 -->
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  data(){
    return{
      isLoad: false   //设置发送图片加载事件标志位
    }
  },
  //父子通信:获取父组件Home的data中保存的服务器中的数据
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    swiperImageLoad(){
      if(!this.isLoad){  //只需要发送一次即可
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    }
  }
}
</script>

<style scoped>
</style>
