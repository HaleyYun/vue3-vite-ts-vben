import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'
const baseColumns = reactive([
  {
    field: 'name',
    component: 'Input',
    label: '品牌名称',
    defaultValue: '',
    componentProps: {
      placeholder: '输入品牌名',
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
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
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
    title: '品牌id',
    dataIndex: 'code',
    width: 120,
  },
  {
    title: '品牌名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '品牌首字母',
    dataIndex: 'initials',
    width: 190,
  },

  {
    title: '品牌logo',
    dataIndex: 'logoUrl',
    width: 160,
  },
  {
    title: '是否热门',
    dataIndex: 'isHot',
    width: 120,
  },
  {
    title: '是否启用',
    dataIndex: 'isEnable',
    width: 120,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 240,
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
