import { FormSchema } from '/@/components/Form'
import { getGoodsModelCompensateUnitList, getGoodsModelList } from '/@/api/data/ModelFormApis'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'modelId',
    component: 'ApiSearchSelect',
    label: '发动机型号',
    componentProps: {
      api: getGoodsModelList,
      placeholder: '输入型号名称搜索',
    },
  },
  {
    field: 'unitId',
    component: 'ApiSearchSelect',
    label: '零件名称',
    componentProps: {
      api: getGoodsModelCompensateUnitList,
      placeholder: '输入零件名称搜索',
    },
  },
]

export const tableColumns = [
  {
    title: '发动机型号',
    dataIndex: 'model',
    ellipsis: true,
  },
  {
    title: '零件名称',
    dataIndex: 'unitName',
    ellipsis: true,
  },
  {
    title: '运输损坏金额',
    dataIndex: 'repairAmount',
    ellipsis: true,
  },
  {
    title: '更换零部件金额',
    dataIndex: 'replaceAmount',
    ellipsis: true,
  },
  {
    title: '旧件是否寄回',
    dataIndex: 'isSendBack',
    ellipsis: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: '180px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: '150px',
    align: 'center',
  },
]
