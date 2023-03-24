import { FormSchema } from '/@/components/Form'


export const filterFormSchemas: FormSchema[] = [
    {
        field: 'userName',
        component: 'Select',
        label: '所属角色',
        componentProps: {
            placeholder: '请选择角色',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'shortName',
        component: 'Input',
        label: '内容名称',

        componentProps: {
            placeholder: '请输入内容名称',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'searchTime',
        label: '修改时间',
        component: 'RangePicker',
        componentProps: {
            placeholder: ['开始时间', '结束时间'],
            style: {
                width: '100%',
            },
        },
    },

]
export const classFormSchemas: FormSchema[] = [
    {
        field: 'userName',
        component: 'Select',
        label: '所属角色',
        componentProps: {
            placeholder: '请选择角色',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'shortName',
        component: 'Select',
        label: '分类名称',

        componentProps: {
            placeholder: '请选择',
            onChange: (e) => {
                console.log(e)
            },
        },
    },


]

/**
 *@desc 改变状态 table Column 配置
 */
export const tableColumns = [
    {
        title: '所属角色',
        dataIndex: 'platformCode',
        width: '140px',
    },
    {
        title: '类型',
        dataIndex: 'categoryName',
        width: '180px',
    },
    {
        title: '内容名称',
        dataIndex: 'name',
        width: '250px',
    },
    {
        title: '修改时间',
        dataIndex: 'updateTime',
        width: '120px',
    },
    {
        title: '调拨数量',
        dataIndex: 'duration',
        width: '100px',
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
        id: 29903,
        shortName: '长葛姜天龙',
        status: 1,
        userName: '1568888888',
        shopName: '长葛某某汽修',
        statusStr: '正常',
        checkStatusStr: '已认证',
        logoffStatusStr: '待审核',
        level: 'LV5',
        createTime: '2022-03-28 11:11:11'
    }
];




