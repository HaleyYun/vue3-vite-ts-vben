import { reactive } from 'vue'
interface searchItem {
    id: string
    label?: string
    value?: string
    slots?: string
    placeHolder?: string
}
export const operationBrandSearchData = reactive<searchItem[]>([
    {
        id: 'brandOne',
        label: '供应商名称：',
        value: '',
        placeHolder: '请输入供应商名称',
    },
    {
        id: 'brandTwo',
        label: '申请时间：',
        value: '',
        slots: '',
    },
    { id: 'brandThree', label: '启用状态：', value: '', slots: '' },
    // {   id: 'brandFour',
    //     value: '',
    //     slots: ''
    // },
])

export const brandTableColumnItem = [
    {
        title: '供应商名称',
        dataIndex: 'supperName',
        align: 'center',
        width: '20%',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        align: 'center',
        width: '210px',
    },
    {
        title: '申请品类',
        dataIndex: 'applyCategory',
        align: 'center',
        width: '28%',
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        width: '140px',
    },
    {
        title: '申请时间',
        dataIndex: 'applyDate',
        align: 'center',
        width: '210px',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        slots: { customRender: 'operation' },
        fixed: 'right',
    },
]
