<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//导入BetterScroll(2.0应用)
import BScroll from '@better-scroll/core'
//导入插件
import PullDown from '@better-scroll/pull-down'           //设置下拉
import PullUp from '@better-scroll/pull-up'               //设置上拉加载
import ScrollBar from '@better-scroll/scroll-bar'         //设置滚动
import ObserveDom from "@better-scroll/observe-dom"       //设置观察域
import ObserveImage from '@better-scroll/observe-image'   //观察图像
//安装插件
BScroll.use(PullDown)
BScroll.use(PullUp)
BScroll.use(ScrollBar)
BScroll.use(ObserveDom)
BScroll.use(ObserveImage)

export default {
  name: "Scroll",
  data(){
    return {
      scroll: null
    }
  },
  props:{
    probeTybe: {
      type: Number,
      default: 0      //是否监听滚动位置 默认否
    },
    pullUpLoad:{
      type: Boolean,
      default: false  //是否上拉加载 默认否
    }
  },
  mounted(){
    //1.创建BS对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      scrollY: true,
      scrollbar: true,
      observeDOM: true,
      observeImage: true,
      click:true,                   //设置可点击
      probeType: this.probeTybe,    //设置监听滚动位置: 0/1/2/3
      pullUpLoad:this.pullUpLoad    //设置监听上拉事件: true/false
    });
    //通过on方法监听滚动的位置,传给Home组件
    if(this.probeTybe ===2 || this.probeTybe ===3){
      this.scroll.on('scroll',(position) => {
        this.$emit("barScroll",position)
      });
    }
    if(this.pullUpLoad){
      //监听上拉事件,传给Home组件
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp');
      });
    }
  },
  methods: {
    scrollTo(x, y,time) {
      //先判断scroll是否已经挂载完成,挂载完成调用scrollTo方法: 返回到某个位置
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      //finishPullUp方法:完成上拉加载,告诉BS为下一次上拉加载作准备;
      this.scroll && this.scroll.finishPullUp();
    },
    refresh(){
      this.scroll && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll.y ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>
