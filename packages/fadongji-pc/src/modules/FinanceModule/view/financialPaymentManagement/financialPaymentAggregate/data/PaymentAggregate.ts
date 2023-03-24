import { FormSchema } from '/@/components/Form'
import { DescItem } from '/@/components/Description/index';
export const filterPaymentAggregateForm: FormSchema[]  = [
  {
    field: 'orderNumber',
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
    field: 'customerName',
    component: 'Input',
    label: '客户名称',
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
    field: 'userName',
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
]

export const PaymentAggregateColumn = [
  {
    title: '支付流水号',
    dataIndex: 'serialNumber',
    width: 140,
  },
  {
    title: '业务订单号',
    dataIndex: 'orderNumber',
    width: 140,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '用户编号',
    dataIndex: 'userNumber',
    width: 120,
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    width: 200,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 140,
  },{
    title: '订单金额',
    dataIndex: 'orderAmount',
    width: 120,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
  },
  {
    title: '现金支付',
    dataIndex: 'cashPayment',
    width: 160,
  },
  {
    title: '账期支付',
    dataIndex: 'paymentInPeriod',
    width: 160,
    align: 'center',
  },
  {
    title: '活动优惠',
    dataIndex: 'eventOffers',
    width: 140,
  },
  {
    title: '券优惠',
    dataIndex: 'couponDiscount',
    width: 140,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
  },
  {
    title: '支付时间',
    dataIndex: 'payTime',
    width: 200,
  },
  {
    title: '详情',
    dataIndex: 'action',
    width: 60,
    fixed: 'right'
  }
]

export const PaymentAggregateBaseSchema: DescItem[] = [
  {
    field: 'payOrderNumber',
    label: '支付订单号',
  },
  {
    field: 'businessOrderNumber',
    label: '业务订单号',
  },
  {
    field: 'type',
    label: '类型',
  },
  {
    field: 'status',
    label: '状态',
  },
  {
    field: 'orderAmount',
    label: '订单金额',
  },
];

export const PaymentAggregateCaseSchema: DescItem[] = [
  {
    field: 'smallOrderNumber',
    label: '小订单号',
  },
  {
    field: 'supplierNumber',
    label: '供应商编号',
  },
  {
    field: 'supplierName',
    label: '供应商名称',
  },
  {
    field: 'activityReceive',
    label: '活动收入',
  },
  {
    field: 'cardReceive',
    label: '卡券收入',
  },
  {
    field: 'accountingPeriodReceive',
    label: '账期收入',
  },
  {
    field: 'caseReceive',
    label: '现金收入',
  },
  {
    field: 'realReceive',
    label: '实收',
  },
  {
    field: 'drawCommissionReceive',
    label: '抽佣',
  },
  {
    field: 'platformDrawCommission',
    label: '平台抽佣',
  },
  {
    field: 'logisticsDrawCommission',
    label: '物流抽佣',
  },
  {
    field: 'warehouseDrawCommission',
    label: '仓库收入',
  },
];



