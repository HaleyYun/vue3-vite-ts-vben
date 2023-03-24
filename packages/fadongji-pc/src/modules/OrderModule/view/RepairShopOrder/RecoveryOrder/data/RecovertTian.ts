import { FormSchema } from '/@/components/Form'
import { CascaderDataApi } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/GarageListApi'

export const filterFormSchemas: FormSchema[] = [
    {
        field: 'id',
        component: 'Input',
        label: '订单编号',
        componentProps: {
            placeholder: '订单编号',
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
        field: 'searchTime',
        label: '下单时间',
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
        label: '修理厂',
        componentProps: {
            placeholder: '修理厂',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'masterName',
        component: 'Input',
        label: '集师傅',
        componentProps: {
            placeholder: '集师傅名称/手机号',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    // {
    //     field: 'categoryInfo',
    //     component: 'ApiSelect',
    //     label: '认证状态',
    //     componentProps: {
    //         options:[],
    //         placeholder: '请选择',
    //         onChange: (e) => {
    //             console.log(e)
    //         },
    //     },
    // },
    // {
    //     label: '所属地区',
    //     field: 'areaCode',
    //     component: 'ApiCascader',
    //     componentProps: {
    //         api: CascaderDataApi,
    //         placeholder: '所属地区',
    //         fieldNames: {
    //             children: 'children',
    //             label: 'name',
    //             value: 'id',
    //         },
    //         isLeaf: (record) => {
    //             return !record.children
    //         },
    //     },
    // },
    // {
    //     field: 'lavel',
    //     component: 'ApiSelect',
    //     label: '招商经理等级',
    //     componentProps: {
    //         options:[],
    //         placeholder: '请选择等级',
    //         onChange: (e) => {
    //             console.log(e)
    //         },
    //     },
    // },
]


