import { FormSchema } from '/@/components/Form'
export const filterFormSchemas: FormSchema[] = [
    {
        field: 'name',
        component: 'Input',
        label: '权限树名称',
        componentProps: {
            placeholder: '请输入名称',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
];

export const tableColumns = [

    {
        title: '权限树名称',
        dataIndex: 'name',
        width: '180px',
    },
    {
        title: '类型',
        dataIndex: 'resourceTypeName',
        width: '80px',
        ellipsis: true,
    },
    {
        title: '路由',
        dataIndex: 'url',
        width: '150px',
    },
    {
        title: '组件',
        dataIndex: 'component',
        width: '180px',
    },
    {
        title: 'API',
        dataIndex: 'perms',
        width: '180px',
    },
    {
        title: '图标',
        dataIndex: 'icon',
        width: '80px',
    },
    {
        title: '排序',
        dataIndex: 'seq',
        width: '80px',
    },
    {
        title: '是否启用',
        dataIndex: 'status',
        width: '80px',
    },
    {
        title: '是否显示',
        dataIndex: 'visible',
        width: '80px',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '150px',
        fixed: 'right',
    },
]


