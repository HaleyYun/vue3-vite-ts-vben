import { FormSchema } from '/@/components/Form'
import {  DescItem } from '/@/components/Description/index';
export enum tabsNameEnum {
  basicInformation='基础信息',
  CompanyQualification = '公司资质',
  OperatingCategory='经营品类',
  financialInformation='财务信息',
  ContractInformation='合同信息',
  StoreInformation='店铺信息',
  AddressInformation='地址信息',
  ShieldingSettings='屏蔽设置'

}
// 基本信息Enum
export enum basicInformationEnum {
  id='ID',
  rate='等级',
  statusStr='主体状态',
  checkStatusName='认证状态',
  contractName='负责人',
  contractPhone='手机号',
  businessLicenseAddress='营业执照注册地址',
  sourceStr='用户来源',
  address='详细地址',
  channelManagerName='渠道经理',
}
// 公司资质
export enum companyQualificationEnum {
  corpType='企业类型',
  fullName='企业名称',
  uniCredit='社会信用代码',
  businessLicenseStartDate='有效期',
  businessLicenseAddress='注册地址',
  businessLicenseUrl='营业执照图片',
  legalName ='法人身份证姓名',
  legalId = '身份证号',
  IdCardDate='身份证有效期',
  legalPhone='legalPhone',
  legalIdCardFront='详细地址',
  legalIdCardBack='渠道经理',
}


export const schema: DescItem[] = [
  {
    field: 'username',
    label: '用户名',
  },
  {
    field: 'nickName',
    label: '昵称',
    render: (curVal, data) => {
      return `${data.username}-${curVal}`;
    },
  },
  {
    field: 'phone',
    label: '联系电话',
  },
  {
    field: 'email',
    label: '邮箱',
  },
  {
    field: 'addr',
    label: '地址',
  },
];
import { classificationEvent } from '/@/modules/ContentModule/view/StudyCenter/data/StudyCenterApi'

/**
 * @description "公共"筛选项
 */
export const filterHelpCenterForm: FormSchema[] = [
  {
    field: 'platformCode',
    component: 'Select',
    label: '所属角色',
    colProps: {
      span: 6,
    },
    defaultValue: 'agent',
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
]
// 所属角色，supplier=供应商；agent=服务商；garage=修理厂；op=运营平台
export const filterStudyCenterDetailsForm: FormSchema[] = [
  {
    field: 'platformCode',
    component: 'Select',
    label: '所属角色',
    rules: [{ required: true }],
    componentProps: {
      style: { width: '25%' },
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
    field: 'categoryId',
    component: 'ApiSelect',
    label: '分类',
    componentProps: {
      style: { width: '25%' },
      placeholder: '请选择分类',
      api: classificationEvent,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '课程名称',
    defaultValue: '',
    componentProps: {
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
    label: '图片/视频',
    slot: 'resourceSlot',
  },
  {
    field: 'content',
    component: 'Input',
    label: '内容',
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

