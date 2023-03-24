import { DescItem } from '/@/components/Description'

export const PaymentAggregateTableMockData = [
  {
    id: '100000000000001',
    serialNumber: '1213113131',
    orderNumber: 'A00001',
    createTime: '2021-09-12 12:00:00',
    userNumber: '000011',
    userName: '张三服务商',
    phone: '1509018900',
    orderAmount: '300.00',
    type: '支付',
    cashPayment: '70.00',
    paymentInPeriod: '200.00',
    eventOffers: '10',
    couponDiscount: '200',
    status: '已支付',
    payTime: '2021-09-12 12:00:00',
  },
  {
    id: '100000000000002',
    serialNumber: '1213113131',
    orderNumber: 'A00001',
    createTime: '2021-09-12 12:00:00',
    userNumber: '000012',
    userName: '张三代理商',
    phone: '150902118900',
    orderAmount: '300.00',
    type: '退款',
    cashPayment: '200',
    paymentInPeriod: '2030',
    eventOffers: '100',
    couponDiscount: '2',
    status: '未支付',
    payTime: '2021-09-12 12:00:00',
  },
]

export const boxMockData = [
  {
    title: '现金支付金额',
    cash: '34567.80',
    time: '2020.01.01---2020.01.05',
  },
  {
    title: '账期支付金额',
    cash: '34567.80',
    time: '2020.01.01---2020.01.05',
  },
  {
    title: '活动支付金额',
    cash: '34567.80',
    time: '2020.01.01---2020.01.05',
  },
  {
    title: '卡券支付金额',
    cash: '34567.80',
    time: '2020.01.01---2020.01.05',
  },
  {
    title: '还款金额',
    cash: '34567.80',
    time: '2020.01.01---2020.01.05',
  },
]

export const PaymentAggregateMockData = {
  payOrderNumber: '发动机系列 > 发动机',
  businessOrderNumber: '发动机系列 > 发动机',
  type: '商品品牌',
  status: '浙江省杭州市西湖区万塘路18号',
  orderAmount: 'B15荣光',
};
export const PaymentAggregateCaseMockData = {
  smallOrderNumber: '11111111111111',
  supplierNumber: '000001',
  supplierName: '零配件加工有限公司',
  activityReceive: '￥ 30.00',
  cardReceive: '￥ 50.00',
  accountingPeriodReceive: '￥ 50.00',
  caseReceive: '￥ 50.00',
  realReceive: '￥ 50.00',
  drawCommissionReceive: '￥ 50.00',
  platformDrawCommission: '￥ 50.00',
  logisticsDrawCommission: '￥ 50.00',
  warehouseDrawCommission: '￥ 50.00',

}


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