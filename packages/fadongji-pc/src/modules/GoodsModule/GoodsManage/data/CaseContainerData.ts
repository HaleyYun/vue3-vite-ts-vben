import { FormSchema } from '/@/components/Form'
import { getColumnsOptiosFunc } from '/@/modules/GoodsModule/GoodsManage/api/basicFormApis'

export const thinkListContainerListTableColumns = [
  {
    title: '记录ID',
    dataIndex: 'id',
    width: '100px',
  },
  {
    title: '想法',
    dataIndex: 'questionAndContent',
  },
  {
    title: '作者',
    dataIndex: 'nickNameAndMobile',
    width: '220px',
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: '160px',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '100px',
  },
  {
    title: '审核时间',
    dataIndex: 'reviewTime',
    width: '160px',
  },
  {
    title: '审核人',
    dataIndex: 'reviewer',
    width: '120px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '340px',
  },
]

export const opFormConfig: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '标题',
    colProps: {
      span: 8,
    },
    defaultValue: '',
    componentProps: {
      placeholder: '请输入标题',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入标题' }],
    slot: 'titleSlot',
  },
  {
    field: 'categoryId',
    component: 'ApiSelect',
    label: '请选择品类',
    colProps: {
      span: 8,
    },
    defaultValue: '',
    componentProps: {
      placeholder: '请选择商品类别',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'columnId',
    component: 'ApiSelect',
    label: '请选择栏目',
    colProps: {
      span: 8,
    },
    defaultValue: '',
    componentProps: {
      placeholder: '请选择栏目',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'content',
    component: 'Input',
    label: '请输入想法',
    slot: 'contentSlot',
  },
  {
    field: 'resource',
    component: 'Input',
    label: '图片/视频',
    slot: 'resourceSlot',
  },
  {
    field: 'allow',
    component: 'Input',
    label: '可见权限',
    slot: 'allowSlot',
  },
  {
    field: 'prise',
    component: 'InputNumber',
    label: '点赞数',
    colProps: {
      span: 8,
    },
    defaultValue: parseInt(Math.random() * 90) + 10,
    componentProps: {
      placeholder: '请输入点赞数',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'authId',
    component: 'ApiSelect',
    label: '请选择作者',
    colProps: {
      span: 8,
    },
    defaultValue: '',
    componentProps: {
      placeholder: '请选择作者',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const filterFormSchemasByAwait: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '属性名称',
    componentProps: {
      placeholder: '请输入属性名称',
      onChange: (e) => {
        console.log(e)
      },
    },
    // slot: 'keyWordsSlot',
  },

  {
    field: 'column',
    component: 'ApiSelect',
    label: '商品类别',
    componentProps: {
      placeholder: '请选择类别',
      api: getColumnsOptiosFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const accessGoneData: FormSchema[] = [
  {
    label: '推荐内容',
    component: 'Checkbox',
    field: 'tuijian',
    defaultValue: false,
    componentProps: ({}) => {
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
  {
    label: '平台发布',
    component: 'Checkbox',
    field: 'isPlatrom',
    defaultValue: false,
    componentProps: ({}) => {
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

export const hasNoneData: FormSchema[] = [
  {
    label: '仅删除数据',
    component: 'Checkbox',
    field: 'onlyDeleted',
    defaultValue: false,
    // slot: 'onlyDeletedSlot',
    // schema: 表单的整个 schemas
    // formActionType: 操作表单的函数。与 useForm 返回的操作函数一致
    // formModel: 表单的双向绑定对象，这个值是响应式的。所以可以方便处理很多操作
    // tableAction: 操作表格的函数，与 useTable 返回的操作函数一致。注意该参数只在表格内开启搜索表单的时候有值，其余情况为null,
    componentProps: ({}) => {
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
