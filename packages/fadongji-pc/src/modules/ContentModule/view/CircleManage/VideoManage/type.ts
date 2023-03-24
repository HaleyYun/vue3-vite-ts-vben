import { reactive } from 'vue'
interface columnData {
  key: string
  align: string
  title: string
  dataIndex: string
  slots: Object
}
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
    label: '关键词',
    name: 'goodsName',
    value: '',
    placeholder: '请选择关键词',
  },
  {

    label: '栏目',
    name: 'keyWord',
    value: '',
    placeholder: '请选择栏目',
  },
  {

    label: '账号/手机号',
    name: 'phoneOrAccount',
    value: '',
    placeholder: '请输入账号/手机号',
  },
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
