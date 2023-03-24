import { FormSchema } from '/@/components/Form'

import { getCategoryAllFunc } from '/@/modules/ContentModule/api/basicFormApis'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'keyword',
    component: 'Input',
    label: '型号名称',
    componentProps: {
      placeholder: '输入型号名称搜索',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'categoryId',
    component: 'ApiCascader',
    label: '商品类别',
    componentProps: {
      placeholder: '请选择类别',
      api: getCategoryAllFunc,
      isLeaf: (record) => {
        return !record.children
      },
    },
  },
]

export const tableColumns = [
  {
    title: '编号',
    dataIndex: 'code',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '商品类别',
    dataIndex: 'categoryName',
    width: '150px',
  },

  {
    title: '型号名称',
    dataIndex: 'model',
    width: '150px',
    ellipsis: true,
    sorter: (a, b) => a.model - b.model,
  },
  {
    title: '型号首字母',
    dataIndex: 'initials',
    width: '80px',
    ellipsis: true,
  },
  {
    title: '新机售卖是否启用',
    dataIndex: 'isSaleEnable',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '旧机回收是否启用',
    dataIndex: 'isRecycleEnable',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
]
