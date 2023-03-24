import { FormSchema } from '/@/components/Form'
import { getGoodsModelList } from '/@/api/data/ModelFormApis'

export const saleFormSchemas: FormSchema[] = [
  {
    field: 'keyword',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '输入商品名称搜索',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'modelId',
    component: 'ApiSearchSelect',
    label: '发动机型号',
    componentProps: {
      api: getGoodsModelList,
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: '最后更新时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]

export const tableSaveColumns = [
  {
    title: '编码',
    dataIndex: 'code',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '发动机型号',
    dataIndex: 'modelName',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '价格',
    dataIndex: 'levelVOS',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '库存',
    dataIndex: 'availableNumber',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '150px',
  },
  {
    title: '商品状态',
    dataIndex: 'statusName',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    width: '200px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '200px',
    fixed: 'right',
    align: 'center',
  },
]
