import { FormSchema } from '/@/components/Form'
import { getGoodsSelectOne } from '/@/api/data/ModelFormApis'


export const filterFormSchemas: FormSchema[] = [
    // {
    //     field: 'realName',
    //     component: 'Input',
    //     label: '客户名称',
    //     componentProps: {
    //         placeholder: '客户名称',
    //         onChange: (e) => {
    //             console.log(e)
    //         },
    //     },
    // },
    {
        field: 'userName',
        component: 'Input',
        label: '客户手机号',
        componentProps: {
            placeholder: '客户手机号',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'id',
        component: 'Input',
        label: '流水号',
        componentProps: {
            placeholder: '流水号',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'payStatus',
        component: 'Select',
        label: '支付状态',
        componentProps: {
            placeholder: '请选择',
            options: [
                {
                    label: '成功',
                    value: 'success',
                    key: 'success',
                },
                {
                    label: '进行中',
                    value: 'pending',
                    key: 'pending',
                },
                {
                    label: '失败',
                    value: 'fail',
                    key: 'fail',
                },
            ],
        },
    },
   
    {
        field: 'searchTime',
        label: '日期',
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
        title: '流水号',
        dataIndex: 'id',
        width: '180px',

    },
    {
        title: '客户名称',
        dataIndex: 'realName',
        width: '180px',
    },
    {
        title: '客户手机号',
        dataIndex: 'userName',
        width: '150px',
        ellipsis: true,
    },
    {
        title: '客户角色',
        dataIndex: 'platformCode',
        width: '150px',
    },
    // {
    //     title: '期初余额',
    //     dataIndex: 'buyerName',
    //     width: '160px',
    // },
    // {
    //     title: '销售收入',
    //     dataIndex: 'buyerMobile',
    //     width: '130px',
    // },
    // {
    //     title: '提现支出',
    //     dataIndex: 'brandName',
    //     width: '180px',
    // },
    {
        title: '提现金额(元)',
        dataIndex: 'amount',
        width: '120px',
    },
    {
        title: '可提现余额(元)',
        dataIndex: 'surplusAmount',
        width: '120px',
    },
   
    {
        title: '状态',
        dataIndex: 'payStatus',
        width: '120px',
    },
    {
        title: '结果',
        dataIndex: 'payFailMessage',
        width: '120px',
    },

    {
        title: '操作',
        dataIndex: 'operation',
        width: '150px',
        fixed: 'right',
    },
]


