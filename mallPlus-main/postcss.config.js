
module.exports = {
  plugins: {
    autoprefixer: {},
    'px-to-viewport':{
      viewportWidth: 375,   //视窗的宽度(对应的是设计稿的宽度)
      ViewportHeight: 667,  //视窗的高度(对应的是设计稿的高度)
      unitPrecision: 5,     //指定'px'转化为视窗单位值的小数位数
      viewportUnit: 'vw',   //指定需要转化成的视窗单位(宽/高)
      minPixelValue: 1,     //小于或等于1px不转换成视窗单位
      mediaQuery: false,    //是否允许在媒体查询中转换px
      //selectorBlackList: ['ignore','tab-bar','tab-bar-item','bottom-bar'],  //指定不需要转化的类
      //exclude:[/Bar/]
    }
  }
}