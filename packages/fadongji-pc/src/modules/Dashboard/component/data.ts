import xiaoSvg from '/@/assets/svg/xiao.svg'
import jinSvg from '/@/assets/svg/jin.svg'
import qianSvg from '/@/assets/svg/qian.svg'
import shangPng from '/@/assets/images/shang.png'
export interface GrowCardItem {
  icon: string
  title: string
  value: number
  total: number
  color: string
  action: string
  img: string
  id: string
}

export const growCardList: GrowCardItem[] = [
  {
    id: '1',
    title: '今日订单总数',
    icon: 'visit-count|svg',
    value: 2030,
    total: 120000,
    color: 'green',
    img: xiaoSvg,
    action: '月',
  },
  {
    id: '2',
    title: '今日销售总额',
    icon: 'total-sales|svg',
    value: 50050.0,
    total: 500000,
    color: 'blue',
    img: jinSvg,
    action: '月',
  },
  {
    id: '3',
    title: '昨日销售总额',
    icon: 'download-count|svg',
    value: 50060.0,
    total: 120000,
    img: qianSvg,
    color: 'orange',
    action: '周',
  },
  {
    id: '4',
    title: '近7天销售总额',
    icon: 'transaction|svg',
    value: 500700.0,
    total: 50000,
    img: shangPng,
    color: 'purple',
    action: '年',
  },
]
