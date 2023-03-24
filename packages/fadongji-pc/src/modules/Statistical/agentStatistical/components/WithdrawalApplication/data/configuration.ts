import { FormSchema } from '/@/components/Form'
import {getBrandFunc } from '/@/modules/ContentModule/api/basicFormApis'



export const filterFormSchemas: FormSchema[] = [
  {
    field: 'searchTime',
    label: '日期',
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
    title: '提交时间',
    dataIndex: 'createTime',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '金额（元）',
    dataIndex: 'amount',
    width: '150px',
    ellipsis: true,
  },
  // {
  //   title: '结算状态',
  //   dataIndex: 'businessTypes',
  //   width: '150px',
  //   ellipsis: true,
  // },
  {
    title: '提现后帐户余额',
    dataIndex: 'allAmount',
    ellipsis: true,
    width: '150px',
  },
]

// 这是mock 数据以后对接口会删掉
export const mockTableData = [
  {
    id: 1,
    businessTypes:"待结算",
    amount:"10000",
    time:"2022-12-23 12:00:00",
    balance:'23992',
  },

];
