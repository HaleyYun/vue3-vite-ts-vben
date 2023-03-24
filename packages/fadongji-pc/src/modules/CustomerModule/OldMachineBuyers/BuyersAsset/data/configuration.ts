import {FormSchema} from '/@/components/Form'


// 旧机买家拓客
export const filterFormSchemas: FormSchema[] = [
  {
    field: 'shortName',
    component: 'Input',
    label: '旧机买家名称',

    componentProps: {
      placeholder: '请输入旧机买家名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '旧机买家手机号',
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
  //   label: '旧机买家等级',
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
    title: '旧机买家ID' ,
    dataIndex: 'id',
    width: '180px',
    ellipsis: true,
  },
  {
    title: '旧机买家名称',
    dataIndex: 'name',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '旧机买家手机号',
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
  }
];

// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    id:29903,
    customerName: '长葛姜天龙',
    customerType:'旧机买家',
    status: 1,
    phone: '1568888888',
    integral:12,
    growth_value:16,
    account_balance: '0',
    level: 'LV5',
  }
];
