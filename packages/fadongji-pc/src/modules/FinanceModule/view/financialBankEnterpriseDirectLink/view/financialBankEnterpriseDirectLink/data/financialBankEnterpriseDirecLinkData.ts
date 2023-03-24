import { FormSchema } from '/@/components/Form'
export const filterBankEnterpriseDirectLinkDataForm: FormSchema[]  = [
  {
    field: 'orderNo',
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
    field: 'payeeName',
    component: 'Input',
    label: '收款人名称',
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
    field: 'type',
    component: 'Select',
    label: '类型',
    colProps: {
      span: 6,
    },
    componentProps: {
      options: [
        {
          label: '收入',
          value: '1',
        },
        {
          label: '支出',
          value: '2',
        },
      ],
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
    field: 'phone',
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
  {
    field: 'inOutDirection',
    component: 'Select',
    label: '收支方向',
    colProps: {
      span: 6,
    },
    componentProps: {
      options: [
        {
          label: '收入',
          value: '1',
        },
        {
          label: '支出',
          value: '2',
        },
      ],
    },
  },
]

export const BankEnterpriseDirectLinkColumn = [
  {
    title: '流水号',
    dataIndex: 'serialNumber',
    width: 140,
  },
  {
    title: '业务订单号',
    dataIndex: 'orderNumber',
    width: 140,
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '业务类型',
    dataIndex: 'businessType',
    width: 140,
  },
  {
    title: '收支方向',
    dataIndex: 'inOutput',
    width: 100,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: 100,
  },
  {
    title: '收款人',
    dataIndex: 'payee',
    width: 120,
  },
  {
    title: '卡号',
    dataIndex: 'card',
    width: 240,
  },
  {
    title: '银行名称',
    dataIndex: 'bankName',
    width: 250,
  },

]


