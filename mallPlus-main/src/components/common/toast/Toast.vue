<template>
  <div class="toast" v-show='isShow'>
    <div>
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      isShow: false,
      message:''
    };
  },
  methods: {
    //调用后一定时间后隐藏,并清空上次传入的文字;
    show(message = '购物愉快！',duration = 1500){
      this.isShow = true
      this.message = message
      setTimeout(() => {
         this.isShow = false
         this.message = ''
      }, duration);
    }
  },
};
</script>

<style scoped>
.toast {
   position: fixed;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
   padding: 5px;
   color: #fff;
   border-radius: 6px;
   background: rgba(0,0,0,.7);
   z-index: 999;
  }
</style>
