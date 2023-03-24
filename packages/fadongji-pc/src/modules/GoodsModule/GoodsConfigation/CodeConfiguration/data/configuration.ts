import { FormSchema } from '/@/components/Form'
import { getGoodsSelectOne } from '/@/api/data/ModelFormApis'


export const filterFormSchemas: FormSchema[] = [
    {
        field: 'modelName',
        component: 'Input',
        label: '型号',
        componentProps: {
            placeholder: '请输入关键字搜索',
            onChange: (e) => {
                console.log(e)
            },
        },
    },

];

export const tableColumns = [
    {
        title: '型号',
        dataIndex: 'modelName',
        width: '180px',

    },
    {
        title: '编码',
        dataIndex: 'modelCode',
        width: '180px',
    },
]

export const operationColumn = [
    {
        title: '操作',
        dataIndex: 'operation',
        width: '150px',
        fixed: 'right',
    },
]
