import { FormSchema } from '/@/components/Form'
export const filterCashSettlementFormByAwait: FormSchema[] = [
  {
    field: 'orderNo',
    component: 'Input',
    label: '订单编号',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入订单编号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'payee',
    component: 'Input',
    label: '收款人名称',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入收款人名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '类型',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请选择类型',
      options: [
        {
          label: '商家结算',
          value: '1',
        },
        {
          label: '用户提现',
          value: '2',
        },
      ],
    },
  },
  {
    field: '[startTime, endTime]',
    label: '创建时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm:ss' },
    },
  },
  {
    field: 'paymentStatus',
    component: 'Select',
    label: '类型',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请选择打款状态',
      options: [
        {
          label: '成功',
          value: '1',
        },
        {
          label: '失败',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'resultStatus',
    component: 'Select',
    label: '结果状态',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请选择结果状态',
      options: [
        {
          label: '成功',
          value: '1',
        },
        {
          label: '失败',
          value: '2',
        },
      ],
    },
  },
]

export const financialCashSettlementColumn = [
  { title: '流水号', dataIndex: 'serialNumber', width: 140 },
  { title: '业务订单号', dataIndex: 'businessNumber', width: 200 },
  { title: '创建时间', dataIndex: 'createTime', width: 200 },
  { title: '业务类型', dataIndex: 'businessType', width: 140 },
  { title: '金额', dataIndex: 'amount', width: 100 },
  { title: '收款人', dataIndex: 'payee', width: 100 },
  { title: '卡号', dataIndex: 'card', width: 200 },
  { title: '银行名称', dataIndex: 'bankName', width: 120 },
  { title: '打款状态', dataIndex: 'paymentStatus', width: 120 },
  { title: '结果状态', dataIndex: 'resultStatus', width: 120 },
]