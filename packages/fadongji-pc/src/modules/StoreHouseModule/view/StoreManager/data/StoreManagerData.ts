// import { FormSchema } from '/@/components/Form'

export const rulesColumn = [
  {title: '规则名称', dataIndex: 'name'},
  {title: '截单日期', dataIndex: 'endTime', width: 350},
  {title: '发货时效', dataIndex: 'estimatedDelivery', width: 80},
  {title: '收货区域', dataIndex: 'areaName'},
  {title: '操作', dataIndex: 'action'},
]

// export const filterGoodsTimeLimit: FormSchema[] = [
//   {
//     field: 'warehouseName',
//     component: 'Input',
//     label: '仓库名称',
//     colProps: {
//       span: 22,
//     },
//     rules: [{ required: true, message: '请输入仓库名称' }],
//     componentProps: {
//       placeholder: '请输入仓库名称',
//       onChange: (e) => {
//         console.log(e)
//       },
//     },
//   },
//   {
//     field: 'areaCode',
//     component: 'DatePicker',
//     label: '到货区域',
//     colProps: {
//       span: 6,
//     },
//     slot: 'slotAreaCode'
//   },
//   {
//     field: 'arrivalTime',
//     component: 'Input',
//     label: '预计到货时间',
//     colProps: {
//       span: 22,
//     },
//     rules: [{ required: true, message: '请输入仓库名称' }],
//     componentProps: {
//       placeholder: '请输入预计到货时间',
//       onChange: (e) => {
//         console.log(e)
//       },
//     },
//   },
//   {
//     field: 'creator',
//     component: 'Input',
//     label: '创建人',
//     colProps: {
//       span: 22,
//     },
//     rules: [{ required: true, message: '请输入创建人' }],
//     componentProps: {
//       placeholder: '请输入创建人',
//       onChange: (e) => {
//         console.log(e)
//       },
//     },
//   },
// ]