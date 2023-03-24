import { FormSchema } from '/@/components/Form'
import { getCategoryFunc, getBrandFunc } from '/@/modules/ContentModule/api/basicFormApis'
import { classificationEvent } from '/@/modules/ContentModule/view/StudyCenter/data/StudyCenterApi'




export const opFormConfig: FormSchema[] = [
    {
        field: 'name',
        component: 'Input',
        label: '商品名称',
        colProps: {
            span: 8,
        },
        componentProps: {
            placeholder: '请输入商品名称',
            onChange: (e) => {
                console.log(e)
            },
        },
        rules: [{ required: true, message: '请输入商品名称' }],
    },
    {
        field: 'categoryInfo',
        component: 'ApiSelect',
        label: '商品类别',
        colProps: {
            span: 8,
        },
        componentProps: {
            api: getCategoryFunc,
            placeholder: '请选择商品类别',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'brandName',
        component: 'ApiSelect',
        label: '商品品牌',
        colProps: {
            span: 8,
        },
        componentProps: {
            api: getBrandFunc,
            placeholder: '请选择商品品牌',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'shopName',
        component: 'Input',
        label: '卖家',
        componentProps: {
            placeholder: '请输入卖家',
            onChange: (e) => {
                console.log(e)
            },
        },
        rules: [{ required: true, message: '请输入卖家名称' }],
    },
    {
        field: '[startTime, endTime]',
        label: '最后更新时间',
        component: 'RangePicker',
        componentProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
        },
    },
]

export const filterFormSchemasByAwait: FormSchema[] = [
    {
        field: 'platformCode',
        component: 'Select',
        label: '所属角色',
        colProps: {
            span: 6,
        },
        componentProps: {
            placeholder: '请选择所属角色',
            options: [
                {
                    label: '供应商',
                    value: 'supplier',
                },
                {
                    label: '服务商',
                    value: 'agent',
                },
                {
                    label: '修理厂',
                    value: 'garage',
                },
                {
                    label: '运营平台',
                    value: 'op',
                },
            ],
        },
    },
    {
        field: 'categoryId',
        component: 'ApiSelect',
        label: '分类',
        colProps: {
            span: 6,
        },
        componentProps: {
            placeholder: '请选择分类',
            api: classificationEvent,
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'startTime',
        label: '修改时间',
        colProps: {
            span: 6,
        },
        component: 'RangePicker',
        componentProps: {
            format: 'YYYY-MM-DD',
            placeholder: ['开始时间', '结束时间'],
        },
    },
    {
        field: 'name',
        component: 'Input',
        label: '关键词',
        colProps: {
            span: 6,
        },
        componentProps: {
            placeholder: '请输入关键词',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
]
// export const lastGoneData: FormSchema[] = [
//   {
//     field: '[starTscime, endTime]',
//     label: '最后更新时间',
//     component: 'RangePicker',
//     colProps: {
//       span: 6,
//     },
//     componentProps: {
//       format: 'mm:ss',
//       placeholder: ['开始时间', '结束时间'],
//       showTime: { format: 'HH:mm:ss' },
//     },
//   },
// ]
// export const accessGoneData: FormSchema[] = [
//   {
//     field: '[starTime, endime]',
//     label: '下架时间',
//     component: 'RangePicker',
//     colProps: {
//       span: 6,
//     },
//     componentProps: {
//       format: 'YYYY-MM-DD HH:mm:ss',
//       placeholder: ['开始时间', '结束时间'],
//       showTime: { format: 'HH:mm:ss' },
//     },
//   },
// ]

// export const hasNoneData: FormSchema[] = [
//   {
//     field: 'shope',
//     component: 'ApiSelect',
//     label: '库存状态',
//     colProps: {
//       span: 6,
//     },
//     componentProps: {
//       placeholder: '请选择库存状态',
//       api: getCategoryFunc,
//       onChange: (e) => {
//         console.log(e)
//       },
//     },
//   },
// ]
// export const hasViolationData: FormSchema[] = [
//   {
//     field: 'shpe',
//     component: 'ApiSelect',
//     label: '违规下架时间',
//     colProps: {
//       span: 6,
//     },
//     componentProps: {
//       placeholder: '请选择下架时间',
//       api: getCategoryFunc,
//       onChange: (e) => {
//         console.log(e)
//       },
//     },
//   },
// ]
