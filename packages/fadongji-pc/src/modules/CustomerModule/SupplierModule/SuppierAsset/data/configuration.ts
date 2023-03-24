import {FormSchema} from '/@/components/Form'


// 供应商拓客
export const filterFormSchemas: FormSchema[] = [
  {
    field: 'shortName',
    component: 'Input',
    label: '供应商名称',

    componentProps: {
      placeholder: '请输入供应商名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '供应商手机号',
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
  //   label: '供应商等级',
  //   componentProps: {
  //     options:[],
  //     placeholder: '请选择',
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },



];


export const tableColumns = [

  {
    title: '供应商名称',
    dataIndex: 'name',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '供应商手机号',
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
    title: '保证金',
    dataIndex: 'margin',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '应收账款',
    dataIndex: 'receivable_Accounts',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '账户余额',
    dataIndex: 'account_balance',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '招商经理',
    dataIndex: 'investment_manage',
    width: '150px',
    ellipsis: true,
  }
];

// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    id:29903,
    customerName: '长葛姜天龙',
    customerType:'供应商',
    status: 1,
    phone: '1568888888',
    integral:12,
    growth_value:16,
    account_balance: '0',
    level: 'LV5',
    margin:'100',
    investment_manage:'李华'
  }
];
