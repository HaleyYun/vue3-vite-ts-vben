// 自定义模板内容、可根据需求按需编辑相应的内容
// 自定义模板内容、可根// 自定义模板内容、可根据需求按需编辑相应的内容
interface slotsType {
  customRender: string
}
export interface columnsItem {
  key: string
  align: string
  title: string
  dataIndex: string
  width?: string
  slots?: slotsType
}
export interface assetsItem {
  key: string
  align: string
  title: string
  dataIndex?: string
  width?: string
  slots?: slotsType
}
export interface detailedItem {
  title: string
  align: string
  key: string
  dataIndex: string
}
export interface integralItem {
  title: string
  align: string
  key: string
  dataIndex: string
}
export interface growItem {
  title: string
  align: string
  key: string
  dataIndex: string
}
export interface destroyItem {
  title: string
  align: string
  key: string
  dataIndex?: string
  width?: string
  slots?: slotsType
}
export interface staffItem {
  title: string
  align: string
  key: string
  dataIndex?: string
  width?: string
  slots?: slotsType
}
// @ts-ignore
export const columnsList = [
  {
    title: '代理商名称',
    dataIndex: 'shortName',
    width: '110px',
  },
  {
    title: '手机号',
    width: '120px',
    dataIndex: 'userName',
  },
  {
    title: '所在地区',
    width: '130px',
    dataIndex: 'areaCode',
  },
  {
    title: '店铺状态',
    dataIndex: 'status',
  },
  {
    title: '认证状态',
    dataIndex: 'checkStatusStr',
  },
  {
    align: 'center',
    title: '店铺名称',
    dataIndex: 'storeName',
    key: '6',
  },
  {
    title: '店铺名称',
    dataIndex: 'channel',
  },
  {
    title: '渠道经理',
    dataIndex: 'channelManagerId',
  },
  {
    title: '角色',
    dataIndex: 'roleCode',
  },
  {
    title: '注册时间',
    width: '180px',
    dataIndex: 'createTime',
    key: '12',
  },
  {
    align: 'center',
    title: '操作',
    key: '13',
    width: '20%',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
]
export const assetsList: assetsItem[] = [
  {
    align: 'center',
    title: '代理商ID',
    dataIndex: 'supplierID',
    key: '1',
  },
  {
    align: 'center',
    title: '代理商信息11',
    dataIndex: 'information',
    key: '2',
  },
  {
    align: 'center',
    title: '所属地区',
    dataIndex: 'region',
    key: '3',
  },
  // {
  //   align: 'center',
  //   title: '等级',
  //   dataIndex: 'certification',
  //   key: '3',
  // },
  {
    align: 'center',
    title: '账期额度',
    dataIndex: 'account',
    key: '4',
  },
  {
    align: 'center',
    title: '积分',
    dataIndex: 'integral',
    key: '5',
  },
  {
    align: 'center',
    title: '成长值',
    dataIndex: 'growth',
    key: '6',
  },
  {
    align: 'center',
    title: '客户运营',
    dataIndex: 'channel',
    key: '7',
  },
  {
    align: 'center',
    title: '明细',
    key: '8',
    width: '20%',
    slots: { customRender: 'action' },
  },
]
export const detailedList: detailedItem[] = [
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
    align: 'center',
  },
  {
    title: '账期额度',
    dataIndex: 'quota',
    key: 'quota',
    align: 'center',
  },
  {
    title: '账期系数',
    dataIndex: 'coefficient',
    key: 'coefficient',
    align: 'center',
  },
  {
    title: '时间',
    dataIndex: 'timeData',
    key: 'timeData',
    align: 'center',
  },
]
export const integralList: integralItem[] = [
  {
    title: '时间',
    dataIndex: 'timeData',
    key: 'timeData',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
  },
  {
    title: '规则',
    dataIndex: 'rules',
    key: 'rule',
    align: 'center',
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
  },
]
export const growList: growItem[] = [
  {
    title: '时间',
    dataIndex: 'timeData',
    key: 'timeData',
    align: 'center',
  },
  {
    title: '规则',
    dataIndex: 'rule',
    key: 'rule',
    align: 'center',
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
  },
]

export const destroyList: destroyItem[] = [
  {
    align: 'center',
    title: '代理商名称',
    dataIndex: 'supplierID',
    key: '1',
  },
  {
    align: 'center',
    title: '手机号',
    dataIndex: 'information',
    key: '2',
  },
  {
    align: 'center',
    title: '地区',
    width: '130px',
    dataIndex: 'region',
    key: '3',
  },
  {
    align: 'center',
    title: '账号状态',
    dataIndex: 'Grade',
    key: '4',
  },
  {
    align: 'center',
    title: '认证状态',
    dataIndex: 'status',
    key: '5',
  },
  {
    align: 'center',
    title: '店铺名称',
    dataIndex: 'agent',
    key: '6',
  },
  {
    align: 'center',
    title: '渠道经理',
    dataIndex: 'channel',
    key: '7',
  },
  {
    align: 'center',
    title: '代理品牌',
    dataIndex: 'brand',
    key: '8',
  },
  {
    align: 'center',
    title: '等级',
    dataIndex: 'certification',
    key: '9',
  },
  {
    align: 'center',
    title: '角色',
    dataIndex: 'role',
    key: '10',
  },
  {
    align: 'center',
    title: '用户来源',
    dataIndex: 'source',
    key: '11',
  },
  {
    align: 'center',
    title: '申请注销时间',
    width: '180px',
    dataIndex: 'register',
    key: '12',
  },
  {
    align: 'center',
    title: '操作',
    key: '13',
    width: '10%',
    slots: { customRender: 'action' },
  },
]

export const staffList: staffItem[] = [
  {
    title: '员工',
    dataIndex: 'staff',
    key: 'staff',
    align: 'center',
  },
  {
    title: '所属角色',
    dataIndex: 'Belonging',
    key: 'Belonging',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    align: 'center',
  },
  {
    title: '添加时间',
    dataIndex: 'addData',
    key: 'addData',
    align: 'center',
  },
  {
    title: '最后登录',
    dataIndex: 'lastData',
    key: 'lastData',
    align: 'center',
  },
  {
    title: '是否启用',
    dataIndex: 'Enable',
    key: 'Enable',
    align: 'center',
    slots: { customRender: 'enable' },
  },
  {
    align: 'center',
    title: '操作',
    key: '13',
    width: '25%',
    slots: { customRender: 'action' },
  },
]
