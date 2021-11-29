<template>
  <div class="goods">
    <good-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem.vue'

export default {
  name: "GoodList",
  components:{
    GoodListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  /*根据宽度自动设置一行显示几个*/
  flex-wrap: wrap;
  /*子元素之间平均分配父元素剩余的距离*/
  justify-content: space-around;
  padding:2px 4px;
}

</style>
