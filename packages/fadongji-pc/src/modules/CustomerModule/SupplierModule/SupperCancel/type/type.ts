import { reactive } from 'vue'
// "供应商注销" -- 查询条件
interface searchItem {
    id: string
    label?: string
    value?: string
    placeHolder?: string
    slot?: ''
}
export const cancelSearchData = reactive<searchItem[]>([
    {
        id: 'cancelOne',
        label: '供应商名称：',
        value: '',
        placeHolder: '请输入供应商名称',
    },
    {
        id: 'cancelTwo',
        label: '手机号：',
        value: '',
        placeHolder: '请输入手机号',
    },
    // {   id: 'cancelThree',
    //     value: '',
    //     slot: ''
    // },
])
// "供应商注销" -- table column
interface slotsItem {
    customRender: string
}
interface tableItem {
    title: string
    dataIndex: string
    align: string
    width?: string
    slots?: slotsItem
    fixed?: string
}

export const supperCancelColumn = reactive<tableItem[]>([
    {
        title: '供应商名称',
        dataIndex: 'supperName',
        align: 'center',
        width: '300px',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        align: 'center',
        width: '150px',
    },
    {
        title: '地区',
        dataIndex: 'area',
        align: 'center',
        width: '15%',
    },
    {
        title: '账号状态',
        dataIndex: 'userNameStatus',
        align: 'center',
        width: '120px',
    },
    {
        title: '认证状态',
        dataIndex: 'registerStatus',
        align: 'center',
        width: '120px',
    },
    {
        title: '店铺名称',
        dataIndex: 'shopName',
        align: 'center',
        width: '15%',
    },
    {
        title: '渠道经理',
        dataIndex: 'channelManager',
        width: '120px',
        align: 'center',
    },
    {
        title: '等级',
        dataIndex: 'rate',
        align: 'center',
        width: '50px',
    },
    {
        title: '用户来源',
        dataIndex: 'usersSource',
        align: 'center',
        width: '140px',
    },
    {
        title: '申请注销时间',
        dataIndex: 'cancellationTime',
        align: 'center',
        width: '210px',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: '140px',
        slots: { customRender: 'operation' },
        fixed: 'right',
    },
])

/* "注销申请" - 弹框 */
export const applyCancellationModalData = reactive([
    { label: '申请理由', value: '不做供应商了', isText: '' },
    { label: '描述', value: '相关描述的说明，文本描述说明', isText: '' },
    { label: '图片', value: '相关描述的说明，文本描述说明' },
    { label: '处理结果', value: '', arr: [1, 2] },
    { label: '处理结果', value: '' },
])
