import { DescItem } from '/@/components/Description/index'

export const DescItemData: DescItem[] = [
  {
    field: 'id',
    label: 'ID',
    labelMinWidth: 120,
  },
  {
    field: 'level',
    label: '集师傅等级',
    labelMinWidth: 120,
  },
  {
    field: 'userName',
    label: '联系电话',
    labelMinWidth: 120,
  },
  {
    field: 'checkStatusStr',
    label: '认证状态',
    labelMinWidth: 120,
  },
  {
    field: 'carSeriesStr',
    label: '主修车系',
    labelMinWidth: 120,
  },
  {
    field: 'skillTypeStr',
    label: '技能专长',
    labelMinWidth: 120,
  },
  {
    field: 'areaCodeStr',
    label: '所在地区',
    labelMinWidth: 120,
  },
  {
    field: 'address',
    label: '详细地址',
    labelMinWidth: 120,
  },
  {
    field: 'sourceStr',
    label: '用户来源',
    labelMinWidth: 120,
  },
  {
    field: 'createTime',
    label: '注册时间',
    labelMinWidth: 120,
  },
  {
    field: 'qualify',
    label: '接单资质',
    labelMinWidth: 120,
  },
]

export const MockData = {
  id: 1002992,
  label: 11,
  phone: 1982937838,
  status: '已认证',
  major_cars: ['德系车', '美系车'],
  expertise: ['变速箱', '电器'],
  area: '河南省郑州市高新区',
  address: '正商木华广场3号楼A座7层',
  origin: '运营创建',
  createTime: '2020-08-19 11:11:11',
  orderQualification: ['安装'],
}
