// 自定义模板内容、可根据需求按需编辑相应的内容
// 自定义模板内容、可根据需求按需编辑相应的内容
// 自定义模板内容、可根// 自定义模板内容、可根据需求按需编辑相应的内容
export interface columnsItem {
  key: string
  align: string
  title: string
  dataIndex?: string
  slots?: object
  width?: string | number
}

//详情
export interface detailedItem {
  title: string
  align: string
  key: string
  dataIndex: string
}

export interface parameterItem {
  title: string
  align: string
  key: string
  dataIndex: string
}

export interface modelsItem {
  title: string
  align: string
  key: string
  dataIndex: string
}

export interface modelsItem {
  title: string
  align: string
  key: string
  dataIndex: string
}

export interface dataCaseItem {
  key: string
  align: string
  title: string
  dataIndex?: string
  slots?: object
  width?: string | number
}

export interface draftItem {
  title: string
  align: string
  key?: string
  dataIndex?: string
  slots?: object
  width?: string | number
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
  title?: string
  align?: string
  key?: string
  dataIndex?: string
  width?: string | number
  slots?: object
}

export interface staffItem {
  title: string
  align: string
  key: string
  dataIndex: string
  width: string
}

export const columnsList: columnsItem[] = [
  {
    align: 'center',
    title: '商品ID',
    width: '70px',
    dataIndex: 'supplierID',
    key: '1',
  },
  {
    align: 'center',
    title: '商品类别',
    width: '90px',
    dataIndex: 'information',
    key: '2',
  },
  {
    align: 'center',
    title: '商品名称',
    width: '160px',
    dataIndex: 'region',
    key: '3',
  },
  {
    align: 'center',
    title: '品牌',
    width: '60px',
    dataIndex: 'Grade',
    key: '4',
  },
  {
    align: 'center',
    title: '商品规格',
    width: '80px',
    dataIndex: 'status',
    key: '5',
  },
  {
    align: 'center',
    title: '价格',
    width: '140px',
    dataIndex: 'agent',
    key: '6',
  },
  {
    align: 'center',
    title: '仓库',
    width: '75px',
    dataIndex: 'channel',
    key: '7',
  },
  {
    align: 'center',
    title: '库存',
    width: '90px',
    dataIndex: 'brand',
    key: '8',
  },
  {
    align: 'center',
    title: '供应商',
    width: '155px',
    dataIndex: 'staff',
    key: '9',
  },
  {
    align: 'center',
    title: '上架时间',
    width: '90px',
    dataIndex: 'Belonging',
    key: '10',
  },
  {
    align: 'center',
    title: '下架时间',
    width: '90px',
    dataIndex: 'last',
    key: '11',
  },
  {
    align: 'center',
    title: '商品状态',
    dataIndex: 'source',
    key: '12',
    width: '105px',
    slots: { customRender: 'enable' },
  },
  {
    align: 'center',
    title: '操作',
    key: '13',
    width: '225px',
    slots: { customRender: 'action' },
  },
]
//模板
export const dataCaseList: dataCaseItem[] = [
  {
    align: 'center',
    title: '编码',
    dataIndex: 'supplierID',
    key: '1',
  },
  {
    align: 'center',
    title: '商品类别',
    dataIndex: 'information',
    key: '2',
  },
  {
    align: 'center',
    title: '商品名称',
    dataIndex: 'region',
    width: '185px',
    key: '3',
  },
  {
    align: 'center',
    title: '品牌',
    dataIndex: 'Grade',
    key: '4',
  },
  {
    align: 'center',
    title: '价格区间',
    width: '165px',
    dataIndex: 'status',
    key: '5',
  },
  {
    align: 'center',
    title: '模板状态',
    dataIndex: 'agent',
    key: '6',
  },
  {
    align: 'center',
    title: '最后操作时间',
    dataIndex: 'channel',
    key: '7',
  },
  {
    align: 'center',
    title: '商品信息',
    slots: { customRender: 'state' },
    width: '260px',
    key: '8',
  },
  {
    align: 'center',
    title: '操作',
    key: '9',
    width: '240px',
    slots: { customRender: 'action' },
  },
]
//草稿
export const draftList: draftItem[] = [
  {
    title: '商品类别',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '品牌',
    dataIndex: 'department',
    key: 'department',
    align: 'center',
  },
  {
    title: '商品名称',
    dataIndex: 'quota',
    key: 'quota',
    align: 'center',
  },
  {
    title: '保存时间',
    dataIndex: 'coefficient',
    key: 'coefficient',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'channel',
    key: 'channel',
    width: '240px',
    slots: { customRender: 'action' },
    align: 'center',
  },
]
export const draftContent: draftItem[] = [
  {
    title: '型号',
    dataIndex: 'supplierID',
    key: 'supplierID',
    align: 'center',
  },
  {
    title: '品牌',
    dataIndex: 'information',
    key: 'information',
    align: 'center',
  },
  {
    title: 'OCV阀',
    dataIndex: 'region',
    key: 'region',
    align: 'center',
  },
  {
    title: '商品名称',
    dataIndex: 'Grade',
    key: 'Grade',
    align: 'center',
  },
  {
    title: '价格上限',
    key: 'channel',
    align: 'center',
    width: '200px',
    slots: { customRender: 'price' },
  },
  {
    title: '价格下限',
    key: 'chaPrice',
    align: 'center',
    width: '200px',
    slots: { customRender: 'price' },
  },
  {
    align: 'center',
    title: 'OE码',
    width: '200px',
    key: 'OeCode',
    slots: { customRender: 'code' },
  },
  {
    align: 'center',
    title: '适配车型',
    key: 'adapter',
    width: '200px',
    slots: { customRender: 'adapter' },
  },
  {
    align: 'center',
    title: '参数属性',
    key: 'parameter',
    width: '200px',
    slots: { customRender: 'parameter' },
  },
  {
    align: 'center',
    title: '商品分润',
    key: 'FenRun',
    width: '200px',
    slots: { customRender: 'FenRun' },
  },
  {
    align: 'center',
    title: '操作',
    width: '200px',
    slots: { customRender: 'action' },
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
//价格区间
export const detailList: detailedItem[] = [
  {
    title: '型号',
    dataIndex: 'supplierID',
    key: 'supplierID',
    align: 'center',
  },
  {
    title: '车辆品牌',
    dataIndex: 'information',
    key: 'information',
    align: 'center',
  },
  {
    title: 'OCV颜色',
    dataIndex: 'region',
    key: 'region',
    align: 'center',
  },
  {
    title: '商品名称',
    dataIndex: 'Grade',
    key: 'Grade',
    align: 'center',
  },
  {
    title: '价格上限',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: '价格下限',
    dataIndex: 'agent',
    key: 'agent',
    align: 'center',
  },
]
//参数属性
export const parameterList: parameterItem[] = [
  {
    title: '参数类型',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '参数值',
    dataIndex: 'value',
    key: 'value',
    align: 'center',
  },
]
//过滤
export const modelsList: modelsItem[] = [
  {
    title: '品牌',
    dataIndex: 'brandName',
    key: 'brandName',
    align: 'center',
  },
  {
    title: '车系',
    dataIndex: 'seriesName',
    key: 'seriesName',
    align: 'center',
  },
  {
    title: '年款',
    dataIndex: 'year',
    key: 'year',
    align: 'center',
  },
  {
    title: '排量',
    dataIndex: 'displacement',
    key: 'displacement',
    align: 'center',
  },
  {
    title: '变速器',
    dataIndex: 'weather',
    key: 'weather',
    align: 'center',
  },
  {
    title: '车型',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
]
//分润
export const FenRunTitle: any[] = [
  {
    title: '品牌',
    dataIndex: 'brand',
    key: 'brand',
    align: 'center',
  },
  {
    title: '车系',
    dataIndex: 'cars',
    key: 'cars',
    align: 'center',
  },
  {
    title: '年款',
    dataIndex: 'paragraph',
    key: 'paragraph',
    align: 'center',
  },
  {
    title: '排量',
    dataIndex: 'displacement',
    key: 'displacement',
    align: 'center',
  },
  {
    title: '天气',
    dataIndex: 'weather',
    key: 'weather',
    align: 'center',
  },
  {
    title: '励志',
    dataIndex: 'motivational',
    key: 'motivational',
    align: 'center',
  },
]
