//基本信息
const baseData: any[] = [
    {
        title: '订单编号',
        dataIndex: 'orderId',
        width: '180px',
        ellipsis: true,
    },
    {
        title: '服务名称',
        dataIndex: 'supportName',
        ellipsis: true,
        width: '200px',
    },
    {
        title: '回收价格',
        dataIndex: 'supportAmount',
        width: '90px',
        ellipsis: true,
    },
    {
        title: '修理厂',
        dataIndex: 'buyerName',
        width: '180px',
    },
    {
        title: '集师傅',
        dataIndex: 'masterName',
        width: '120px',
    },
    {
        title: '上门时间',
        dataIndex: 'homeStartTime',
        width: '150px',
        ellipsis: true,
    },
    {
        title: '回收地址',
        dataIndex: 'orderAddressVO',
        width: '300px',
        // ellipsis: true,
    },
    {
        title: '关联购买订单',
        dataIndex: 'relationOrderId',
        width: '150px',
        ellipsis: true,
    },
]

//查看日志
const handleColumns = [
    {
        title: '操作人名称',
        dataIndex: 'userName',
    },
    {
        title: '操作人账号',
        dataIndex: 'phone',
    },
    {
        title: '操作时间',
        dataIndex: 'createTime',
        width: '280px',
    },
    {
        title: '操作项',
        dataIndex: 'actionItem',
    },
    {
        title: '订单状态',
        dataIndex: 'statusEvent',
    },
    {
        title: '备注',
        dataIndex: 'remark',
    },
]
//指派数据
const assignColumns = [
    {
        title: '姓名',
        dataIndex: 'realName',
    },
    {
        title: '手机号',
        dataIndex: 'userName',
        width: '180px',
    },
    {
        title: '服务技能',
        dataIndex: 'initials',
    },
    {
        title: '接单状态',
        dataIndex: 'status',
    },
    {
        title: '主修车系',
        dataIndex: 'carSeries',
    },
    {
        title: '等级',
        dataIndex: 'levelId',
    },
    {
        title: '距离修理厂',
        dataIndex: 'origin',
    },
    {
        title: '操作',
        dataIndex: 'operation',
    },
]
const serverData = [
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
        key: 'status',
    },
]
//物流信息
const logisticsData: any[] = [
    {
        title: '发货方式',
        dataIndex: 'deliveryType',
        width: '180px',
        ellipsis: true,
    },
    {
        title: '物流公司',
        dataIndex: 'company',
        ellipsis: true,
        width: '200px',
    },
    {
        title: '物流单号',
        dataIndex: 'waybill',
        width: '90px',
        ellipsis: true,
    },
    {
        title: '物流电话',
        dataIndex: 'logisticsMobile',
        width: '120px',
        ellipsis: true,
    },
    {
        title: '发货产品',
        dataIndex: 'shippingProducts',
        width: '120px',
    },
    {
        title: '发货凭证',
        dataIndex: 'shippingVoucher',
        width: '280px',
        ellipsis: true,
    },
]
//无感评价
const evaluateData: any[] = [
    {
        title: '问题',
        dataIndex: 'content',
        width: '180px',
        ellipsis: true,
    },
    {
        title: '回答',
        dataIndex: 'status',
        ellipsis: true,
        width: '200px',
    },
]
//分润信息
const profitData: any[] = [
    {
        title: '平台服务费',
        dataIndex: 'platform',
        width: '180px',
        ellipsis: true,
    },
    {
        title: '集师傅收益',
        dataIndex: 'master',
        ellipsis: true,
        width: '200px',
    },
]
export const orderRefund = {
    baseData,
    handleColumns,
    assignColumns,
    serverData,
    logisticsData,
    evaluateData,
    profitData,
}
