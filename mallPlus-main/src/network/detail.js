//导入网络请求
import {request} from "network/request";

//******************详情页接口*****************
export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
//将需要的服务器中杂乱的详情页信息先整合封装
//商品基本信息
export class Goods {                            //ES6通过class直接构造函数(类)
  constructor(itemInfo, columns, services) {    //constructor(){}传参
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.nowPrice = itemInfo.lowNowPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
  }
}
//商家信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
//参数信息
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值,某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

//*****************推荐页接口*****************
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
