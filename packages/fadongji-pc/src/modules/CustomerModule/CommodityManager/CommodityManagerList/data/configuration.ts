import { FormSchema } from '/@/components/Form'
import {AreaDataApi} from '/@/api/model/dictionaryApi'


export const filterFormSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '招商经理名称',
    componentProps: {
      placeholder: '名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '招商经理手机号',
    componentProps: {
      placeholder: '手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    label: '所属地区',
    field: 'areaCode',
    component: 'ApiCascader',
    componentProps: {
      api: AreaDataApi,
      placeholder: '所属地区',
      fieldNames: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      isLeaf: (record) => {
        return !record.children
      },
    },
  },

  {
    field: 'searchTime',
    label: '注册时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  // {
  //     field: 'categoryInfo',
  //     component: 'ApiSelect',
  //     label: '认证状态',
  //     componentProps: {
  //         options:[],
  //         placeholder: '请选择',
  //         onChange: (e) => {
  //             console.log(e)
  //         },
  //     },
  // },
];

export const tableColumns = [
  {
    title: '招商经理名称',
    dataIndex: 'name',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '手机号',
    dataIndex: 'userName',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '所属地区',
    dataIndex: 'areaCodeStr',
    width: '220px',
    // ellipsis: true,
  },
  {
    title: '认证状态',
    dataIndex: 'checkStatusStr',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '管辖供应商',
    dataIndex: 'policeSupplierNum',
    width: '120px',
  },
  {
    title: '用户来源',
    dataIndex: 'sourceStr',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: '180px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
]


