//导入网络请求
import {request} from "network/request";

export function getHomeMultidata(){
  //返回的是request函数的返回值即Promise对象
  return request({
    url: '/home/multidata'
  })
}
export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

