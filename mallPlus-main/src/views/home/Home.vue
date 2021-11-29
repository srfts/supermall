<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!--用于吸顶显示: 默认隐藏-->
    <tab-control :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl01"
                class="tabctrol"
                v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref='scroll'
            :probe-tybe='3'
            @barScroll='barScroll'
            :pull-up-load='true'
            @pullingUp='loadMore'>
      <home-swiper :banners ="banners" @swiperImageLoad='swiperImageLoad' ref="hSwiper"></home-swiper>
      <recommend-view :recommends ="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl02"></tab-control>
      <!-- 需要传入当前点击的商品类型对应的商品数据 在当前页展示 -->
      <good-list :goods="goods[currentType].list"></good-list>
    </scroll>
        <!--@click.native直接监听组件的点击,可以代替使用自定义组件发出事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//子组件
import HomeSwiper from './childComs/HomeSwiper'
import RecommendView from './childComs/RecommendView'
import FeatureView from './childComs/FeatureView'
//公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'
//方法
import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'

export default {
  name: "Home",
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data(){
    return{
      banners: [],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  //当页面创建,请求首页多个数据列表与商品数据;
  //由于起名相同: 使用this是调用methods中封装的方法,直接调用才是调用导入的请求函数;
  created(){
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  //当页面渲染完成,通过事件总线监听图片加载完成事件,更新可滚动的高度;
  //调用防抖函数处理,使用返回的新函数,让刷新没有那么频繁;
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,200);
    this.$bus.$on('homeImageLoad',()=>{
      refresh()
    })
  },
  //在路由占位符被keep-alive包裹时拥有activated与deactivated属性;
  //记录Home页面的状态:在离开当前路由前保存滚动的Y值,当切回当前路由时重新赋值原位置
  activated(){
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY,10);
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods:{
    //*********************事件监听相关方法**********************
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //需要两个tabcontrol显示商品类型的都与最新的点击保持同步
      this.$refs.tabControl01.currentIndex = index;
      this.$refs.tabControl02.currentIndex = index;
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    //由scroll的滚动位置: 设置backTop是否显示,tabControl是否吸顶;
    barScroll(position){
      this.isShowBackTop = -(position.y) > 1000;
      this.isTabFixed =  -(position.y) > this.tabOffsetTop;
    },
    //上拉加载保存请求的下一页商品数据后,并完成当次下拉加载;
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp();
    },
    //在轮播图加载完成后,再读取tabControl的offsetTop值,避免轮播图未加载完成而获取到错误的值;
    //所有的组件都有 $el属性用于直接获取到组件中的元素
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl02.$el.offsetTop;
    },
    //*********************网络请求相关方法*********************
    //调用导入的请求首页数据的函数,返回值是Promise对象;
    //箭头函数自身没有this,它会查找离它最近的作用域的this; 即created的this,就是当前组件对象;
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    //调用导入的请求首页商品数据的函数: 由传入type动态获取page,便于复用请求;
    //保存请求的商品类型对应的数据,并且更新页码;
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      })
    }
  }
}
</script>
<style scoped>
/*scoped: 设置当前样式的作用域只在当前文件有效*/
#home{
  /*vh: 可视窗口高度*/
  height: 100vh;
  position: relative;
}
.home-nav{
  color: white;
  /*使用事先在base.css中设置的css变量*/
  background-color: var(--color-tint);
  z-index: 999;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabctrol{
  position: relative;
  z-index: 999;
}
</style>
