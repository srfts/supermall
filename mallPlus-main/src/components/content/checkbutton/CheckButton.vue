<template>
  <div class="check-button" @click="checkBtnClick" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type: Boolean,
        default: false
      }
    },
    methods:{
      //子传父:发送自定义事件,父组件通过:@事件名监听
      checkBtnClick(){
        this.$emit("checkBtnClick");
      }
    }
  }
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: 1px solid #c5c5c5;
}
.check{
  background-color: pink;
  border-color: pink;
}
</style>
