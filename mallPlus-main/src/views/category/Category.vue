<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
//公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import Scroll from 'components/common/scroll/Scroll'
//子组件
import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'
import TabContentDetail from './childComps/TabContentDetail'
//方法与混入
import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {tabControlMixin} from "@/common/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    TabControl,
    Scroll,
    TabMenu,
    TabContentCategory,
    TabContentDetail
  },
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {
      },
      currentIndex: -1
    }
  },
  created() {
    this.getCategory()    //调用请求分类数据的方法
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        //1.获取分类数据
        this.categories = res.data.category.list
        //2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this.getSubcategories(0)
      })
    },
    getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this.getCategoryDetail('pop')
        this.getCategoryDetail('sell')
        this.getCategoryDetail('new')
      })
    },
    getCategoryDetail(type) {
      //1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      //2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        //3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    //事件响应相关的方法
    selectItem(index) {
      this.getSubcategories(index)
    }
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  .nav-bar {
    position: relative;
    z-index: 999;
    color: #fff;
    background-color: #ff8198;
  }
  .content {
    display: flex;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
