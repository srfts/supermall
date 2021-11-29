<template>
  <div id="detail">
    <detail-nav-bar @titleClick='titleClick' ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @barScroll="barScroll"
            :probe-tybe='3'>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @goodsImageLoad='goodsImageLoad'></detail-goods-info>
      <detail-param-info :paramInfo=" paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods="recommendInfo" ref="recommend"></good-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>  <!--.native 监听直接组件的点击-->
  </div>
</template>

<script>
//子组件
import DetailNavBar from './childComs/DetailNavBar'
import DetailSwiper from './childComs/DetailSwiper'
import DetailBaseInfo from './childComs/DetailBaseInfo'
import DetailShopInfo from './childComs/DetailShopInfo'
import DetailGoodsInfo from './childComs/DetailGoodsInfo'
import DetailParamInfo from './childComs/DetailParamInfo'
import DetailCommentInfo from './childComs/DetailCommentInfo'
import DetailBottomBar from './childComs/DetailBottomBar'
//公共组件
import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'  //推荐页复用的首页的商品页
import BackTop from 'components/content/backtop/BackTop'
//请求
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
//方法与辅助函数
import {debounce} from 'common/utils'
import {mapActions} from 'vuex'
//import {backTopMixIn} from 'common/mixin'

export default {
  name: 'Detail',
  components:{
    //注册子组件
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList,
    BackTop,
  },
  //mixins:[backTopMixIn],
  data(){
    return {
      iid: 0,
      topImages: [],       //轮播图
      goods: {},           //商品基本信息
      shop: {},            //店铺信息
      detailInfo: {},      //详情商品展示图
      paramInfo: {},       //尺码参数信息
      commentInfo: {},     //评论信息
      recommendInfo: [],   //推荐页信息
      themeTopYs: [],      //标题对应组件的高度值
      currentIndex: 0,     //当前高亮的标题索引
      getThemeTopYs: null,
      newRefresh: null,
      isShowBackTop: false //返回顶部是否显示
    }
  },
  created(){
    //1.保存传入的id
    this.iid = this.$route.params.id;
    //2.根据id获取服务器中的详情页数据;
    getDetail(this.iid).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;                                     //轮播图数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)   //商品信息
      this.shop = new Shop(data.shopInfo)                                           //店铺信息
      this.detailInfo = data.detailInfo                                             //商品详情
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);  //参数信息
      if (data.rate.list) {                                                         //评论信息
        this.commentInfo = data.rate.list[0];
      }
    });
    //3.根据id获取服务器中推荐数据
    getRecommend().then(res => {
      this.recommendInfo = res.data.list;
    })
    //4.给getThemeTopYs赋值
    //封装读取商品/参数/评论/推荐距离顶部的高度的函数
    /**************************************************************************
      1.在created中调用报错,因为此时压根不能获取到页面元素;
      2.在mounted中调用会有值为undefined,因为虽然已经赋值完毕但浏览器需要时间进行渲染;
      3.调用nextTick()可以在DOM渲染完成执行回调函数,但依然会有图片后加载完成的问题;
      4.封装调用防抖之后返回的新函数,在详情页商品图片加载完成后进行调用;  √√
    ***************************************************************************/
    this.getThemeTopYs = debounce(()=>{
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);   //添加额外的最大值方便遍历
    },200)
  },
  mounted(){
    //直接调用防抖处理保存返回的新函数;
    //1.监听推荐页的图片加载 (复用goodlistitem)
    this.newRefresh = debounce(this.$refs.scroll.refresh,200);
    this.$bus.$on('itemImageLoad',()=>{
      this.newRefresh()
    })
  },
  methods:{
    //mapActions辅助函数: 可以将actions中的方法映射到组件的methods中直接调用
    ...mapActions(['addCart']),
    //2.监听详情页的图片加载: 此处直接调用防抖处理不行 ??
    goodsImageLoad(){
      this.newRefresh();
      this.getThemeTopYs();
    },
    //点击跳转到各个主题的offsetTop值
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],0);
    },
    //点击返回顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    //设置滚动区域对应的标题高亮
    barScroll(position){
      const site = Math.abs(position.y);
      const length = this.themeTopYs.length;
      //由于添加了一个额外的最大值 (遍历:length-1即可)
      //currentIndex != i 即在同一区域时不需要处理,只有在切换区域时才执行语句;
      for(let i=0; i< length; i++){
        if(this.currentIndex != i &&(site >= this.themeTopYs[i] && site < this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //设置BackTop的显示与隐藏(可以封装在mixin)
      this.isShowBackTop = -(position.y) > 1000;
    },
    addToCart(){
      //1.获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;

      //2.将商品信息添加store.state中-------(补充: Promise 与 mapActions)
      //修改state需要通过mutations,不能直接修改state的值,而当存在异步与逻辑判断时又需要先经过 actions;
      //this.$store.cartList.push(product);     xxx
      //this.$store.commit("addCart",product);  xxx
      //this.$store.dispatch("addCart",product).then(res => this.$toast.show(res));
      this.addCart(product).then(res =>this.$toast.show(res));
    }
  }
}
</script>

<style scoped>
#detail{
  height: 100vh;
  position: relative;
  background-color: #fff;
}
.content{
  /*height: calc(100% - 93px);*/
  /*不显示原生滚动条*/
  overflow: hidden;
  position:absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
