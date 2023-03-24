import { FormSchema } from '/@/components/Form'
// 所属角色，supplier=供应商；agent=服务商；garage=修理厂；op=运营平台
const filterManualCenterDetailsForm: FormSchema[] = [
  {
    field: 'platformCode',
    component: 'Select',
    label: '角色',
    defaultValue: 'garage',
    rules: [{ required: true }],
    slot: 'slotCode',
  },
  {
    field: 'categoryIds',
    component: 'Select',
    label: '分类',
    rules: [{ required: true, type: 'array' }],
    slot: 'slotCategory',
    ifShow: true,
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
    label: '内容标题',
    defaultValue: '',
    componentProps: {
      style: { width: '25%' },
      maxlength: 20,
      placeholder: '请输入内容标题',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入内容标题' }],
  },
  {
    field: 'model',
    component: 'Select',
    label: '适用型号',
    rules: [{ required: true, type: 'array' }],
    slot: 'applicable',
  },
  {
    field: 'keyword',
    component: 'Input',
    label: '内容关键词',
    slot: 'keyWordSlot',
    rules: [{ required: true }],
  },
  {
    field: 'fileUrl',
    component: 'Input',
    label: '内容头图',
    slot: 'resourceSlot',
    rules: [{ required: true }],
    componentProps: {

      onChange: (e) => {
        console.log(e)
      },
    },
    
  },
  {
    field: 'content',
    component: 'Input',
    label: '内容',
    componentProps: {
      style: { width: '90%' },
    },
    slot: 'contentSlot',
    ifShow: false,
  },
  {
    field: 'isEnable',
    component: 'Switch',
    label: '是否启用',
    defaultValue: true,
    colProps: {
      span: 8,
    },
  },
]

export const removeEmpty = (obj) => {
  Object.keys(obj).forEach(function (key) {
    ;(obj[key] && typeof obj[key] === 'object' && removeEmpty(obj[key])) ||
      ((obj[key] === undefined || obj[key] === null) && delete obj[key])
  })
  return obj
}
export const filterFormConfig = {
  filterManualCenterDetailsForm,
}
