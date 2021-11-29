<template>
<!-- 没有接口数据只用HTML与CSS写样式 -->
  <div id="profile">
    <nav-bar class="profile-nav"><div slot="center">我的商城</div></nav-bar>
    <scroll class="content" :pull-up-load='true'>
      <!-- 登录注册 -->
      <div class="user-info">
        <img src="~assets/img/profile/avatar.svg" alt="">
        <div class="info">
          <div>登录/注册</div>
          <div><span class="iconfont phone">&#xe619;</span>暂无绑定手机号</div>
        </div>
        <div><span class="iconfont more">&#xe647;</span></div>
      </div>
      <!-- 优惠信息 -->
      <section class="account">
        <div>
          <div class="number"><span class="balance">0.00</span>元</div>
          <div class="account-info">我的余额</div>
        </div>
        <div>
          <div class="number"><span class="balance">0</span>个</div>
          <div class="account-info">我的优惠</div>
        </div>
        <div class="last-item">
          <div class="number"><span class="balance">0</span>分</div>
          <div class="account-info">我的积分</div>
        </div>
      </section>
      <!-- 选项卡 -->
      <div class="option">
        <span class="iconfont message">&#xe62e;</span>
        <div>我的消息</div>
      </div>
      <div class="option">
        <span class="iconfont shopping">&#xe61d;</span>
        <div>积分商城</div>
      </div>
      <div class="option line">
        <span class="iconfont card">&#xe63e;</span>
        <div>会员卡</div>
      </div>
      <div class="option">
        <span class="iconfont cart">&#xe618;</span>
        <div>我的购物车</div>
      </div>
      <div class="option">
        <span class="iconfont app">&#xe619;</span>
        <div class="div-app">下载购物APP</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: "Profile",
  components:{
    NavBar,
    Scroll,
  }
}
</script>

<style scoped>
#profile{
  height: 100vh;
  position: relative;
}
.profile-nav{
  text-align: center;
  color: #fff;
  line-height: 44px;
  background-color: var(--color-tint);
  z-index: 999;
}
.content{
overflow: hidden;
position:absolute;
top: 44px;
bottom: 49px;
left: 0;
right: 0;
}
/*******用户信息样式*******/
.user-info{
  padding: 15px;
  border-top: 1px solid rgba(255,255,255,0.2);
  background-color: var(--color-tint);
  display: flex;
}
.user-info>img{
  width: 60px;
  height: 60px;
}
.info{
  margin: 10px;
  color: #fff;
  position: relative;
}
.phone{
  font-size: 18px;
  padding-right: 2px;
  position: relative;
  top: 3px;
}
.info>div:nth-child(2){
  margin-top: 5px;
  font-size: 13px;
}
.more{
  color: #fff;
  font-size: 20px;
  position: absolute;
  right: 15px;
  top: 34px;
}
/*******优惠信息样式*******/
.account{
  display: flex;
  border-bottom: 10px solid #eee;
}
.account>div{
  flex: 1;
  padding: 20px;
  border-right: 1px solid #eee;
  text-align: center;
}
.account>.last-item{
  border-right: 0px;
}
.number{
  color: #666;
  font-size: 13px;
}
.balance{
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.account-info{
  color: #666;
  font-size: 13px;
  margin-top: 5px;
}
/*******选项卡样式*******/
.option{
  display: flex;
  height: 44px;
  width: 100%;
  line-height: 44px;
  color: #333;
}
.option>div{
  width: 100%;
  border-bottom: 1px solid #eee;
}
.line{
  margin-bottom: 10px;
}
.option>.div-app{
  border-bottom: 0;
}
.message{
  font-size: 18px;
  padding: 0 15px;
  color: #ff8198;
}
.shopping{
  font-size: 18px;
  padding: 0 15px;
  color: #fc7b53;
}
.card{
  font-size: 18px;
  padding: 0 15px;
  color: #ffc636;
}
.cart{
  font-size: 18px;
  padding: 0 15px;
  color: #ff8198;
}
.app{
  font-size: 18px;
  padding: 0 15px;
  color: #ff8198;
}
</style>
