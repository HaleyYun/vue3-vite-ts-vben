export interface GrowShopItem {
  title: string
  value: number
}

export interface GrowUserItem {
  title: string
  value: number
}
export const growShopList: GrowShopItem[] = [
  {
    title: '已下架',
    value: 200,
  },
  {
    title: '已上架',
    value: 20630,
  },
  {
    title: '库存紧张',
    value: 20620,
  },
  {
    title: '全部商品',
    value: 20350,
  },
]
export const growUserList: GrowUserItem[] = [
  {
    title: '今日新增',
    value: 2800,
  },
  {
    title: '昨日新增',
    value: 20048,
  },
  {
    title: '本月新增',
    value: 20630,
  },
  {
    title: '会员总数',
    value: 20301,
  },
]
