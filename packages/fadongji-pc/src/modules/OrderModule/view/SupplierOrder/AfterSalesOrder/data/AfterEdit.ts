import { FormSchema } from '/@/components/Form'
import type { Rule } from 'ant-design-vue/es/form'
const validateViolation = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('违规类型不可为空')
  } else if (value.length > 20) {
    return Promise.reject('输入内容不能超过20字')
  } else {
    return Promise.resolve()
  }
}

export const paramViolationTypeAssetsColumn = [
  { title: '违规类型', dataIndex: 'violationType', width: 300 },
  { title: '违规范围', dataIndex: 'violationRange' },
  { title: '是否启用', dataIndex: 'isShow', width: 200 },
  { title: '更新时间', dataIndex: 'updateTime', width: 250 },
  { title: '操作', dataIndex: 'action', width: 300, fixed: 'right', align: 'center' },
]

export const paramViolationTypeAssetsData = [
  {
    id: '1000',
    violationType: '商品质量问题',
    violationRange: '独立违规',
    isShow: true,
    updateTime: '2017-07-19 14:48:38',
  },
  {
    id: '2000',
    violationType: '价格不合理',
    violationRange: '全网违规',
    isShow: false,
    updateTime: '2017-07-19 14:48:38',
  },
]

const violationRangeEvent = () => {
  return [
    {
      label: 'text1',
      value: '1',
    },
    {
      label: 'text2',
      value: '2',
    },
  ]
}
export const handleViolationFormEditOrInsert: FormSchema[] = [
  {
    field: 'field7',
    component: 'RadioGroup',
    label: '审核结果',
    colProps: {
      span: 18,
    },
    componentProps: {
      options: [
        {
          label: '审核通过',
          value: '1',
        },
        {
          label: '审核不通过',
          value: '2',
        },
      ],
    },
    rules: [{ required: true, message: '请选择状态', trigger: 'blur' }],
  },
  // {
  //     field: 'violationType',
  //     component: 'Radio',
  //     label: '违规类型',
  //     colProps: {
  //         span: 22,
  //     },
  //     defaultValue: '',
  //     componentProps: {
  //         placeholder: '请输入违规类型',
  //         onChange: (e) => {
  //             console.log(e)
  //         },
  //     },
  //     rules: [{ required: true, validator: validateViolation, trigger: 'change' }],
  // },
  // {
  //     field: 'violationRange',
  //     component: 'ApiSelect',
  //     label: '请选择作者',
  //     colProps: {
  //         span: 22,
  //     },
  //     defaultValue: '',
  //     componentProps: {
  //         api: violationRangeEvent,
  //         placeholder: '请选择违规范围',
  //         onChange: (e) => {
  //             console.log(e)
  //         },
  //     },
  //     rules: [{ required: true, message: '请选择违规范围', trigger: 'blur' }],
  // },
]
