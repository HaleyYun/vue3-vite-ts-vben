import { FormSchema } from '/@/components/Form'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'companyName',
    component: 'Input',
    label: '客户名称',
    componentProps: {
      placeholder: '请输入客户名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
//服务商
export const serviceFormSchemas: FormSchema[] = [
  {
    field: 'companyName',
    component: 'Input',
    label: '服务商',
    componentProps: {
      placeholder: '请输入客户名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
//旧机回收
export const oldFormSchemas: FormSchema[] = [
  {
    field: 'companyName',
    component: 'Input',
    label: '旧机买家',
    componentProps: {
      placeholder: '请输入客户名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

//回收公司
export const recyclingFormSchemas: FormSchema[] = [
  {
    field: 'companyName',
    component: 'Input',
    label: '回收公司',
    componentProps: {
      placeholder: '请输入回收公司',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const tableColumns = [
  {
    title: '客户',
    dataIndex: 'companyName',
    width: '250px',
    ellipsis: true,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    ellipsis: true,
    width: '200px',
  },
  {
    title: '最后变更时间',
    dataIndex: 'lastUpdateTime',
    width: '230px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '200px',
    fixed: 'right',
  },
]
