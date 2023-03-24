interface columnData {
  key: string
  align: string
  title: string
  dataIndex: string
  slots: Object
}
interface dataSourceItem {
  goodsId: string
  goodsName: string
  supplier: string
  userNickName: string
  commit: string
  ipAddress: string
  commitDate: string
  commitKeyWord: string
  isShow: Boolean
}
export const columnsList: columnData[] = [
  {
    key: '0',
    align: 'center',
    title: '商品id',
    dataIndex: 'goodsId',
    slots: { customRender: '' },
  },
  {
    key: '1',
    align: 'center',
    title: '商品名称',
    dataIndex: 'goodsName',
    slots: { customRender: '' },
  },
  {
    key: '2',
    align: 'center',
    title: '供应商',
    dataIndex: 'supplier',
    slots: { customRender: '' },
  },
  {
    key: '3',
    align: 'center',
    title: '用户昵称',
    dataIndex: 'userNickName',
    slots: { customRender: '' },
  },
  { key: '4', align: 'center', title: '评价', dataIndex: 'commit', slots: { customRender: '' } },
  {
    key: '5',
    align: 'center',
    title: 'ip地址',
    dataIndex: 'ipAddress',
    slots: { customRender: '' },
  },
  {
    key: '6',
    align: 'center',
    title: '评论时间',
    dataIndex: 'commitDate',
    slots: { customRender: '' },
  },
  {
    key: '7',
    align: 'center',
    title: '评论关键词',
    dataIndex: 'commitKeyWord',
    slots: { customRender: '' },
  },
  {
    key: '8',
    align: 'center',
    title: '是否显示',
    dataIndex: 'isShow',
    slots: { customRender: 'enable' },
  },
]

export const dataSourceList: dataSourceItem[] = [
  {
    goodsId: '1000001',
    goodsName: '全合成机油SL 10W-40 4L',
    supplier: '上海左班汽车零部件',
    userNickName: 'windy',
    commit: '❤❤❤❤❤',
    ipAddress: '192.168.1.92',
    commitDate: '2021-06-15 14:35:51',
    commitKeyWord: '关键词1、关键词2',
    isShow: true,
  },
  {
    goodsId: '1000002',
    goodsName: '全合成机油SL 10W-40 4L',
    supplier: '上海左班汽车零部件',
    userNickName: 'windy',
    commit: '❤❤❤❤❤',
    ipAddress: '192.168.1.92',
    commitDate: '2021-06-15 14:35:51',
    commitKeyWord: '关键词1、关键词2',
    isShow: true,
  },
  {
    goodsId: '1000003',
    goodsName: '全合成机油SL 10W-40 4L',
    supplier: '上海左班汽车零部件',
    userNickName: 'windy',
    commit: '❤❤❤❤❤',
    ipAddress: '192.168.1.92',
    commitDate: '2021-06-15 14:35:51',
    commitKeyWord: '关键词1、关键词2',
    isShow: true,
  },
  {
    goodsId: '1000004',
    goodsName: '全合成机油SL 10W-40 4L',
    supplier: '上海左班汽车零部件',
    userNickName: 'windy',
    commit: '❤❤❤❤❤',
    ipAddress: '192.168.1.92',
    commitDate: '2021-06-15 14:35:51',
    commitKeyWord: '关键词1、关键词2',
    isShow: true,
  },
  {
    goodsId: '1000005',
    goodsName: '全合成机油SL 10W-40 4L',
    supplier: '上海左班汽车零部件',
    userNickName: 'windy',
    commit: '❤❤❤❤❤',
    ipAddress: '192.168.1.92',
    commitDate: '2021-06-15 14:35:51',
    commitKeyWord: '关键词1、关键词2',
    isShow: true,
  },
]
