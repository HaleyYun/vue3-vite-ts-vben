import { FormSchema } from '/@/components/Form'
import {
  getColumnsOptiosFunc,
  getColumnsOIdeaFunc,
  getCategoryOptiosFunc,
} from '/@/modules/ContentModule/api/basicFormApis'

export const thinkListContainerListTableColumns = [
  // {
  //   title: '记录ID',
  //   dataIndex: 'id',
  //   width: '180px',
  //   ellipsis: true,
  // },
  {
    title: '想法',
    dataIndex: 'questionAndContent',
    width: '300px',
    ellipsis: true,
  },
  {
    title: '栏目',
    dataIndex: 'columnName',
    width: '180px',
    ellipsis: true,
  },
  {
    title: '作者',
    dataIndex: 'nickName',
    width: '140px',
    ellipsis: true,
  },
  {
    title: '身份',
    dataIndex: 'platformIdentity',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: '130px',
    ellipsis: true,
  },
  {
    title: '浏览量',
    dataIndex: 'viewNum',
    width: '80px',
    ellipsis: true,
  },
  {
    title: '点赞',
    dataIndex: 'likeNum',
    width: '80px',
    ellipsis: true,
  },
  {
    title: '收藏',
    dataIndex: 'collectionNum',
    width: '80px',
    ellipsis: true,
  },
  {
    title: '评论',
    dataIndex: 'commentNum',
    width: '80px',
    ellipsis: true,
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: '180px',
    ellipsis: true,
  },

  {
    title: '状态',
    dataIndex: 'status',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
]

export const thinkListColumns = [
  // {
  //   title: '记录ID',
  //   dataIndex: 'id',
  //   width: '180px',
  //   ellipsis: true,
  // },
  {
    title: '想法',
    dataIndex: 'questionAndContent',
    width: '300px',
    ellipsis: true,
  },
  {
    title: '栏目',
    dataIndex: 'columnName',
    width: '180px',
    ellipsis: true,
  },
  {
    title: '作者',
    dataIndex: 'nickName',
    width: '140px',
    ellipsis: true,
  },
  {
    title: '身份',
    dataIndex: 'platformIdentity',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: '130px',
    ellipsis: true,
  },
  {
    title: '浏览量',
    dataIndex: 'viewNum',
    width: '80px',
    ellipsis: true,
  },
  {
    title: '点赞',
    dataIndex: 'likeNum',
    width: '80px',
    ellipsis: true,
  },
  {
    title: '收藏',
    dataIndex: 'collectionNum',
    width: '80px',
    ellipsis: true,
  },
  {
    title: '评论',
    dataIndex: 'commentNum',
    width: '80px',
    ellipsis: true,
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: '180px',
    ellipsis: true,
  },

  {
    title: '状态',
    dataIndex: 'status',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '审核时间',
    dataIndex: 'reviewTime',
    width: '180px',
    ellipsis: true,
  },

  {
    title: '审核人',
    dataIndex: 'reviewer',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
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
    componentProps: {
      placeholder: '请输入标题',
    },
    rules: [{ required: true, message: '请输入标题' }],
  },
  {
    field: 'categoryId',
    component: 'ApiSelect',
    label: '请选择品类',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请选择品类',
      api: getCategoryOptiosFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'columnName',
    component: 'ApiSelect',
    label: '请选择栏目',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请选择栏目',
      api: getColumnsOptiosFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'content',
    component: 'InputTextArea',
    label: '请输入想法',
  },
  {
    field: 'resource',
    component: 'Input',
    label: '图片/视频',
    slot: 'resourceSlot',
  },
  {
    field: 'isVisible',
    component: 'Input',
    label: '可见权限',
    slot: 'allowSlot',
  },
  {
    field: 'likeCount',
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
    field: 'content',
    component: 'Input',
    label: '关键词',
    componentProps: {
      placeholder: '请输入问题关键词',
      onChange: (e) => {
        console.log(e)
      },
    },
    // slot: 'keyWordsSlot',
  },

  {
    field: 'columnId',
    component: 'ApiSelect',
    label: '栏目',
    componentProps: {
      placeholder: '请选择栏目',
      api: getColumnsOIdeaFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'platformCode',
    component: 'Select',
    label: '身份',
    componentProps: {
      placeholder: '请选择身份',
      options: [
        {
          label: '供应商',
          value: 'supplier',
          key: 'supplier',
        },
        {
          label: '服务商',
          value: 'agent',
          key: 'agent',
        },
        {
          label: '修理厂',
          value: 'garage',
          key: 'garage',
        },
        {
          label: '渠道经理',
          value: 'channelManager',
          key: 'channelManager',
        },
        {
          label: '运营平台',
          value: 'op',
          key: 'op',
        },
        {
          label: '招商经理',
          value: 'investmentManager',
          key: 'investmentManager',
        },
        {
          label: '集师傅',
          value: 'skilledWorker',
          key: 'skilledWorker',
        },
        {
          label: '回收公司',
          value: 'recycling',
          key: 'recycling',
        },
        {
          label: '旧机买家',
          value: 'oldMachine',
          key: 'oldMachine',
        },
      ],
    },
  },
  {
    field: 'nickName',
    component: 'Input',
    label: '作者',
    componentProps: {
      placeholder: '请输入作者',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '手机号',
    componentProps: {
      placeholder: '请输入手机号',
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
    field: 'isRecommend',
    defaultValue: false,
    colProps: {
      span: 2,
    },
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
  {
    label: '平台发布',
    component: 'Checkbox',
    field: 'source',
    defaultValue: false,
    colProps: {
      span: 2,
    },
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

export const hasNoneData: FormSchema[] = [
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

export const getOpFormConfig = (type = 'think') => {
  const opFormConfig: FormSchema[] = [
    // {
    //   field: 'title',
    //   component: 'Input',
    //   label: '问题',
    //   colProps: {
    //     span: 8,
    //   },
    //   defaultValue: '',
    //   componentProps: {
    //     placeholder: '请输入问题',

    //   },
    //   rules: [{ required: true, message: '请输入问题' }],

    // },
    {
      field: 'columnId',
      component: 'ApiSelect',
      label: '请选择栏目',
      colProps: {
        span: 7,
      },
      componentProps: {
        placeholder: '请选择栏目',
        api: getColumnsOptiosFunc,
        onChange: (e) => {
          console.log(e)
        },
      },
    },
    {
      field: 'categoryId',
      component: 'ApiSelect',
      label: '请选择品类',
      colProps: {
        span: 7,
      },
      componentProps: {
        placeholder: '请选择品类',
        api: getCategoryOptiosFunc,
        onChange: (e) => {
          console.log(e)
        },
      },
    },
    {
      field: 'cate',
      component: 'ApiSelect',
      label: '请选择共创项目',
      colProps: {
        span: 7,
        offset: 1,
      },
      componentProps: {
        placeholder: '请选择共创项目',
        onChange: (e) => {
          console.log(e)
        },
      },
    },

    {
      field: 'content',
      component: 'InputTextArea',
      label: `补充${type == 'think' ? '想法' : '内容'}`,
      componentProps: {
        maxlength: 50,
      },
      rules: [{ required: true, message: '请输入' }],
    },
    {
      field: 'resource',
      component: 'Input',
      label: '图片/视频',
      slot: 'resourceSlot',
    },
    {
      field: 'isVisible',
      component: 'Input',
      label: '可见权限',
      slot: 'allowSlot',
      defaultValue: 0,
    },
    {
      field: 'likeCount',
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
  return opFormConfig
}
