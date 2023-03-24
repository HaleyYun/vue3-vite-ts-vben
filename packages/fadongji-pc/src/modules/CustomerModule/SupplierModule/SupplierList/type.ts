import { reactive } from 'vue'
interface columnData {
  key: string
  align: string
  title: string
  dataIndex: string
  slots: Object
}
interface searchItem {
  id: string
  label?: string
  value?: string
  placeHolder?: string
  slots?: ''
}
export const supplierSearchData = reactive<searchItem[]>([
  {
    id: 'tag-1',
    label: '账号:',
    value: '',
    placeHolder: '请输入账号',
  },
  {
    id: 'tag-2',
    label: '角色:',
    value: undefined,
    placeHolder: '请选择角色',
    slots: '',
  },
  {
    id: 'tag-3',
    label: '时间:',
    value: undefined,
    placeHolder: '请选择起止日期',
    slots: '',
  },
  {
    id: 'tag-4',
    label: '启用状态:',
    value: undefined,
    placeHolder: '选择账号启用状态',
    slots: '',
  },
  {
    id: 'tag-5',
    value: undefined,
    placeHolder: '选择账号启用状态',
  },
])
export const goodsClassfy = [
  { label: '栏目A', value: 'A' },
  { label: '栏目B', value: 'B' },
  { label: '栏目C', value: 'C' },
]
export const contentClassfy = [
  { label: '品类A', value: 'A' },
  { label: '品类B', value: 'B' },
  { label: '品类C', value: 'C' },
]
export const goodsEvaluatioForm = reactive([
  {
    id: 1,
    label: '供应商名称',
    value: '',
    placeholderText: '供应商名称',
    name: 'goodsName',
  },
  {
    id: 2,
    label: '供应商手机号',
    vaule: '',
    placeholderText: '供应商手机号',
    name: 'nickName',
  },
  {
    id: 3,
    label: '所属地区',
    slot: 'slot',
    name: '',
    width: '246.2px',
    placeholderText: '所属地区',
    value: 'B',
  },
  {
    id: 4,
    label: '供应商等级',
    slot: 'slot',
    name: '',
    width: '246.2px',
    placeholderText: '供应商等级',
    value: 'B',
  },
  {
    id: 5,
    label: '注册时间',
    slot: 'slot',
    name: '',
    width: '246.2px',
    placeholderText: '请选择起止时间',
    value: 'B',
  },
  {
    id: 6,
    label: '用户来源',
    vaule: '',
    placeholderText: '用户来源',
    name: 'nickName',
  },
  // {
  //   id: 7,
  //   name: '查询',
  //   reset: '重置',
  //   slot: 'slot',
  // },
])
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
  {
    key: '9',
    align: 'center',
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'action' },
  },
]
