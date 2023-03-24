import { FormSchema } from '/@/components/Form'
import { classificationEvent } from '/@/modules/ContentModule/view/StudyCenter/data/StudyCenterApi'

export const assignFormSchemas: FormSchema[] = [
    {
        field: 'platformCode',
        component: 'Select',
        label: '所属角色',
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
            ],
        },
    },
    {
        field: 'id',
        component: 'ApiSelect',
        label: '分类名称',
        componentProps: {
            placeholder: '请选择分类',
            api: classificationEvent,
            onChange: (e) => {
                console.log(e)
            },
        },
    }
]
