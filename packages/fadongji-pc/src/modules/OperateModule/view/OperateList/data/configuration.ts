import { FormSchema } from '/@/components/Form'
import { getGoodsSelectOne } from '/@/api/data/ModelFormApis'


export const filterFormSchemas: FormSchema[] = [
    {
        field: 'engineNo',
        component: 'Input',
        label: '发动机识别号',
        componentProps: {
            placeholder: '发动机识别号',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'qualityStatus',
        component: 'Select',
        label: '保修状态',
        componentProps: {
            placeholder: '请选择',
            options: [
                {
                    label: '未质保',
                    value: '0',
                    key: '0',
                },
                {
                    label: '预激活',
                    value: '1',
                    key: '1',
                },
                {
                    label: '保修中',
                    value: '2',
                    key: '2',
                },
                {
                    label: '已过保',
                    value: '3',
                    key: '3',
                },

            ],
        },
    },
    {
        field: 'searchTime',
        label: '激活时间',
        component: 'RangePicker',
        componentProps: {
            placeholder: ['开始时间', '结束时间'],
            style: {
                width: '100%',
            },
        },
    },
    {
        field: 'buyerName',
        component: 'Input',
        label: '修理厂名称',
        componentProps: {
            placeholder: '修理厂名称',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'buyerMobile',
        component: 'Input',
        label: '修理厂电话',
        componentProps: {
            placeholder: '修理厂电话',
            onChange: (e) => {
                console.log(e)
            },
        },
    },

    {
        field: 'brandId',
        component: 'ApiSearchSelect',
        label: '车辆品牌',
        componentProps: {
            api: getGoodsSelectOne,
            placeholder: '请选择车辆品牌',
            onChange: (e) => {
                console.log(e)
            },
        },
    },


    {
        field: 'ownerName',
        component: 'Input',
        label: '车主姓名',
        componentProps: {
            placeholder: '车主姓名',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'ownerMobile',
        component: 'Input',
        label: '车主电话',
        componentProps: {
            placeholder: '车主电话',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
];

export const tableColumns = [
    {
        title: '发动机识别号',
        dataIndex: 'engineNo',
        width: '180px',

    },
    {
        title: '激活时间',
        dataIndex: 'qualityBeginTime',
        width: '180px',
    },
    {
        title: '保修状态',
        dataIndex: 'qualityStatus',
        width: '150px',
        ellipsis: true,
    },
    {
        title: '保修时间',
        dataIndex: 'qualityTime',
        width: '300px',
    },
    {
        title: '修理厂名称',
        dataIndex: 'buyerName',
        width: '160px',
    },
    {
        title: '修理厂电话',
        dataIndex: 'buyerMobile',
        width: '130px',
    },
    {
        title: '车辆品牌',
        dataIndex: 'brandName',
        width: '180px',
    },
    {
        title: '车牌号',
        dataIndex: 'carNo',
        width: '120px',
    },

    {
        title: '行驶里程',
        dataIndex: 'mileage',
        width: '120px',
    },
    {
        title: '车主姓名',
        dataIndex: 'ownerName',
        width: '120px',
    },
    {
        title: '车主电话',
        dataIndex: 'ownerMobile',
        width: '150px',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '150px',
        fixed: 'right',
    },
]


