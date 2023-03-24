import { FormSchema } from '/@/components/Form'

// 服务商拓客
export const filterFormSchemas: FormSchema[] = [
  {
    field: 'storeName',
    component: 'Input',
    label: '服务商名称',

    componentProps: {
      placeholder: '请输入服务商名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '服务商手机号',
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
  //   label: '服务商等级',
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
    title: '服务商名称',
    dataIndex: 'storeName',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '服务商手机号',
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
    title: '账期额度',
    dataIndex: 'payment_days',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '成长值',
    dataIndex: 'growth_value',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '保证金',
    dataIndex: '',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '应付账款',
    dataIndex: '',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '应收账款',
    dataIndex: '',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '账户余额',
    dataIndex: '',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '渠道经理',
    dataIndex: '',
    width: '150px',
    ellipsis: true,
  },
]

// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    id: 29903,
    customerName: '长葛姜天龙',
    customerType: '服务商',
    status: 1,
    phone: '1568888888',
    integral: 12,
    growth_value: 16,
    account_balance: '0',
    level: 'LV5',
  },
]
