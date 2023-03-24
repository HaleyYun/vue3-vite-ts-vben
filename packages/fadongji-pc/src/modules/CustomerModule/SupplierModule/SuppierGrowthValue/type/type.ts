// 积分设置 -- column
import { reactive } from 'vue'

export const IntegralSettingColumnItem = [
  {
    title: '规则ID',
    dataIndex: 'ruleID',
    align: 'center',
    width: '15%',
  },
  {
    title: '规则名称',
    dataIndex: 'ruleName',
    align: 'center',
    width: '15%',
  },
  {
    title: '数量',
    dataIndex: 'amount',
    align: 'center',
    width: '260px',
    slots: { customRender: 'amount' },
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: '15%',
    slots: { customRender: 'enable' },
  },
  {
    title: '描述',
    dataIndex: 'description',
    align: 'center',
  },
]

// 积分设置 -- 查询条件
interface searchItem {
  id: string
  label?: string
  value?: string
  placeHolder?: string
  slots?: ''
}
export const supplierSearchData = reactive<searchItem[]>([
  {
    id: 'supplierGrowthValue001',
    label: '规则名称：',
    value: '',
    placeHolder: '请输入规则名称',
  },
  {
    id: 'supplierGrowthValue002',
    label: '状态：',
    value: undefined,
    placeHolder: '请选择状态',
    slots: '',
  },
  // {
  //     id: 'supplierGrowthValue003',
  // }
])

// "等级设置" -- column 项
export const rateAssetsColumnData = reactive([
  {
    title: '等级名称',
    dataIndex: 'rateName',
    align: 'center',
    width: '15%',
  },
  {
    title: '成长值数量',
    dataIndex: 'growthAmount',
    align: 'center',
    width: '15%',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: '15%',
    slots: { customRender: 'statusEnable' },
  },
  {
    title: '描述',
    dataIndex: 'description',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: '15%',
    slots: { customRender: 'operation' },
  },
])

/* "等级设置" --【等级设置】 - 修改 */
export const rateChangeData = reactive([
  { label: '等级名称', value: '', isInput: '' },
  { label: '需要成长值数量', value: '相关描述的说明，文本描述说明', isInput: '' },
  { label: '等级描述', value: undefined },
])
