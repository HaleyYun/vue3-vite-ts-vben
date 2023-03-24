import { FormSchema } from '/@/components/Form'


export const filterFormSchemas: FormSchema[] = [
  {
    field: 'orderId',
    component: 'Input',
    label: '回收订单',
    componentProps: {
      placeholder: '回收订单',
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
      options: [{ label: '全部', value: '' }, { label: '未收款', value: 1 }, { label: '已收款', value: 2 },],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: '支付日期',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      }
    },
  },


];


export const tableColumns = [
  {
    title: '流水号',
    dataIndex: 'serialNo',
    width: '120px',
  },
  {
    title: '回收订单',
    dataIndex: 'OrderNumber',
    width: '150px',
  },
  {
    title: '状态',
    dataIndex: 'orderStatusName',
    width: '150px',
  },
  {
    title: '支付金额',
    dataIndex: 'refundAmount',
    width: '120px',

  },
  {
    title: '支付时间',
    dataIndex: 'createTime',
    width: '180px',
  },
  {
    title: '收款人',
    dataIndex: 'relationType',
    width: '100px',
  },
  {
    title: '垫付台账',
    dataIndex: 'isSettlement',
    width: '100px',
  },
  {
    title: '还款状态',
    dataIndex: 'status',
    width: '100px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '160px',
    fixed: 'right',
  },
];

