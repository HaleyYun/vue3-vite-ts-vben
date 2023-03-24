import { FormSchema } from '/@/components/Form'
import { getBrandFunc } from '/@/modules/ContentModule/api/basicFormApis'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'detailType',
    component: 'Select',
    label: '业务类型',
    componentProps: {
      placeholder: '请输入业务类型',
      // 明细类型（0.未知；1.提现；2.货款；3.投资收益；4.拓客收益；5.仓储费用；6.提现失败退回）
      options: [
        {
          label: '提现',
          value: 1,
        },
        {
          label: '卖货收益',
          value: 2,
        },
        {
          label: '投资收益',
          value: 3,
        },
        {
          label: '拓客收益',
          value: 4,
        },
        {
          label: '仓储费用',
          value: 5,
        },
        {
          label: '提现失败退回',
          value: 6,
        },
        {
          label: '退款',
          value: 9,
        },
      ],
      onChange: (e) => {
        console.log(e)
      },
    },
  },
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
]

export const tableColumns = [
  {
    title: '动账类型',
    dataIndex: 'amountType',
    width: '100px',
  },
  {
    title: '业务类型',
    dataIndex: 'detailType',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '金额（元）',
    dataIndex: 'amount',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    width: '150px',
    ellipsis: true,
  },
]

// 这是mock 数据以后对接口会删掉
export const mockTableData = [
  {
    id: 1,
    actingType: '支',
    businessTypes: '提现',
    amount: '10000',
    time: '2022-12-23 12:00:00',
    balance: '23992',
  },
]
