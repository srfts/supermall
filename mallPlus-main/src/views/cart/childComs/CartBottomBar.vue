<template>
  <div id="bottom-bar">
    <check-button class="select-all"
                :isChecked="isSelectAll"
                @checkBtnClick="checkClick">
    </check-button>
    <span class="select-text">全选</span>
    <span class="total-price">合计: ￥{{totalPrice}}</span>
    <span class="calculate" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkbutton/CheckButton'
  import {mapGetters} from 'vuex'

	export default {
		name: "CheckBottomBar",
    components: {
		  CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      //选中的总价格: 先过滤出已经选中的商品,然后价格乘以数量得出总和,保留两位小数;
      totalPrice(){
        return this.cartList.filter(item => {
          return item.checked;
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count;
        },0).toFixed(2)
      },
      //选中的数量: 过滤出选中商品列表的长度
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      },
      //全选按钮的状态: 查找出未选中的商品列表,若不存在则全选,取反为true; 存在则没有全选,取反为false;
      isSelectAll(){
        if(this.cartList.length === 0) return false;
        return !(this.cartList.find(item => !item.checked))               //1.find
        //return !(this.cartList.filter(item => !item.checked).length)    //2.filter
      }
	  },
    methods:{
      //全选按钮点击
      checkClick(){
        //若计算属性isSelectAll的返回值为ture,则代表已经全选,点击全选按钮则全部不选中;
        if(this.isSelectAll){
          //this.cartList.forEach(item => item.checked = false)      //1.forEach
          for(let item of this.cartList){                            //2.普通遍历
            item.checked = false;
          }
        }
        //若没有全选,点击则全部设置为选中;
        else{
          //this.cartList.forEach(item => item.checked = true)
          for(let item of this.cartList){
            item.checked = true;
          }
        }
      },
      //点击去计算:当选中的商品列表长度为零,即一件商品都没有选中时;
      calcClick(){
        let tag = (this.cartList.filter(item => item.checked).length)
        if(!tag){
          this.$toast.show("请选择要购买的商品")
        }
      }
    }
  }
</script>

<style scoped>
#bottom-bar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #888;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  padding-left: 35px;
  box-sizing: border-box;
}
.select-all {
  position: absolute;
  /*取消掉父元素的行高样式*/
  line-height: 0;
  left: 10px;
  top: 13px;
}
.select-text{
  font-size: 15px;
}
.total-price {
  margin-left: 15px;
  font-size: 15px;
  color: #666;
}
.calculate {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 100%;
  text-align: center;
  float: right;
}
</style>
