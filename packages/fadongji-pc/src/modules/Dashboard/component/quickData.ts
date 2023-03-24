import shopSvg from '/@/assets/images/shop.png'
import dingSvg from '/@/assets/svg/u456.svg'
import sheSvg from '/@/assets/images/she.png'
import upSvg from '/@/assets/images/up.png'
import xinSvg from '/@/assets/svg/u467.svg'
import gaoSvg from '/@/assets/images/nao.png'
import tiPng from '/@/assets/svg/u476.svg'
import miPng from '/@/assets/images/news.png'
export interface GrowQuickItem {
  title: string
  img: string
}

export const growQuickList: GrowQuickItem[] = [
  {
    title: '添加商品',
    img: shopSvg,
  },
  {
    title: '订单列表',
    img: dingSvg,
  },
  {
    title: '用户管理',
    img: sheSvg,
  },
  {
    title: '交易统计',
    img: upSvg,
  },
  {
    title: '短信营销',
    img: xinSvg,
  },
  {
    title: '广告管理',
    img: gaoSvg,
  },
  {
    title: '专题管理',
    img: tiPng,
  },
  {
    title: '新品推荐',
    img: miPng,
  },
]
