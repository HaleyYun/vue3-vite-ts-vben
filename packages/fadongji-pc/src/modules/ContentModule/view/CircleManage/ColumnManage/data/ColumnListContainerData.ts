import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'

const baseColumns = reactive([
  {
    field: 'businessType',
    component: 'Select',
    label: '所属板块',
    componentProps: {
      placeholder: '请选择所属板块',
      options: [{ label: '问答', value: 1 }, { label: '视频', value: 2 }],
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'columnName',
    component: 'Input',
    label: '请输入关键词',
    componentProps: {
      placeholder: '请输入关键词',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'isEnable',
    component: 'Select',
    label: '状态',
    componentProps: {
      placeholder: '请选择状态',
      options: [{ label: '禁用', value: 1 }, { label: '启用', value: 0 }],
      onChange: (e) => {
        console.log(e)
      },
    },
  },
])

const accessColumns: FormSchema[] = []

const rejectColumns: FormSchema[] = []
// businessType: 0
// columnCode: "C000001"
// columnName: "栏目0602"
// createTime: "2022-06-08 15:35:42"
// creator: "1234567890"
// editTime: "2022-06-08 15:35:42"
// editor: "zhaikk"
// id: "132843638517530624"
// isDeleted: 0
// isEnable: 0
// modifier: "1234567890"
// remark: "备注"
// sort: 10
// updateTime: "2022-06-08 15:35:42"
// version: 1
// searchCount: true
// size: 999999
// total: 6
// errors: null
// message: "成功."
// success: true
// time: "2022-06-08 21:52:58"
const tableColumns = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   width: 120,
  //   ellipsis: true,
  // },
  {
    title: '所属板块',
    dataIndex: 'businessType',
    width: 100,
    ellipsis: true,
  },
  {
    title: '栏目名称',
    dataIndex: 'columnName',
    ellipsis: true,
    width: 190,
  },

  {
    title: '状态',
    dataIndex: 'isEnable',
    ellipsis: true,
    width: 160,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    ellipsis: true,
    width: 120,
  },
  {
    title: '最后编辑人',
    dataIndex: 'editorNickName',
    ellipsis: true,
    width: 200,
  },
  {
    title: '最后编辑时间',
    dataIndex: 'editTime',
    width: 160,
    ellipsis: true,
  },
  {
    title: '创建人',
    dataIndex: 'nickName',
    width: 200,
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    ellipsis: true,
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
