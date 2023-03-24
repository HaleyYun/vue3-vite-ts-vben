import { FormSchema } from '/@/components/Form'
export const financialLiquidationForm: FormSchema[]  = [
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
      placeholder: '请输入手机号码',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const financialLiquidationColumn = [
  {
    title: '流水号',
    dataIndex: 'serialNumber',
    width: 200,
  },
  {
    title: '清算日期',
    dataIndex: 'timeOfLiquidation',
    width: 200,
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
    title: '金额',
    dataIndex: 'amount',
    width: 120,
  },
  {
    title: '详情',
    dataIndex: 'details',
    width: 120,
  },
  {
    title: '清分状态',
    dataIndex: 'statusOfSorting',
    width: 200,
  },
  {
    title: '清分时间',
    dataIndex: 'timeOfSorting',
    width: 240,
  },

  {
    title: '清分结果',
    dataIndex: 'resultOfSorting',
    width: 200,
  },
]
// 财务__ 清算-- 查看详情
export const financialLiquidationPopColumn = [
  {
    title: '业务订单号',
    dataIndex: 'businessOrderNo',
    width: 140,
  },
  {
    title: '流水号',
    dataIndex: 'serialNumber',
    width: 120,
  },
  {
    title: '支付时间',
    dataIndex: 'timeOfPayment',
    width: 200,
  },
  {
    title: '商家编号',
    dataIndex: 'merchantNumber',
    width: 100,
  },
  {
    title: '商户名称',
    dataIndex: 'merchantName',
    width: 160,
  },
  {
    title: '应收金额',
    dataIndex: 'amountReceivable',
    width: 100,
  },
  {
    title: '现金',
    dataIndex: 'cashAmount',
    width: 100,
  },
  {
    title: '活动',
    dataIndex: 'activity',
    width: 160,
  },
  {
    title: '卡券',
    dataIndex: 'cardVoucher',
    width: 100,
  },
  {
    title: '账期',
    dataIndex: 'accountingPeriod',
    width: 100,
  },
  {
    title: '履约时间',
    dataIndex: 'timeOfPerformance',
    width: 100,
  },
]