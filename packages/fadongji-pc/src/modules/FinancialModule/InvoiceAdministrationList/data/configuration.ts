import { FormSchema } from '/@/components/Form'

//待开发票
export const filterFormSchemas: FormSchema[] = [
  {
    field: 'applySellPhone',
    component: 'Input',
    label: '申请人手机号',
    componentProps: {
      placeholder: '申请人手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },



  {
    field: 'searchTime',
    label: '申请日期',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'invoiceKindCode',
    component: 'Select',
    label: '发票类型',
    componentProps: {
      options: [{ label: '电子普票', value: 1 }, { label: '电子专票', value: 2 }],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
];
//已开发票
export const alreadyFormSchemas: FormSchema[] = [
  {
    field: 'invoiceNo',
    component: 'Input',
    label: '发票号',
    componentProps: {
      placeholder: '请输入发票号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'sellerTel',
    component: 'Input',
    label: '申请人',
    componentProps: {
      placeholder: '请输入申请人',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'invoiceKindCode',
    component: 'Select',
    label: '发票类型',
    componentProps: {
      options: [{ label: '电子普票', value: 1 }, { label: '电子专票', value: 2 }],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: '开票日期',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },

];
//待开发票
export const tableColumns = [
  {
    title: '申请编号',
    dataIndex: 'id',
    width: '170px',
  },
  {
    title: '申请人',
    dataIndex: 'sellerTel',
    width: '120px',
  },
  {
    title: '开票类型',
    dataIndex: 'ownerTypeName',
    width: '90px',
  },
  {
    title: '发票抬头',
    dataIndex: 'sellerEnterpriseName',
    width: '210px',
  },
  {
    title: '纳税人识别号',
    dataIndex: 'sellerTaxpayerNum',
    width: '180px',
  },
  {
    title: '开票内容',
    dataIndex: 'billTypeName',
    width: '120px',
  },
  {
    title: '发票类型',
    dataIndex: 'invoiceKindName',
    width: '200px',
  },
  {
    title: '开票金额',
    dataIndex: 'amount',
    width: '100px',
  },
  {
    title: '开票时间',
    dataIndex: 'createTime',
    width: '180px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '120px',
    fixed: 'right',
  },
]

////已开发票
export const invoiceColumns = [
  {
    title: '订单号',
    dataIndex: 'orderId',
    width: '120px',
  },
  {
    title: '收票方',
    dataIndex: 'sellerName',
    width: '120px',
  },
  {
    title: '服务名称',
    dataIndex: 'billTypeName',
    width: '150px',
  },
  {
    title: '开票金额',
    dataIndex: 'amount',
    width: '100px',
  },
  {
    title: '发票状态',
    dataIndex: 'invoiceStatusName',
    width: '120px',
  },

]

//已开发票
export const alreadyColumns = [
  {
    title: '发票号',
    dataIndex: 'invoiceNo',
    width: '150px',
  },
  {
    title: '发票图片',
    dataIndex: 'picture',
    width: '300px',
  },
  {
    title: '申请编号',
    dataIndex: 'id',
    width: '190px',
  },
  {
    title: '申请人',
    dataIndex: 'sellerTel',
    width: '120px',
  },
  {
    title: '开票类型',
    dataIndex: 'ownerTypeName',
    width: '120px',
  },
  {
    title: '发票抬头',
    dataIndex: 'sellerEnterpriseName',
    width: '220px',
  },
  {
    title: '纳税人识别号',
    dataIndex: 'sellerTaxpayerNum',
    width: '180px',
  },
  {
    title: '开票内容',
    dataIndex: 'billTypeName',
    width: '150px',
  },
  {
    title: '发票类型',
    dataIndex: 'invoiceKindName',
    width: '190px',
  },
  {
    title: '开票金额',
    dataIndex: 'amount',
    width: '150px',
  },
  {
    title: '开票时间',
    dataIndex: 'invoiceTime',
    width: '180px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '120px',
    fixed: 'right',
  },
]
