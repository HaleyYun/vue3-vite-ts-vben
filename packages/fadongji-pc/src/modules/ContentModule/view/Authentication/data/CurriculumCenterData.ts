import { FormSchema } from '/@/components/Form'
// 所属角色，supplier=供应商；agent=服务商；garage=修理厂；op=运营平台
export const CurriculumCenterDetailsForm: FormSchema[] = [
  {
    field: 'platformCode',
    component: 'Select',
    label: '角色',
    defaultValue: 'skilledWorker',
    rules: [{ required: true }],
    slot: 'slotCode',
  },
  {
    field: 'categoryIds',
    component: 'Select',
    label: '分类',
    rules: [{ required: true, type: 'array' }],
    slot: 'slotCategory',
  },
  {
    field: 'categoryId',
    component: 'Select',
    label: '分类',
    rules: [{ required: true }],
    slot: 'slotCategory',
    ifShow: false,
    componentProps: {},
  },
  {
    field: 'name',
    component: 'Input',
    label: '课程名称',
    defaultValue: '',
    componentProps: {
      style: { width: '25%' },
      maxlength: 20,
      placeholder: '请输入内容名称',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入内容名称' }],
  },
  {
    field: 'fileUrl',
    component: 'Input',
    label: '内容头图',
    slot: 'resourceSlot',
    rules: [{ required: true, message: '请上传图片或视频' }],
  },
  {
    field: 'content',
    component: 'Input',
    label: '内容',
    componentProps: {
      style: { width: '90%' },
    },
    ifShow: true,
    slot: 'contentSlot',
  },
  {
    field: 'isEnable',
    component: 'Switch',
    label: '是否启用',
    defaultValue: true,
    colProps: {
      span: 8,
    },
    componentProps: {},
  },
]

export const removeEmpty = (obj) => {
  Object.keys(obj).forEach(function (key) {
    ;(obj[key] && typeof obj[key] === 'object' && removeEmpty(obj[key])) ||
      ((obj[key] === undefined || obj[key] === null) && delete obj[key])
  })
  return obj
}
