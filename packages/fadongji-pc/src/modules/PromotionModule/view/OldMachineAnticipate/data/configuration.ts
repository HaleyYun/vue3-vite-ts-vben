import { FormSchema } from '/@/components/Form'
import { getGoodsModelList } from '/@/api/data/ModelFormApis'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '商品名称',
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
      placeholder: '发动机型号',
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
  // {
  //     field: 'categoryInfo',
  //     component: 'ApiSelect',
  //     label: '认证状态',
  //     componentProps: {
  //         options:[],
  //         placeholder: '请选择',
  //         onChange: (e) => {
  //             console.log(e)
  //         },
  //     },
  // },
]

export const tableColumns = [
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
    width: '200px',
  },
  {
    title: '发动机型号',
    dataIndex: 'modelName',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '价格',
    dataIndex: 'levelPrice',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '预售量',
    dataIndex: 'levelCount',
    width: '120px',
  },
  {
    title: '预售时间',
    dataIndex: 'levelTime',
    width: '200px',
    ellipsis: true,
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '220px',
    ellipsis: true,
  },
  {
    title: '活动状态',
    dataIndex: 'status',
    width: '150px',
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
  },
]

export const getColumns = (val) => {
  let titles = '最后更新时间'
  switch (val) {
    case 'one':
      titles = '最后更新时间'
      break
    case 'two':
      titles = '提交时间'
      break
    case 'three':
      titles = '审核时间'
      break
    case 'four':
      titles = '活动启动时间'
      break
    case 'five':
      titles = '活动启动时间'
      break
    case 'six':
      titles = '活动暂停时间'
      break
    case 'seven':
      titles = '结束时间'
      break
  }
  const columns = tableColumns
  columns[columns.length - 2]['title'] = titles
  return columns
}

//详情卖家
export const sellerTableColumns = [
  {
    title: '编码',
    dataIndex: 'shopCode',
    align: 'center',
    width: 200,
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    align: 'center',
  },
  {
    title: '提交人',
    dataIndex: 'creator',
    align: 'center',
    width: 300,
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    align: 'center',
    width: 240,
  },
]

//详情销售
export const handleColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    align: 'center',
  },
  {
    title: '操作人',
    dataIndex: 'creatorUserName',
    align: 'center',
  },
]
