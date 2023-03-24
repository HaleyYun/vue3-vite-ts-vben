import {FormSchema} from '/@/components/Form'


export const filterFormSchemas: FormSchema[] = [
  {
    field: 'keyword',
    component: 'Input',
    label: '型号名称',
    componentProps: {
      placeholder: '名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '状态',
    componentProps: {
      // 申请状态  1 未处理  2审批通过  3审批未通过
      options: [
        {label:'未处理',value:1},
        {label:'已通过',value:2},
        {label:'未通过',value:3},
        {label:'全部',value:''},
        ],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  // {
  //   field: 'status',
  //   component: 'ApiSelect',
  //   label: '回收公司',
  //   componentProps: {
  //     options: [
  //       {label:'未处理',value:1},
  //       {label:'已通过',value:2},
  //       {label:'未通过',value:3},
  //       {label:'全部',value:4},
  //     ],
  //     placeholder: '输入公司名称搜索',
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },
  {
    field: 'searchTime',
    label: '申请时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
];

export const tableColumns = [
  {
    title: '型号名称',
    dataIndex: 'applyModel',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '回收公司',
    dataIndex: 'shopName',
    width: '200px',
  },
  {
    title: '提交人',
    dataIndex: 'creatorName',
    width: '200px',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'statusName',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    width: '200px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
];

// 这是mock 数据以后对接口会删掉
export const mockTableData = [
  {
    id: 1,
    status: 1,
    phone: '1568888888',
    name: '张三',
    model_name:'B12',
    recyclingCompany:'郑州汽车回收公司',
    createTime: '2022-03-28 11:11:11',
  },
  {
    id: 2,
    status: 2,
    phone: '1568888888',
    name: '张三',
    model_name:'B12',
    recyclingCompany:'郑州汽车回收公司',
    createTime: '2022-03-28 11:11:11',
  },

];
