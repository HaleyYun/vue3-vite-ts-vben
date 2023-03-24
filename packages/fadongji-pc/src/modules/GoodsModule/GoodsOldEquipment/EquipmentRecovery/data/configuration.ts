import { FormSchema } from '/@/components/Form'
import { getGoodsModelList } from '/@/api/data/ModelFormApis'

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
    field: 'searchTimeOne',
    label: '最后更新时间',
    component: 'RangePicker',
    ifShow: true,
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'searchTimeTwo',
    label: '启动回收时间',
    component: 'RangePicker',
    ifShow: false,
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]
//回收中
export const justRecycledSchemas: FormSchema[] = [
  {
    field: 'categoryInfo',
    component: 'Select',
    label: '发动机型号',
    componentProps: {
      options: [],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: '启动回收时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]
//待回收
export const waitRecycledSchemas: FormSchema[] = [
  {
    field: 'categoryInfo',
    component: 'Select',
    label: '发动机型号',
    componentProps: {
      options: [],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: '暂停回收时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]

export const operateTableColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '操作人账号',
    dataIndex: 'creatorUserName',
    width: '120px',
    ellipsis: true,
  },
]

export const companyTableColumns = [
  {
    title: '编码',
    dataIndex: 'code',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '回收公司',
    dataIndex: 'shopName',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '提交人',
    dataIndex: 'submitterUserName',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: '120px',
    ellipsis: true,
  },
]

export const tableColumns = [
  {
    title: '编码',
    dataIndex: 'code',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '发动机型号',
    dataIndex: 'model',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '总回收价格',
    dataIndex: 'price',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '修理厂可见价格',
    dataIndex: 'garagePrice',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '回收公司',
    dataIndex: 'shopName',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '回收状态',
    dataIndex: 'status',
    width: '100px',
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    width: '220px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '180px',
    fixed: 'right',
    ellipsis: true,
  },
]
