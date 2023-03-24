import { FormSchema } from '/@/components/Form'
export const filterFormSchemas: FormSchema[] = [
    {
        field: 'realName',
        component: 'Input',
        label: '真实姓名',
        componentProps: {
            placeholder: '请输入真实姓名',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'status',
        component: 'Select',
        label: '帐号状态',
        componentProps: {
            placeholder: '请选择帐号状态',
            options: [
                {
                    label: '启用',
                    value: 'false',
                    key: 'false',
                },
                {
                    label: '禁用',
                    value: 'true',
                    key: 'true',
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
        title: '账号',
        dataIndex: 'userName',
        width: '180px',
    },
    {
        title: '真实姓名',
        dataIndex: 'realName',
        width: '100px',
        ellipsis: true,
    },
    {
        title: '手机号',
        dataIndex: 'userName',
        width: '130px',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        width: '180px',
    },
    {
        title: '角色',
        dataIndex: 'roleName',
        width: '130px',
    },
    {
        title: '帐号状态',
        dataIndex: 'status',
        width: '130px',
    },
    {
        title: '操作人',
        dataIndex: 'creatorName',
        width: '130px',
    },
    {
        title: '提交时间',
        dataIndex: 'createTime',
        width: '150px',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '150px',
        fixed: 'right',
    },
]


