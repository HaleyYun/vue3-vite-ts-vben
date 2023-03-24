import { FormSchema } from '/@/components/Form'
import {getBrandFunc } from '/@/modules/ContentModule/api/basicFormApis'



export const filterFormSchemas: FormSchema[] = [
  {
    field: 'searchTime',
    label: '查询方式',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
];

export const tableColumns = [
  {
    title: '订单编号',
    dataIndex: 'id',
    width: '100px'
  },
  {
    title: '订单金额（元）',
    dataIndex: 'orderAmount',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '还款时间',
    dataIndex: 'expireTime',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '还款状态',
    dataIndex: 'repaymentStatusName',
    ellipsis: true,
    width: '150px',
  },
]

// 这是mock 数据以后对接口会删掉
export const mockTableData = [
  {
    order_no: '2002923883',
    paymentStatus: '未还款',
    amount:"10000",
    time:"2022-12-23 12:00:00",
  },

];
