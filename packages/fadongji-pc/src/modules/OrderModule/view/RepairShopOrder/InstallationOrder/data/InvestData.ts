//基本信息
const baseData: any[] = [
    {
        title: '订单编号',
        key: 'id',
    },
    {
        title: '服务名称',
        key: 'supportName',
    },
    {
        title: '服务价格',
        key: 'supportAmount',
    },
    {
        title: '修理厂',
        key: '',
    },
    {
        title: '集师傅',
        key: '',
    },
    {
        title: '上门时间',
        key: '',
    },
    {
        title: '安装地址',
        key: 'activityDetail',
    },
    {
        title: '关联购买订单',
        key: '',
    },
    {
        title: '订单来源',
        key: 'shopName',
    },
    {
        title: '支付方式',
        key: 'tag',
    },
    // {
    //     title: '发票信息',
    //     key: 'tag',
    // },
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
    assignColumns,
    serverData,
    evaluateData,
    profitData,
}