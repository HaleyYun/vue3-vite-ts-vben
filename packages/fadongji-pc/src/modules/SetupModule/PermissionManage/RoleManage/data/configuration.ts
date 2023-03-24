import { FormSchema } from '/@/components/Form'
export const filterFormSchemas: FormSchema[] = [
    {
        field: 'name',
        component: 'Input',
        label: '角色名称',
        componentProps: {
            placeholder: '请输入角色名称',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'status',
        component: 'Select',
        label: '角色状态',
        componentProps: {
            placeholder: '请选择角色状态',
            options: [
                {
                    label: '启用',
                    value: '1',
                    key: '1',
                },
                {
                    label: '禁用',
                    value: '0',
                    key: '0',
                },
            ],
        },
    },
];

export const tableColumns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: '60px',

    },
    {
        title: '角色名称',
        dataIndex: 'name',
        width: '180px',
    },
    {
        title: '角色描述',
        dataIndex: 'remark',
        width: '150px',
        ellipsis: true,
    },
    {
        title: '角色状态',
        dataIndex: 'isDisabled',
        width: '80px',
    },
    {
        title: '操作人',
        dataIndex: 'modifierName',
        width: '100px',
    },
    {
        title: '提交时间',
        dataIndex: 'createTime',
        width: '130px',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '150px',
        fixed: 'right',
    },
]

export const sensitiveColumns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: '10px',

    },
    {
        title: '字段描述',
        dataIndex: 'columnDesc',
        width: '20px',
    },
    {
        title: '脱敏方向',
        dataIndex: 'directionDesc',
        width: '20px',
    },
    {
        title: '脱敏起始位数',
        dataIndex: 'startIndex',
        width: '20px',
    },
    {
        title: '脱敏字符数',
        dataIndex: 'wordNum',
        width: '20px',
    },
    {
        title: '是否脱敏',
        dataIndex: 'status',
        width: '20px',
    },
]

