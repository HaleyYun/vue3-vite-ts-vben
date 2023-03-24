import { FormSchema } from '/@/components/Form'


export const filterFormSchemas: FormSchema[] = [
  {
    field: 'tradeType',
    component: 'Select',
    label: '支付类型',
    componentProps: {
      options: [{ label: '全部', value: '' }, { label: '付款', value: 1 }, { label: '退款', value: 2 }],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'serialNumber',
    component: 'Input',
    label: '流水号',
    componentProps: {
      placeholder: '流水号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: ' 支付日期',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      }
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '客户手机号',
    componentProps: {
      placeholder: '客户手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },


];


export const tableColumns = [
  {
    title: '流水号',
    dataIndex: 'serialNumber',
    width: '220px',
  },
  {
    title: '支付类型',
    dataIndex: 'tradeTypeName',
    width: '120px',
  },
  {
    title: '客户手机号',
    dataIndex: 'userName',
    width: '120px',
  },
  {
    title: '支付金额',
    dataIndex: 'cashAmount',
    width: '100px',
  },
  {
    title: '支付方式',
    dataIndex: 'payTypeName',
    width: '110px',

  },
  {
    title: '支付时间',
    dataIndex: 'payTime',
    width: '180px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
];

// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    userNumber: '1568888888',
    serialNumber: '2910022',
    PayTypeStr: '付款',
    payAmount: '+7000.00元',
    payModel: '支付宝支付',
    createTime: '2022-03-28 11:11:11'
  },
  {
    userNumber: '1568888888',
    serialNumber: '2910022',
    PayTypeStr: '付款',
    payAmount: '+7000.00元',
    payModel: '支付宝支付',
    createTime: '2022-03-28 11:11:11'
  }
];
