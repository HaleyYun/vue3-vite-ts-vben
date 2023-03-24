// "供应商资产" -- 查询条件
import { reactive } from 'vue'
interface searchItem {
    id: string
    label?: string
    value?: string
    placeHolder?: string
    slot?: ''
}
export const propertySearchData = reactive<searchItem[]>([
    {
        id: 'supperOne',
        label: '供应商名称：',
        value: '',
        placeHolder: '请输入供应商名称',
    },
    {
        id: 'supperTwo',
        label: '供应商手机号：',
        value: '',
        placeHolder: '请输入手机号',
    },
    {
        id: 'supperThree',
        label: '供应商等级：',
        value: '',
        placeHolder: '请选择供应商等级',
    },
    {
        id: 'supperFour',
        label: '供应商运营：',
        value: '',
        placeHolder: '请选择供应商等级',
    },
    // {   id: 'supperFive',
    //     value: '',
    //     slot: ''
    // },
])

// 供应商资产 -- column table项
interface slotsItem {
    customRender: string
}
interface propertyColumnItem {
    title: string
    dataIndex: string
    align: string
    width?: string
    slots?: slotsItem
    fixed?: string
}

export const supperPropertyColumn = reactive<propertyColumnItem[]>([
    {
        title: '供应商ID',
        dataIndex: 'supperId',
        align: 'center',
        width: '140px',
    },
    {
        title: '供应商名称',
        dataIndex: 'supperName',
        align: 'center',
        width: '200px',
    },
    {
        title: '供应商手机号',
        dataIndex: 'phone',
        align: 'center',
        width: '15%',
    },
    {
        title: '等级',
        dataIndex: 'rate',
        align: 'center',
        width: '120px',
    },
    {
        title: '积分',
        dataIndex: 'integral',
        align: 'center',
        width: '120px',
    },
    {
        title: '成长值',
        dataIndex: 'growthValue',
        align: 'center',
        width: '120px',
    },
    {
        title: '保证金',
        dataIndex: 'bond',
        width: '200px',
        align: 'center',
    },
    {
        title: '账户余额',
        dataIndex: 'accountBalance',
        align: 'center',
        width: '200px',
    },
    {
        title: '供应商渠道经理',
        dataIndex: 'supplierChannelManager',
        align: 'center',
        width: '140px',
    },
    {
        title: '明细',
        dataIndex: 'operation',
        align: 'center',
        width: '140px',
        slots: { customRender: 'operation' },
        fixed: 'right',
    },
])
