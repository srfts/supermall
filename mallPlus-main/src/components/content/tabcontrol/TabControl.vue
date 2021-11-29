<template>
  <div class="tabcontrol">
    <div v-for="(item,index) in titles" :key="index" class="tabcontrol-item"
    :class="{active: currentIndex === index}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit("tabClick",index);
    }
  }
}
</script>

<style scoped>
.tabcontrol{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  background-color: white;
}
.tabcontrol-item{
  flex: 1;
}
.tabcontrol-item span{
  padding: 5px;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 2px solid var(--color-high-text);
}
</style>

