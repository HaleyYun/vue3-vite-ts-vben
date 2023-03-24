import { FormSchema } from '/@/components/Form'
import { getEvaluationStatus } from './EvaluationFormApis'


export const filterFormSchemas: FormSchema[] = [
    {
        field: 'id',
        component: 'Input',
        label: '服务单编号',
        componentProps: {
            placeholder: '服务单编号',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'supportName',
        component: 'Input',
        label: '服务名称',
        componentProps: {
            placeholder: '服务名称',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'buyerName',
        component: 'Input',
        label: '用户昵称',
        componentProps: {
            placeholder: '请输入用户昵称',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'masterId',
        component: 'ApiSearchSelect',
        label: '集师傅',
        componentProps: {
            api: getEvaluationStatus,
            placeholder: '请输入集师傅姓名',
        },
    },
    {
        field: 'searchTime',
        label: '评价时间',
        component: 'RangePicker',
        componentProps: {
            placeholder: ['开始时间', '结束时间'],
            style: {
                width: '100%',
            },
        },
    },

];


export const tableColumns = [
    {
        title: '服务单号',
        dataIndex: 'sourceId',
        width: '120px',
    },
    {
        title: '服务名称',
        dataIndex: 'supportName',
        width: '240px',
    },
    {
        title: '集师傅',
        dataIndex: 'masterName',
        width: '140px',
    },

    {
        title: '用户昵称',
        dataIndex: 'userName',
        width: '140px',
    },
    {
        title: '星级评价',
        dataIndex: 'starMark',
        width: '140px',
    },
    {
        title: '评价时间',
        dataIndex: 'createTime',
        width: '200px',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '120px',
    },
]