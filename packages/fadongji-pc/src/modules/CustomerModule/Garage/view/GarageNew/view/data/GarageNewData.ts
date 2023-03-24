import { FormSchema } from '/@/components/Form'
import adminHttp from '/@/utils/http/adminHttp'
import type { Rule } from 'ant-design-vue/es/form'
import { Pattern } from '@vocen/shared'
import { getcompanyInfoServiceProject, getcompanyInfoCarSeries } from '/@/api/model/dictionaryApi'
import { CascaderDataApi } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/GarageListApi'

const checkPhone = async (_rule: Rule, value: number) => {
  if (!value) {
    return Promise.reject('请输入手机号')
  }
  if (!Pattern.isPhone(String(value))) {
    return Promise.reject('手机号格式不正确')
  } else {
    const map = { mobile: value }
    await adminHttp.CUSTOMER.companyLegalGarageMoblie(map)
  }
}

export const FilterGarageNewForm: FormSchema[] = [
  {
    field: 'contractPhone',
    component: 'Input',
    label: '联系电话',
    rules: [{ required: true, validator: checkPhone, trigger: ['change', 'blur'] }],
    componentProps: {
      style: { width: '100%' },
      placeholder: '请输入联系电话',
      maxlength: 11
    },
  },
  {
    field: 'storeName',
    component: 'Input',
    label: '修理厂名称',
    rules: [{ required: true, message: '修理厂名称不能为空', trigger: ['change', 'blur'] }],
    componentProps: {
      placeholder: '请输入修理厂名称',
      maxlength: 10,
      style: { width: '100%' },
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'contractName',
    component: 'Input',
    label: '负责人名称',
    rules: [{ required: true, message: '负责人名称不能为空', trigger: ['change', 'blur'] }],
    componentProps: {
      maxlength: 10,
      placeholder: '请输入负责人名称',
      style: { width: '100%' },
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    label: '所属地区',
    field: 'areaCode',
    rules: [
      { required: true, type: 'array', message: '所属地区不能为空', trigger: ['change', 'blur'] },
    ],
    component: 'ApiCascader',
    componentProps: {
      api: CascaderDataApi,
      placeholder: '请选择所属地区',
      fieldNames: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      isLeaf: (record) => {
        return !record.children
      },
    },
  },
  {
    field: 'address',
    component: 'Input',
    label: '详情地址',
    rules: [{ required: true, message: '详细地址不能为空', trigger: ['change', 'blur'] }],
    componentProps: {
      placeholder: '请输入详情地址',
      maxlength: 50,
      style: { width: '100%' },
      onChange: (e) => {
        console.log(e)
      },
    },
    slot: 'addressSlot',
  },
  {
    field: 'carSeries',
    component: 'ApiSelect',
    label: '主修车系',
    componentProps: {
      api: getcompanyInfoCarSeries,
      resultField: 'data',
      labelField: 'name',
      valueField: 'code',
      mode: 'multiple',
      maxTagCount: 5,
      style: { width: '100%' },
    },
  },
  {
    field: 'serviceProject',
    component: 'ApiSelect',
    label: '服务项目',
    componentProps: {
      api: getcompanyInfoServiceProject,
      resultField: 'data',
      labelField: 'name',
      valueField: 'code',
      maxTagCount: 5,
      mode: 'multiple',
      style: { width: '100%' },
    },
  },
  {
    field: 'locationNumber',
    component: 'InputNumber',
    label: '工位数量',
    componentProps: {
      max: 999,
      placeholder: '请输入工位数量',
      style: { width: '100%' },
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'scale',
    component: 'InputNumber',
    label: '规模',
    componentProps: {
      max: 999,
      placeholder: '请输入规模',
      style: { width: '100%' },
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'storeUrl',
    component: 'Input',
    label: '门头照片',
    rules: [{ required: true, message: '门头照片不能为空', trigger: 'change' }],
    componentProps: {
      style: { width: '100%' },
    },
    slot: 'storeUrlSlot',
  },
]
