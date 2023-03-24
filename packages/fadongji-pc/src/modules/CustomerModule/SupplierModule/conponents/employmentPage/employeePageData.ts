import { FormSchema } from '/@/components/Form'

import {getCustomerRoleCompany} from '/@/api/model/dictionaryApi'


export const employeePageColumn = [
  {title:'员工名称', dataIndex: 'realName'},
  {title:'所属角色', dataIndex: 'roleName'},
  {title:'手机号', dataIndex: 'userName'},
  {title:'添加时间', dataIndex: 'createTime'},
  {title:'是否启用', dataIndex: 'status'},
  {title:'操作', dataIndex: 'action'},
]
const getUserSwitchFunc = () => {
  return new Promise((resolve) => {
    resolve([
      { label: '全部', value: '' },
      { label: '启用', value: false },
      { label: '禁用', value: true },
    ])
  })
}
export const editEmployeeForm: FormSchema[] = [
  {
    field: 'account',
    component: 'Input',
    label: '账号',
    componentProps: {
      placeholder: '账号/手机号/邮箱',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'roleId',
    component: 'ApiSelect',
    label: '所属角色',
    componentProps: {
      placeholder: '请选择栏目',
      api: getCustomerRoleCompany,
      resultField:'data',
      labelField: 'name',
      valueField: 'id',
      immediate:false,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    label: '添加时间',
    field: 'searchTime',
    component: 'RangePicker',
    componentProps: {
      style:{width:'100%'},
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: 'status',
    component: 'ApiSelect',
    label: '账号启用状态',
    defaultValue: '',
    componentProps: {
      placeholder: '请选择启用状态',
      api: getUserSwitchFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
