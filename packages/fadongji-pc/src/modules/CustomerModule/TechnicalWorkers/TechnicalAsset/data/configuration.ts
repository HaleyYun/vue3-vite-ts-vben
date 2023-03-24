import { FormSchema } from '/@/components/Form'

// 集师傅拓客
export const filterFormSchemas: FormSchema[] = [
  {
    field: 'shortName',
    component: 'Input',
    label: '集师傅名称',

    componentProps: {
      placeholder: '请输入集师傅名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '集师傅手机号',
    componentProps: {
      placeholder: '请输入手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  // {
  //   field: 'status',
  //   component: 'ApiSelect',
  //   label: '集师傅等级',
  //   componentProps: {
  //     options:[],
  //     placeholder: '请选择',
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },
]

export const tableColumns = [
  {
    title: '集师傅名称',
    dataIndex: 'customerName',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '主体手机号',
    dataIndex: 'phone',
    width: '120px',
  },
  // {
  //   title: '等级',
  //   dataIndex: 'level',
  //   width: '180px',
  //   ellipsis: true,
  // },
  {
    title: '成长值',
    dataIndex: 'growth_value',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '账户余额',
    dataIndex: 'account_balance',
    width: '100px',
    ellipsis: true,
  },
]

// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    id: 29903,
    customerName: '长葛姜天龙',
    customerType: '集师傅',
    status: 1,
    phone: '1568888888',
    integral: '0',
    growth_value: '0',
    account_balance: '0',
    level: 'LV5',
  },
]
