import { FormSchema } from '/@/components/Form'


// 所属角色，supplier=供应商；agent=服务商；garage=修理厂；op=运营平台
export const filterStudyCenterDetailsForm: FormSchema[] = [
  {
    field: 'platformCodes',
    component: 'Select',
    label: '所属角色',
    rules: [{ required: true, type: 'array' }],
    slot: 'slotCode',
  },
  {
    field: 'platformCode',
    component: 'Select',
    label: '所属角色',
    rules: [{ required: true }],
    slot: 'slotCode',
    ifShow: false,
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
    componentProps: {
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '课程名称',
    defaultValue: '',
    componentProps: {
      maxlength: 20,
      style: { width: '25%' },
      placeholder: '请输入课程名称',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入课程名称' }],
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
    label: '内容标题',
    componentProps: {
      style: { width: '90%' },
    },
    slot: 'contentSlot',
  },
  {
    field: 'isEnable',
    component: 'Switch',
    label: '是否启动',
    defaultValue: false,
    colProps: {
      span: 8,
    },
  },

]

export const removeEmpty = (obj) => {
  Object.keys(obj).forEach(function (key) {
    ; (obj[key] && typeof obj[key] === 'object' && removeEmpty(obj[key])) ||
      ((obj[key] === undefined || obj[key] === null) && delete obj[key])
  })
  return obj
}
