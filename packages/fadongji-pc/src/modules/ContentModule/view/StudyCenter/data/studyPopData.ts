import { FormSchema } from '/@/components/Form'

export const studyPopData: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '分类名称',
    colProps: {
      span: 18,
    },
    defaultValue: '',
    componentProps: {
      placeholder: '请输入分类名称',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入分类名称' }],
  },
  {
    field: 'platformCode',
    component: 'Select',
    label: '所属角色',
    colProps: {
      span: 18,
    },
    defaultValue: '',
    rules: [{ required: true, message: '请选择所属角色', trigger: 'change' }],
    componentProps: {
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
    field: 'isEnable',
    component: 'Switch',
    label: '是否启用',
    colProps: {
      span: 8,
    },
  },
]
