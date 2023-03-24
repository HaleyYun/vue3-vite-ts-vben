import { FormSchema } from '/@/components/Form'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'orderId',
    component: 'Input',
    label: '服务订单号',
    componentProps: {
      placeholder: '服务订单号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'debitPhone',
    component: 'Input',
    label: '申请人手机号',
    componentProps: {
      placeholder: '请输入申请人手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'relationType',
    component: 'Select',
    label: '售后服务',
    componentProps: {
      options: [
        { label: '全部', value: '' },
        { label: '运输损坏', value: '运输损坏' },
        { label: '更换零部件', value: '更换零部件' },
        { label: '换机', value: '换机' },
      ],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '收款状态',
    componentProps: {
      options: [
        { label: '全部', value: '' },
        { label: '已收款', value: 1 },
        { label: '未收款', value: 2 },
      ],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: '补偿到账日期',
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
    title: '流水号',
    dataIndex: 'serialNo',
    width: '120px',
  },
  {
    title: '服务订单',
    dataIndex: 'OrderNumber',
    width: '180px',
  },
  {
    title: '售后服务',
    dataIndex: 'relationType',
    width: '100px',
  },
  {
    title: '供应商手机号',
    dataIndex: 'debitPhone',
    width: '150px',
  },
  {
    title: '状态',
    dataIndex: 'orderStatusName',
    width: '150px',
  },
  {
    title: '赔付金额',
    dataIndex: 'refundAmount',
    width: '120px',
  },
  {
    title: '补偿到账时间',
    dataIndex: 'createTime',
    width: '180px',
  },
  {
    title: '收款状态',
    dataIndex: 'status',
    width: '100px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '160px',
    fixed: 'right',
  },
]
