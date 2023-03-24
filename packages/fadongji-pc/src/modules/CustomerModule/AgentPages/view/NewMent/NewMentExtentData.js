// svg
import contractSvg from '/@/assets/svg/uploadContract.svg'
const validatorPhone = function (rule, value, callback) {
  if (value === '') {
    return Promise.reject(new Error('手机号不能为空'))
  } else if (!/^1\d{10}$/.test(value)) {
    return Promise.reject(new Error('手机号格式错误'))
  } else {
    return Promise.resolve(value)
  }
}
export const formLocalData = [
  {
    rule: {
      required: true,
      message: '请输入正确的手机号',
      trigger: 'change',
      validator: validatorPhone,
    },
    label: '手机号码',
    value: '',
    placeholder: '请输入手机号码',
    ruleName: 'phone',
    key: 'phone',
    select: false,
    selectArr: [],
  },
  {
    rule: {
      required: true,
      message: '请输入代理商名称',
      trigger: 'change',
    },
    label: '代理商名称',
    value: '',
    placeholder: '请输入代理商名称',
    ruleName: 'agentName',
    key: 'agentName',
    select: false,
    selectArr: [],
  },
  {
    rule: {
      required: false,
    },
    label: '所属地区',
    value: [1],
    placeholder: '请输入所属地区',
    ruleName: 'area',
    key: 'area',
    areaObject: {},
    select: false,
    resource: 'multiSelect',
    selectArr: [],
  },
  {
    rule: {
      required: true,
      message: '请输入详细地址',
      trigger: 'change',
    },
    label: '详细地址',
    value: '',
    placeholder: '请输入详细地址',
    ruleName: 'address',
    key: 'address',
    select: false,
    selectArr: [],
  },
  {
    rule: {
      required: true,
      message: '请输入负责人姓名',
      trigger: 'change',
    },
    label: '负责人',
    value: '',
    placeholder: '请输入负责人姓名',
    ruleName: 'principalName',
    key: 'principalName',
    select: false,
    selectArr: [],
  },
  {
    rule: {
      required: true,
      message: '请输入客户运营',
      trigger: 'change',
    },
    label: '客户运营',
    value: '',
    key: 'customerOperation',
    selectArr: [
      { value: '姓名1', label: '姓名1', id: 0 },
      { value: '姓名2', label: '姓名2', id: 1 },
      { value: '姓名3', label: '姓名3', id: 2 },
    ],
    select: true,
  },
  {
    rule: {
      required: true,
      message: '请输入业务代表',
      trigger: 'change',
    },
    label: '业务代表',
    value: '姓名1',
    key: 'businessRepresentative',
    selectArr: [
      { value: '姓名1', label: '姓名1', id: 0 },
      { value: '姓名2', label: '姓名2', id: 1 },
      { value: '姓名3', label: '姓名3', id: 2 },
    ],
    select: true,
  },
  {
    rule: {
      required: false,
      message: '请输入合同信息',
      trigger: 'change',
    },
    label: '合同信息',
    value: '',
    key: 'commonCode',
    resource: 'resource',
    select: false,
    src: contractSvg,
  },
]
