import { FormSchema } from '/@/components/Form'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '结算单号',
    componentProps: {
      placeholder: '请输入结算单号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'type',
    component: 'Select',
    label: '业务类型',
    componentProps: {
      // 订单业务类型,0.主订单 11.销售订单(order_sell)，12.投资订单(order_invest)，
      // 13.旧机订单(order_refund)31:售后上门订单 32:安装订单单 33:回收订单
      options: [
        { label: '全部', value: null },
        { label: '销售订单', value: 11 },
        { label: '投资订单', value: 12 },
        { label: '旧机订单', value: 13 },
      ],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'platformCode',
    component: 'Select',
    label: '客户角色',
    componentProps: {
      placeholder: '请选择',
      options: [
        {
          label: '供应商',
          value: 'supplier',
        },
        {
          label: '服务商',
          value: 'agent',
        },
        {
          label: '回收公司',
          value: 'recycling',
        },
      ],

      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'companyName',
    component: 'Input',
    label: '客户名称',
    componentProps: {
      placeholder: '请输入客户名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: ' 生成日期',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'settlementTime',
    label: ' 结算日期',
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
    title: '结算单号',
    dataIndex: 'id',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '业务类型',
    dataIndex: 'type',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '客户角色',
    dataIndex: 'platformName',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '客户名称',
    dataIndex: 'companyName',
    width: '100px',
  },
  {
    title: '结算金额',
    dataIndex: 'amount',
    width: '120px',
  },
  {
    title: '结算状态',
    dataIndex: 'status',
    width: '120px',
  },
  {
    title: '生成时间',
    dataIndex: 'createTime',
    width: '180px',
    ellipsis: true,
  },
  {
    title: '结算时间',
    dataIndex: 'billTime',
    width: '180px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
]

// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    userNumber: '1568888888',
    statement_no: 'TL358231682',
    business_types: '销售订单',
    customer_role: '供应商',
    customer_name: '江陵动力发动机',
    settlement_amount: '7000.00元',
    settlement_statusStr: '已结算',
    settlement_status: 1,
    id: '127393772820292',
    createTime: '2022-03-28 11:11:11',
    settlementTime: '2022-03-28 11:11:11',
  },
  {
    userNumber: '1568888888',
    statement_no: 'TL358231682',
    id: '1568888888829938829',
    business_types: '销售订单',
    customer_role: '供应商',
    customer_name: '江陵动力发动机',
    settlement_amount: '7000.00元',
    settlement_statusStr: '结算异常',
    settlement_status: 2,
    createTime: '2022-03-28 11:11:11',
    settlementTime: '2022-03-28 11:11:11',
  },
]
