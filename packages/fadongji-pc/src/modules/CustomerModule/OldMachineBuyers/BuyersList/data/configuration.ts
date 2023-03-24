import { FormSchema } from '/@/components/Form'
import { AreaDataApi } from '/@/api/model/dictionaryApi'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'fullName',
    component: 'Input',
    label: '旧机买家名称',
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
    label: '旧机买家手机号',
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
  // {
  //   field: 'level',
  //   component: 'ApiSelect',
  //   label: '旧机买家等级',
  //   componentProps: {
  //     options: [],
  //     placeholder: '请选择等级',
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },
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
]

export const tableColumns = [
  {
    title: '旧机买家名称',
    dataIndex: 'fullName',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '手机号',
    dataIndex: 'userName',
    width: '150px',
  },

  {
    title: '所在地区',
    dataIndex: 'areaCodeStr',
    width: '200px',
    ellipsis: true,
  },
  {
    title: '店铺状态',
    dataIndex: 'status',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '认证状态',
    dataIndex: 'checkStatusStr',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '店铺名称',
    dataIndex: 'storeName',
    width: '100px',
    ellipsis: true,
  },
  // {
  //   title: '旧机买家等级',
  //   dataIndex: 'level',
  //   width: '120px',
  //   ellipsis: true,
  // },

  {
    title: '注册时间',
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
]

// 这是mock 数据以后对接口会删掉
export const mockTableData = [
  {
    id: 1,
    status: 1,
    phone: '1568888888',
    name: '张三',
    level: 10,
    address: '河南省郑州市',
    shop_status: 1,
    shop_name: '江陵动力禹州工厂店',
    createTime: '2022-03-28 11:11:11',
  },
  {
    id: 1,
    status: 2,
    phone: '1568888888',
    name: '张三',
    level: 10,
    address: '河南省郑州市',
    shop_status: 1,
    shop_name: '江陵动力禹州工厂店',
    createTime: '2022-03-28 11:11:11',
  },
]
