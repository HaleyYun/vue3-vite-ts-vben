import { FormSchema } from '/@/components/Form'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'searchTime',
    label: '时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },

  {
    field: 'shop',
    component: 'ApiSelect',
    label: '主修车系',
    componentProps: {
      options: [],
      placeholder: '请选择车系',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'lavel',
    component: 'ApiSelect',
    label: '等级',
    componentProps: {
      options: [],
      placeholder: '请选择集师傅等级',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
export const assignFormSchemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '订单编号',
    componentProps: {
      placeholder: '订单编号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'goodsName',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'searchTime',
    label: '下单时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'shopName',
    component: 'Input',
    label: '卖家',
    componentProps: {
      placeholder: '卖家名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'buyerName',
    component: 'Input',
    label: '买家',
    componentProps: {
      placeholder: '买家名称/手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'expect',
    component: 'Input',
    label: '逾期天数',
    slot: 'DayInput',
    componentProps: {
      placeholder: '逾期天数',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const getTableColumns = (goodsLength) => {
  const customCell = (_, index) => {
    console.log(index, goodsLength)
    if (index == 0 && goodsLength && goodsLength >= 1) {
      return { rowSpan: goodsLength }
    } else {
      return { rowSpan: 0 }
    }
  }
  const column = [
    {
      title: '商品名称',
      dataIndex: 'goods',
      colSpan: 0,
      width: '15%',
    },
    {
      title: '商品价格/商品数量',
      dataIndex: 'unit_price',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '总金额',
      dataIndex: 'amount_of',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '卖家',
      dataIndex: 'shopName',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '买家',
      dataIndex: 'buyers',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '应还款日期',
      dataIndex: 'repayment',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '逾期天数',
      dataIndex: 'expectDay',
      width: '10%',
      customCell: customCell,
    },

    {
      title: '订单状态',
      dataIndex: 'statusName',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
      customCell: customCell,
    },
  ]
  return column
}
export const tableColumns = [
  {
    title: '商品名称',
    dataIndex: 'goods',
    width: '15%',
  },
  {
    title: '商品价格/商品数量',
    dataIndex: 'unit_price',
    width: '10%',
  },
  {
    title: '总金额',
    dataIndex: 'amount_of',
    width: '10%',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '10%',
  },
  {
    title: '买家',
    dataIndex: 'buyers',
    width: '10%',
  },
  {
    title: '应还款日期',
    dataIndex: 'repayment',
    width: '15%',
  },
  {
    title: '逾期天数',
    dataIndex: 'expectDay',
    width: '10%',
  },

  {
    title: '订单状态',
    dataIndex: 'statusName',
    width: '10%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
]
