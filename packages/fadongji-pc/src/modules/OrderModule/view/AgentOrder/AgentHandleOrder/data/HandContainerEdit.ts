import { FormSchema } from '/@/components/Form'
import {
  getColumnsOptiosFunc,
  getCategoryOptiosFunc,
} from '/@/modules/ContentModule/api/basicFormApis'

// answerNum: null
// authorStr: null
// businessType: 1
// categoryId: null
// categoryName: null
// collectionNum: null
// columnId: null
// columnName: null
// commentNum: null
// communityAnswerVOList: null
// communityCommentVOList: null
// content: "对一个想法的内容补充"
// createTime: "2022-06-09 13:09:11"
// creator: "1234567890"
// fileUrl: "http://localhost:20100/"
// goodsId: null
// goodsName: null
// id: "135369281960542208"
// isInformer: 0
// isOffSale: 0
// isRecommend: 0
// licenseId: "1234567890"
// likeNum: null
// mobile: "175****3667"
// mySelfCollectNum: null
// mySelfLikeNum: null
// nickName: "昵称1"
// reason: null
// releaseMobile: null
// releaseNickName: null
// reviewTime: "2022-06-09 13:09:11"
// reviewer: null
// source: "PC"
// status: 0
// title: "一个想法"
// togetherId: null
// togetherName: null
// userId: "1234567890"
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
    component: 'Select',
    label: '售后类型',
    colProps: {
      span: 15,
    },
    componentProps: {
      placeholder: '请选择',
      // onChange: (e) => {
      //   console.log(e)
      // },
      options: [
        {
          label: '仅退款',
          value: '1',
          key: '1',
        },
        {
          label: '退货退款',
          value: '2',
          key: '2',
        },
      ],
    },
    rules: [{ required: true, message: '请选择类型' }],
    // slot: 'titleSlot',
  },
  {
    field: 'categoryId',
    component: 'Select',
    label: '是否到货',
    colProps: {
      span: 15,
    },
    componentProps: {
      placeholder: '请选择',
      // onChange: (e) => {
      //   console.log(e)
      // },
      options: [
        {
          label: '未收到货',
          value: '1',
          key: '1',
        },
        {
          label: '已收到货',
          value: '2',
          key: '2',
        },
      ],
    },
    rules: [{ required: true, message: '请选择是否到货' }],
  },
  {
    field: 'columnId',
    component: 'Select',
    label: '售后原因：',
    colProps: {
      span: 15,
    },
    componentProps: {
      placeholder: '请选择',
      // onChange: (e) => {
      //   console.log(e)
      // },
      options: [
        {
          label: '产品',
          value: '1',
          key: '1',
        },
        {
          label: '物流',
          value: '2',
          key: '2',
        },
      ],
    },
    rules: [{ required: true, message: '请选择原因' }],
  },
  {
    field: 'columId',
    component: 'Input',
    label: '产品数量',
    colProps: {
      span: 15,
    },
    defaultValue: '',
    componentProps: {
      placeholder: '',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入数量' }],
  },
  {
    field: 'content',
    component: 'InputTextArea',
    label: '详细描述',
    // slot: 'contentSlot',
    rules: [{ required: true, message: '请描述问题' }],
  },
  {
    field: 'resource',
    component: 'Input',
    label: '上传图片凭证',
    slot: 'resourceSlot',
  },
  {
    field: 'authId',
    component: 'Input',
    label: '商品价格',
    slot: 'goodsSlot',
    colProps: {
      span: 15,
    },
  },
  {
    field: 'refund',
    component: 'Input',
    label: '确认退款金额',
    slot: 'refundSlot',
    colProps: {
      span: 15,
    },
  },
]

export const filterFormSchemasByAwait: FormSchema[] = [
  {
    field: 'keyWords',
    component: 'Input',
    label: '关键词',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入问题关键词',
      onChange: (e) => {
        console.log(e)
      },
    },
    // slot: 'keyWordsSlot',
  },

  {
    field: 'column',
    component: 'ApiSelect',
    label: '栏目',
    defaultValue: '',
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
    label: '分类',

    defaultValue: '',
    componentProps: {
      placeholder: '请选择分类',
      api: getCategoryOptiosFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'nickName',
    component: 'Input',
    label: '昵称',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入昵称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '手机号',
    defaultValue: '',
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
    field: 'tuijian',
    defaultValue: false,
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
  {
    label: '平台发布',
    component: 'Checkbox',
    field: 'isPlatrom',
    defaultValue: false,
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
