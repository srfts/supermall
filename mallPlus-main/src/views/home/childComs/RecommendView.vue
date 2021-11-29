<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    margin-top: 15px;
    font-size: 14px;
    padding-bottom: 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    flex: 1;
    text-align: center;
  }
  .recommend img {
    width: 75px;
    height: 75px;
    margin-bottom: 10px;
  }
  .recommend span{
    /*设置标题只在一行显示,溢出部分显示省略号*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
