import { FormSchema } from '/@/components/Form'


export const filterPropertyForm:  FormSchema[] = [
  {
    field: 'fullName',
    component: 'Input',
    label: '供应商名称',
    colProps: {
      span: 6
    },
    componentProps: {
      placeholder: '请输入用户昵称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'subjectPhone',
    component: 'Input',
    label: '供应商手机号',

    colProps: {
      span: 6
    },
    componentProps: {
      placeholder: '请输入手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  // {
  //   field: 'level',
  //   component: 'Input',
  //   label: '供应商等级',
  //
  //   colProps: {
  //     span: 6
  //   },
  //   componentProps: {
  //     placeholder: '请输入供应商等级',
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },
  {
    field: 'operation',
    component: 'Input',
    label: '供应商运营',

    colProps: {
      span: 6
    },
    componentProps: {
      placeholder: '请输入供应商运营',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  // {
  //   field: 'status',
  //   component: 'ApiSelect',
  //   label: '账号启等级',
  //   defaultValue: '',
  //   componentProps: {
  //     placeholder: '请选择启用状态',
  //     api: getUserSwitchFunc,
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },
]

  export const SupperPropertyColumn = [
  {title: '客户ID', dataIndex: 'id'},
  {title: '供应商名称', dataIndex: 'fullName'},
  {title: '供应商手机号', dataIndex: 'subjectPhone'},
  {title: '等级', dataIndex: 'level'},
  {title: '积分', dataIndex: 'integer'},
  {title: '成长值', dataIndex: 'growthValue'},
  {title: '保证金', dataIndex: 'accountBalance'},
  {title: '应收账款', dataIndex: 'accountsReceivable'},
  // {title: '供应商渠道经理', dataIndex: 'accountsPayable'},
  {title: '账户余额', dataIndex: 'paymentAmount'},

]
