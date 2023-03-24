import { FormSchema } from '/@/components/Form'

export const filterTimeOfArrivalData: FormSchema[]   = [
  {
    field: 'wareHouseName',
    component: 'Select',
    label: '仓库名称',
    colProps: {
      span: 6,
    },
    slot: 'slotWareHouse'
  },
]

export const filterGoodsTimeLimit: FormSchema[] = [
  {
    field: 'warehouseName',
    component: 'Input',
    label: '仓库名称',
    colProps: {
      span: 22,
    },
    rules: [{ required: true, message: '请输入仓库名称' }],
    componentProps: {
      placeholder: '请输入仓库名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'areaCode',
    component: 'DatePicker',
    label: '到货区域',
    colProps: {
      span: 6,
    },
    slot: 'slotAreaCode'
  },
  {
    field: 'arrivalTime',
    component: 'Input',
    label: '预计到货时间',
    colProps: {
      span: 22,
    },
    rules: [{ required: true, message: '请输入仓库名称' }],
    componentProps: {
      placeholder: '请输入预计到货时间',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'creator',
    component: 'Input',
    label: '创建人',
    colProps: {
      span: 22,
    },
    rules: [{ required: true, message: '请输入创建人' }],
    componentProps: {
      placeholder: '请输入创建人',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const timeOfArrivalColumn = [
  {title: '发货仓库', dataIndex: 'warehouseName'},
  {title: '到货地区', dataIndex: 'areaName'},
  {title: '预计到货时效', dataIndex: 'arrivalTime'},
  {title: '最后编辑时间', dataIndex: 'creatTime'},
  {title: '编辑人', dataIndex: 'editor'},
  {title: '操作', dataIndex: 'action'},
]
