import { FormSchema } from '/@/components/Form'

const getUserSwitchFunc = () => {
  return new Promise((resolve) => {
    resolve([
      { label: '全部', value: '' },
      { label: '启用', value: false },
      { label: '关闭', value: true },
    ])
  })
}
export const filterFormUserAwait: FormSchema[] = [
  {
    field: 'nickName',
    component: 'Input',
    label: '用户名称',
    defaultValue: '',
    componentProps: {
      placeholder: '用户名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '手机号',
    defaultValue: '',
    componentProps: {
      placeholder: '手机号',
      onChange: (e) => {
        console.log(e)
      },
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


