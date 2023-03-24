import { FormSchema } from '/@/components/Form'
export const filterPaymentCashForm: FormSchema[]  = [
  {
    field: 'orderNumber',
    component: 'Input',
    label: '订单编号',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入订单编号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'customerName',
    component: 'Input',
    label: '客户名称',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入客户名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'customerCode',
    component: 'Input',
    label: '客户编号',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入客户编号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: '[startTime, endTime]',
    label: '创建时间',
    colProps: {
      span: 6,
    },
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '手机号',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const PaymentCashColumn = [
  {
    title: '支付流水号',
    dataIndex: 'serialNumber',
    width: 200,
  },
  {
    title: '流水号',
    dataIndex: 'orderNumber',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 240,
  },
  {
    title: '用户编号',
    dataIndex: 'userNumber',
    width: 120,
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    width: 200,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 140,
  },
  {
    title: '支付金额',
    dataIndex: 'PayAmount',
    width: 120,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
  },
  {
    title: '支付渠道',
    dataIndex: 'paymentChannel',
    width: 160,
  },
  {
    title: '分账金额',
    dataIndex: 'subLedgerAmount',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
  },
  {
    title: '支付时间',
    dataIndex: 'payTime',
    width: 200,
  },
  {
    title: '履约时间',
    dataIndex: 'timeOfPerformance',
    width:200,
  }
]