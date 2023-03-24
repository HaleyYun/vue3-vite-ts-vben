import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'
import {
  getColumnsOptiosFunc,
  getCategoryOptiosFunc,
} from '/@/modules/ContentModule/api/basicFormApis'

const baseColumns = reactive([
  {
    label: '请选择时间',
    field: 'searchTime',
    component: 'RangePicker',
    componentProps: {},
  },
  {
    field: 'nickName',
    component: 'Input',
    label: '举报人信息',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入昵称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },


])

const accessColumns: FormSchema[] = []

const rejectColumns: FormSchema[] = [
  // {
  //   label: '仅删除数据',
  //   component: 'Checkbox',
  //   field: 'isDeleted',
  //   defaultValue: false,
  //   // slot: 'onlyDeletedSlot',
  //   // schema: 表单的整个 schemas
  //   // formActionType: 操作表单的函数。与 useForm 返回的操作函数一致
  //   // formModel: 表单的双向绑定对象，这个值是响应式的。所以可以方便处理很多操作
  //   // tableAction: 操作表格的函数，与 useTable 返回的操作函数一致。注意该参数只在表格内开启搜索表单的时候有值，其余情况为null,
  //   componentProps: ({ schema, tableAction, formActionType, formModel }) => {
  //     return {
  //       onChange: (e) => {
  //         console.log(e)
  //         // const { reload } = tableAction
  //         // reload()
  //         // or
  //         // formModel.onlyDeleted = true
  //       },
  //     }
  //   },
  // },
]
// antherUserId: '9876543210'
// businessType: 1
// content: '内容111111111'
// contentId: '134700752848420864'
// id: '100000000002'
// mobile: '175****3667'
// nickName: '昵称1'
// reason: '上传内容违规'
// status: '0'
// tipOffMobile: '175****3668'
// tipOffNickName: '测试用户'
// userId: '1234567890'
const tableColumns = [
  // {
  //   title: '记录ID',
  //   dataIndex: 'id',
  //   width: 180,
  // },
  {
    title: '内容类型',
    dataIndex: 'businessType',
    width: 120,
  },
  {
    title: '举报内容',
    dataIndex: 'title',
    width: 200,
    ellipsis: true,
  },
  {
    title: '被举报人',
    dataIndex: 'tipOffNickName',
    width: 240,
  },
  {
    title: '举报原因',
    dataIndex: 'content',
    width: 200,
    ellipsis: true,
  },
  {
    title: '举报人',
    dataIndex: 'nickName',
    width: 240,
  },
  {
    title: '举报时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 150,
    fixed: 'right'
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
