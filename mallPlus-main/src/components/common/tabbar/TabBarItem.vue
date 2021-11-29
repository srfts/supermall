<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  //将点击的当前item路径传入
  props:{
    path: String,
    activeColor:{
      type: String,
      default: 'red'
    }
  },
  data(){
    return{
    }
  },
  computed:{
    isActive(){
      //判断当前活跃路由的路径是否包含当前当前item的路径
      return this.$route.path.indexOf(this.path) !== -1

    },
    activeStyle(){
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods:{
    itemClick(){
      if(this.$route.path !== this.path){
        this.$router.push(this.path)
      }
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex-grow: 1;
  text-align: center;
  font-size: 14px;
}
#tab-bar img{
  height: 24px;
  width: 24px;
  vertical-align: middle;
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
