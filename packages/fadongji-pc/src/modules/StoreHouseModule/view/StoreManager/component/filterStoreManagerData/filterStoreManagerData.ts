import { FormSchema } from '/@/components/Form'
import { getCityFunc } from '/@/modules/ContentModule/api/basicFormApis'
export const filterStoreManagerData: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '',
    defaultValue: '供应商',
    colProps: {
      span: 14,
    },
    componentProps: {
      placeholder: '请输入供应商名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const createStore: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '仓库名称',
    colProps: {
      span: 22,
    },
    rules: [{ required: true, message: '请输入仓库名称' }],
    componentProps: {
      placeholder: '请输入仓库名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'address',
    component: 'ApiCascader',
    label: '仓库地址',
    colProps: {
      span: 22,
    },
    componentProps: {
      // api: getCityFunc,
      apiParamKey: 'getCityFunc',
      dataField: 'children',
      labelField: 'name',
      valueField: 'code',
      initFetchParams: {
        parentCode: '',
      },
      isLeaf: (record) => {
        return !(record.levelType < 3)
      },
    },
  },
]

export const filterStoreContent: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '仓库名称',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入仓库名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '仓库状态',
    colProps: {
      span: 6,
    },
    // defaultValue: 1,
    componentProps: {
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  },
]

export const storeCommonColumn = [
  { title: '仓库名称', dataIndex: 'warehouseName' },
  { title: '发货地/仓库位置', dataIndex: 'address' },
  { title: '仓库状态', dataIndex: 'status' },
  { title: '最后编辑时间', dataIndex: 'updateTime' },
  { title: '编辑人', dataIndex: 'modifierInfo' },
  { title: '操作', dataIndex: 'action' },
]
export const platformColumn = [
  { title: '仓库名称', dataIndex: 'warehouseName' },
  { title: '发货地/仓库位置', dataIndex: 'address' },
  { title: '最后编辑时间', dataIndex: 'updateTime' },
  { title: '编辑人', dataIndex: 'modifierInfo' },
  { title: '操作', dataIndex: 'action' },
]
