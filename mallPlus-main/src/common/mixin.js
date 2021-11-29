//对backTop功能的混入抽取（暂时没有应用）
/*******************************************************
 在mixin生命周期中的内容(data,created,mounted,...)
 可以与引入混入的组件生命周期内容进行合并;
 但在methods中的各个方法如果有重叠会直接替换,没有重叠就添加;
*********************************************************/
import BackTop from 'components/content/backtop/BackTop'
export const backTopMixIn = {
  components:{
    BackTop,
  },
  data(){
    return{
      isShowBackTop: false
    }
  },
  methods:{
    backClick(){
      //通过在子组件标签绑定:ref,访问子组件的方法
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}

//对tabcontrol功能进行混入(分类页应用)
export const tabControlMixin = {
  data() {
    return {
      currentType: "pop"
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break
        case 2:
          this.currentType = "sell"
          break
      }
    }
  }
}
