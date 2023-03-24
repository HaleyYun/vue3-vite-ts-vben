//仅退款待审核
const basisData = [
  {
    title: '服务单号',
    key: 'id',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '关联订单编号',
    key: 'oriOrderId',
  },
  {
    title: '申请时间',
    key: 'createTime',
  },
  {
    title: '用户账号',
    key: 'userName',
  },
  {
    title: '联系人',
    key: 'name',
  },
  {
    title: '退换货类型',
    key: 'isRefundOnly',
  },
  {
    title: '退款原因',
    key: 'reason',
  },
  {
    title: '描述',
    key: 'remark',
  },
  {
    title: '凭证照片',
    key: 'refundPic',
  },
  {
    title: '退款金额',
    key: 'amount',
  },
  {
    title: '确认退款金额',
    key: 'amount',
  },
  {
    title: '退款方式',
    key: 'status',
  },
  {
    title: '处理备注',
    key: 'operateRemark',
  },
]
//仅退款待退款
const ReturnOnlyRefund = [
  {
    title: '服务单号',
    key: 'id',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '关联订单编号',
    key: 'oriOrderId',
  },
  {
    title: '申请时间',
    key: 'createTime',
  },
  {
    title: '用户账号',
    key: 'userName',
  },
  {
    title: '联系人',
    key: 'name',
  },
  {
    title: '退换货类型',
    key: 'isRefundOnly',
  },
  {
    title: '退款原因',
    key: 'reason',
  },
  {
    title: '描述',
    key: 'remark',
  },
  {
    title: '凭证照片',
    key: 'refundPic',
  },
  {
    title: '退款金额',
    key: 'amount',
  },
  {
    title: '确认退款金额',
    key: 'amount',
  },
  {
    title: '退款方式',
    key: 'status',
  },
  {
    title: '退款支付途径',
    key: 'status',
  },
  {
    title: '处理备注',
    key: 'operateRemark',
  },
]
//仅退款已完成
const OnlyRefundCompleted = [
  {
    title: '服务单号',
    key: 'id',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '关联订单编号',
    key: 'oriOrderId',
  },
  {
    title: '申请时间',
    key: 'createTime',
  },
  {
    title: '用户账号',
    key: 'userName',
  },
  {
    title: '联系人',
    key: 'name',
  },
  {
    title: '退换货类型',
    key: 'isRefundOnly',
  },
  {
    title: '退款原因',
    key: 'reason',
  },
  {
    title: '描述',
    key: 'remark',
  },
  {
    title: '凭证照片',
    key: 'refundPic',
  },
  {
    title: '退款金额',
    key: 'amount',
  },
  {
    title: '确认退款金额',
    key: 'amount',
  },
  {
    title: '退款方式',
    key: 'status',
  },
  {
    title: '退款支付途径',
    key: 'status',
  },
  {
    title: '退款时间',
    key: 'refundTime',
  },
  {
    title: '处理备注',
    key: 'operateRemark',
  },
] //仅退款已关闭
const RefundOnlyClosed = [
  {
    title: '服务单号',
    key: 'id',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '关联订单编号',
    key: 'oriOrderId',
  },
  {
    title: '申请时间',
    key: 'createTime',
  },
  {
    title: '用户账号',
    key: 'userName',
  },
  {
    title: '联系人',
    key: 'name',
  },
  {
    title: '退换货类型',
    key: 'isRefundOnly',
  },
  {
    title: '退款原因',
    key: 'reason',
  },
  {
    title: '描述',
    key: 'remark',
  },
  {
    title: '凭证照片',
    key: 'refundPic',
  },
  {
    title: '退款金额',
    key: 'amount',
  },
  {
    title: '处理备注',
    key: 'operateRemark',
  },
]
//退货退款待审核
const returnGoods = [
  {
    title: '服务单号',
    key: 'id',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '关联订单编号',
    key: 'oriOrderId',
  },
  {
    title: '申请时间',
    key: 'createTime',
  },
  {
    title: '用户账号',
    key: 'userName',
  },
  {
    title: '联系人',
    key: 'name',
  },
  {
    title: '退换货类型',
    key: 'isRefundOnly',
  },
  {
    title: '退款原因',
    key: 'reason',
  },
  {
    title: '描述',
    key: 'remark',
  },
  {
    title: '凭证照片',
    key: 'refundPic',
  },
  {
    title: '退款金额',
    key: 'amount',
  },
  {
    title: '确认退款金额',
    key: 'amount',
  },
  {
    title: '退款方式',
    key: 'status',
  },
  {
    title: '收货点',
    key: 'status',
  },
  {
    title: '收货人姓名',
    key: 'status',
  },
  {
    title: '收货地址',
    key: 'status',
  },
  {
    title: '联系电话',
    key: 'status',
  },
  {
    title: '处理备注',
    key: 'operateRemark',
  },
]
//退货退款已关闭
const returnClosed = [
  {
    title: '服务单号',
    key: 'id',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '关闭原因',
    key: 'status',
  },
  {
    title: '关联订单编号',
    key: 'oriOrderId',
  },
  {
    title: '申请时间',
    key: 'createTime',
  },
  {
    title: '用户账号',
    key: 'userName',
  },
  {
    title: '联系人',
    key: 'name',
  },
  {
    title: '退换货类型',
    key: 'isRefundOnly',
  },
  {
    title: '退款原因',
    key: 'reason',
  },
  {
    title: '描述',
    key: 'remark',
  },
  {
    title: '凭证照片',
    key: 'refundPic',
  },
  {
    title: '退款金额',
    key: 'amount',
  },
]
//退货退款待退款
const returnBeRefunded = [
  {
    title: '服务单号',
    key: 'id',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '关联订单编号',
    key: 'oriOrderId',
  },
  {
    title: '申请时间',
    key: 'createTime',
  },
  {
    title: '用户账号',
    key: 'userName',
  },
  {
    title: '联系人',
    key: 'name',
  },
  {
    title: '退换货类型',
    key: 'isRefundOnly',
  },
  {
    title: '退款原因',
    key: 'reason',
  },
  {
    title: '描述',
    key: 'remark',
  },
  {
    title: '凭证照片',
    key: 'refundPic',
  },
  {
    title: '退款金额',
    key: 'amount',
  },
  {
    title: '确认退款金额',
    key: 'amount',
  },
  // ----------------------
  {
    title: '退款方式',
    key: 'amount',
  },

  {
    title: '退款时间',
    key: 'refundTime',
  },
]
//退货退款退货信息展示
const letterList = [
  {
    title: '选择收货点',
    key: 'address',
  },
  {
    title: '收货人姓名',
    key: 'name',
  },
  {
    title: '收货地址',
    key: 'address',
  },
  {
    title: '联系电话',
    key: 'mobile',
  },
  {
    title: '处理备注',
    key: 'operateRemark',
  },
]
//退货退款物流发货
const logisticsList = [
  {
    title: '物流公司',
    key: 'deliveryCompany',
  },
  {
    title: '退货运单号',
    key: 'deliveryNum',
  },
  {
    title: '物流公司电话号码',
    key: 'deliveryMobile',
  },
  {
    title: '退货凭证',
    key: 'deliveryPic',
  },
]
//退货退款物流发货已完成
const logisticsComplete = [
  {
    title: '发货方式',
    key: 'deliveryType',
  },
  {
    title: '物流公司',
    key: 'deliveryCompany',
  },
  {
    title: '退货运单号',
    key: 'deliveryNum',
  },
  {
    title: '物流公司电话号码',
    key: 'deliveryMobile',
  },
  {
    title: '退货凭证',
    key: 'deliveryPic',
  },
  {
    title: '收货时间',
    key: 'receivingTime',
  },
]
export const orderRefund = {
  basisData,
  ReturnOnlyRefund,
  OnlyRefundCompleted,
  RefundOnlyClosed,
  returnGoods,
  returnClosed,
  returnBeRefunded,
  letterList,
  logisticsList,
  logisticsComplete,
}
