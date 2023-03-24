import { FormSchema } from '/@/components/Form'
export const filterNewInvoicingForm: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '申请人名称',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入申请人',
      onChange: (e) => {
        console.log(e)
      },
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
    field: '[startTime, endTime]',
    label: '申请日期',
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
    field: 'type',
    component: 'Select',
    label: '发票类型',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请选择发票类型',
      options: [
        {
          label: '发票1',
          value: '1',
        },
        {
          label: '发票2',
          value: '2',
        },
      ],
    },
  },
]

// 新增发票___ 详情-- 基本发票信息
export const baseInvoicingInformationColumn =  [
  {
    title: '发票类型',
    dataIndex: 'code',
    align: 'center',
    width: 200
  },
  {
    title: '单位名称',
    dataIndex: 'seller',
    align:'center'
  },
  {
    title: '纳税人识别号',
    dataIndex: 'creator',
    align: 'center',
    width: 160
  },
  {
    title: '注册地址',
    dataIndex: 'submitterTime',
    align:'center',
  },
  {
    title: '注册电话',
    dataIndex: 'submitterTime',
    align:'center',
    width: 180
  },
  {
    title: '开户银行',
    dataIndex: 'submitterTime',
    align:'center',
    width: 200
  },
  {
    title: '银行账号',
    dataIndex: 'submitterTime',
    align:'center',
    width: 200
  },
  {
    title: '发票内容',
    dataIndex: 'submitterTime',
    align:'center',
    width: 240
  },
];

// 新增发票___ 详情-- 基本发票信息
export const InvoicingReceiverInformationColumn =  [
  {
    title: '联系电话',
    dataIndex: 'phone',
    align: 'center',
    width: 200
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align:'center',
    width: 300
  },
  {
    title: '收件人姓名',
    dataIndex: 'Receiver',
    align: 'center',
    width: 160
  },
  {
    title: '收件人地址',
    dataIndex: 'address',
    align:'center',
  },
];
// 新增发票___ 详情--  供应商信息
export const supplierInformationColumn = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center',
    width: 300
  },
  {
    title: '名称',
    dataIndex: 'name',
    align:'center',
    width: 100
  },
  {
    title: '账号',
    dataIndex: 'account',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    align:'center',
    width: 200
  },
]