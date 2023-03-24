import {reactive} from "vue";

export const manualUseData = reactive([
    {
        id: 0,
        label: '所属角色',
        value: '',
        slot: 'slot',
        placeholderText: '请输入所属角色',
        slots: { customRender: 'role' },
        isSelect: true,
    },
    {
        id: 1,
        label: '内容名称',
        value: '',
        placeholderText: '请输入内容名称',
        name: 'roles',
    },
    {
        id: 2,
        label: '修改时间',
        value: '',
        slot: 'slot',
        slots: { customRender: 'changeDate' },
    },
    {
        id: 3,
        name: '查询',
        slot: 'slot',
        slots: { customRender: 'search' },
    },
])

// 招商手册
export const HelpCenterTableColumn = [
    {
        title: '所属角色',
        dataIndex: 'role',
        align: 'center',
        width: '15%'
    },
    {
        title: '类型',
        dataIndex: 'type',
        align: 'center',
        width: '15%'
    },
    {
        title: '内容名称',
        dataIndex: 'contentName',
        align: 'center',
        width: '30%'
    },
    {
        title: '上线',
        dataIndex: 'tag',
        align: 'center',
        slots: { customRender: 'onLine' },
    },
    {
        title: '热门',
        dataIndex: 'hot',
        align: 'center',
        slots: { customRender: 'hot' },
    },
    {
        title: '修改时间',
        dataIndex: 'changeDate',
        align: 'center',
        width: '160px'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: '160px',
        slots: { customRender: 'operation' },
    },
]

// 招商手册 -- 编辑
export const manualUseEditFormData = reactive([
    {
        label: '所属角色',
        value: '',
        isPlaceHolder: '请选择角色',
        id: 'manual_001',
        isSelect: true,
    },
    {
        label: '协议名称',
        value: '',
        id: 'manual_002',
        isInput: true,
    },
    {
        label: '协议内容',
        value: '',
        id: 'manual_003',
        isEditMachine: true
    },
])
