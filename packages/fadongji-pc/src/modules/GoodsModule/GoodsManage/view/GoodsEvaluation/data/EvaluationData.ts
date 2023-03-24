import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'
import { getCategoryAllFunc, getCompanyInfoFunc } from '/@/modules/ContentModule/api/basicFormApis'
import { getGoodsSellerData } from '/@/api/model/dictionaryApi'

const baseColumns = reactive([
  {
    field: 'goodsName',
    component: 'Input',
    label: '商品名称',
    defaultValue: '',
    componentProps: {
      placeholder: '输入商品名',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    label: '商品类别',
    field: 'categoryId',
    component: 'ApiCascader',
    componentProps: {
      api: getCategoryAllFunc,
      placeholder: '请选择商品类别',
      isLeaf: (record) => {
        return !record.children
      },
    },
  },
  {
    field: 'buyerId',
    component: 'ApiSearchSelect',
    label: '用户昵称',
    componentProps: {
      api: getCompanyInfoFunc,
      placeholder: '请输入用户昵称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'shopId',
    component: 'ApiSearchSelect',
    label: '卖家',
    componentProps: {
      allowClear: true,
      placeholder: '请选择卖家',
      immediate: true,
      api: getGoodsSellerData,
      resultField: 'data',
    },
  },
  {
    field: 'keyword',
    component: 'Input',
    label: '评价关键词',
    defaultValue: '',
    componentProps: {
      placeholder: '输入关键词',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
])

const accessColumns: FormSchema[] = []

const rejectColumns: FormSchema[] = [
  {
    label: '仅删除数据',
    component: 'Checkbox',
    field: 'isDeleted',
    defaultValue: false,
    // slot: 'onlyDeletedSlot',
    // schema: 表单的整个 schemas
    // formActionType: 操作表单的函数。与 useForm 返回的操作函数一致
    // formModel: 表单的双向绑定对象，这个值是响应式的。所以可以方便处理很多操作
    // tableAction: 操作表格的函数，与 useTable 返回的操作函数一致。注意该参数只在表格内开启搜索表单的时候有值，其余情况为null,
    componentProps: () => {
      return {
        onChange: (e) => {
          console.log(e)
          // const { reload } = tableAction
          // reload()
          // or
          // formModel.onlyDeleted = true
        },
      }
    },
  },
]
// code: "100011"
// createTime: "2022-05-27 10:22:56"
// creator: "1"
// id: "125270718630985212"
// isEnable: false
// isHot: false
// licenseId: "1212"
// logoUrl: "url"
// name: "阿迪达斯"
// updateTime: "2022-05-27 10:22:56"
const tableColumns = [
  {
    title: '商品编码',
    dataIndex: 'code',
    width: 100,
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
    width: 200,
  },
  {
    title: '好评率',
    dataIndex: 'favorableComment',
    width: 120,
  },

  {
    title: '卖家',
    dataIndex: 'shopInfo',
    width: 150,
  },
  {
    title: '用户昵称',
    dataIndex: 'nickName',
    width: 120,
  },
  {
    title: '商品评价',
    dataIndex: 'starMark',
    width: 170,
  },
  {
    title: '评价关键词',
    dataIndex: 'keyword',
    width: 150,
  },

  {
    title: '评论时间',
    dataIndex: 'updateTime',
    width: 160,
  },
  {
    title: '是否显示',
    dataIndex: 'isEnable',
    width: 120,
  },

  {
    title: '操作',
    dataIndex: 'operation',
    width: 150,
    fixed: 'right',
  },
]

export const containerConfig = {
  tableColumns,
}

export const filterFormConfig = {
  baseColumns,
  accessColumns,
  rejectColumns,
}
