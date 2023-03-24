import { FormSchema } from '/@/components/Form'
import { getFactoryFunc } from '/@/modules/ContentModule/api/basicFormApis'
export const uponArrival = [
  {
    title: '发货仓库',
    dataIndex: 'wareHouseName',
    width: '200px',
  },
  {
    title: '到货地区',
    dataIndex: 'areaName',
    width: '250px',
  },
  {
    title: '预计到货时效',
    dataIndex: 'arrivalTime',
    width: '220px',
  },
  {
    title: '最后编辑时间',
    dataIndex: 'createTime',
    width: '160px',
  },
  {
    title: '编辑人',
    dataIndex: 'modifierInfo',
    width: '120px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '160px',
  },
]

export const opFormConfig: FormSchema[] = []

export const filterFormSchemasByAwait: FormSchema[] = [
  {
    field: 'wareHouseName',
    component: 'Select',
    label: '仓库名称',
    colProps: {
      span: 6,
    },
    slot: 'slotWareHouse',
  },
]

export const accessGoneData: FormSchema[] = []

export const hasNoneData: FormSchema[] = []
