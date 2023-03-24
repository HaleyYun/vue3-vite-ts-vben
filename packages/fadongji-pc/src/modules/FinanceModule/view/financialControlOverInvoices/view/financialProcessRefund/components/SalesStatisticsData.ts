import { FormSchema } from '/@/components/Form'
export const filterSalesStatisticsForm: FormSchema[] = [
    {
        field: 'name',
        component: 'Input',
        label: '名称',
        colProps: {
            span: 6,
        },
        componentProps: {
            placeholder: '请输入名称',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'phone',
        component: 'Input',
        label: '手机号',
        colProps: {
            span: 6,
        },
        componentProps: {
            placeholder: '请输入手机号',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: '[startTime, endTime]',
        label: '申请日期',
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
        field: 'type',
        component: 'Select',
        label: '发票类型',
        colProps: {
            span: 6,
        },
        componentProps: {
            placeholder: '请选择发票类型',
            options: [
                {
                    label: '发票1',
                    value: '1',
                },
                {
                    label: '发票2',
                    value: '2',
                },
            ],
        },
    },
]