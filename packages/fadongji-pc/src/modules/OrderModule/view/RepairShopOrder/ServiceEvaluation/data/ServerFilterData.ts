import { FormSchema } from '/@/components/Form'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '服务单编号',
    componentProps: {
      placeholder: '服务单编号',
    },
  },
  {
    field: 'goodsName',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '商品名称',
    },
  },
  {
    field: 'customerServiceName',
    component: 'Input',
    label: '处理人',
    ifShow: false,
    componentProps: {
      placeholder: '处理人',
    },
  },
  {
    field: 'buyerName',
    component: 'Input',
    label: '评价人昵称',
    componentProps: {
      placeholder: '评价人昵称',
    },
  },
  {
    field: 'searchTime',
    label: '评价时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]

export const tableColumns = [
  {
    title: '服务单号',
    dataIndex: 'sourceId',
    width: 120,
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
  },
  {
    title: '处理人',
    dataIndex: 'afterSaleName',
    width: 110,
  },

  {
    title: '评价人昵称',
    dataIndex: 'userName',
  },
  {
    title: '服务满意度',
    dataIndex: 'starMark',
    width: 120,
  },
  {
    title: '是否解决了问题',
    dataIndex: 'isSolve',
  },
  {
    title: '服务感受',
    dataIndex: 'comment',
    width: 120,
  },

  {
    title: '售后类型',
    dataIndex: 'afterSaleType',
    width: 160,
  },
  {
    title: '评价时间',
    dataIndex: 'createTime',
    width: 220,
  },
]
