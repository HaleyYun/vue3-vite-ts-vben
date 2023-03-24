import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'
import {
  getColumnsOptiosFunc,
  getCategoryOptiosFunc,
  getPlatformCode
} from '/@/modules/ContentModule/api/basicFormApis'

const baseColumns = reactive([
  {
    field: 'comment',
    component: 'Input',
    label: '回答关键词',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入回答关键词',
      onChange: (e) => {
        console.log(e)
      },
    },
  },


  {
    field: 'columnId',
    component: 'ApiSelect',
    label: '请选择栏目',
    componentProps: {
      placeholder: '请选择栏目',
      api: getColumnsOptiosFunc,
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
    field: 'time',
    label: '请选择时间',
    component: 'RangePicker',
    componentProps: {
      // span: 7,
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },

  {
    field: 'nickName',
    component: 'Input',
    label: '作者',
    componentProps: {
      placeholder: '请输入作者名称',
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
]);

const accessColumns: FormSchema[] = [

  {
    label: '推荐内容',
    component: 'Checkbox',
    field: 'isRecommend',
    defaultValue: false,
    colProps: {
      span: 2,
    },
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
    field: 'source',
    defaultValue: false,
    colProps: {
      span: 2,
    },

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
const tableColumns = [
  // {
  //   title: '记录ID',
  //   dataIndex: 'id',
  //   width: 200,
  //   ellipsis: true,
  // },
  {
    title: '回答',
    dataIndex: 'comment',
    width: 190,
    ellipsis: true,
  },
  {
    title: '问题',
    dataIndex: 'questionAndContent',
    width: 300,
    ellipsis: true,

  },
  {
    title: '栏目',
    dataIndex: 'columnName',
    width: 300

  },

  {
    title: '作者',
    dataIndex: 'nickName',
    width: 160,
    ellipsis: true,
  },
  {
    title: '身份',
    dataIndex: 'platformIdentity',
    width: 160,
    ellipsis: true,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 160,
    ellipsis: true,
  },
  {
    title: '浏览量',
    dataIndex: 'viewNum',
    width: 100,
    ellipsis: true,
  },
  {
    title: '点赞',
    dataIndex: 'likeNum',
    width: 100,
    ellipsis: true,
  },
  {
    title: '收藏',
    dataIndex: 'collectionNum',
    width: 100,
    ellipsis: true,
  },
  {
    title: '评论',
    dataIndex: 'commentNum',
    width: 100,
    ellipsis: true,
  },

  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: 180,
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 160,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 180,
    fixed: 'right'
  },
]

const tableColumnsPart = [
  // {
  //   title: '记录ID',
  //   dataIndex: 'id',
  //   width: 200,
  //   ellipsis: true,
  // },
  {
    title: '回答',
    dataIndex: 'comment',
    width: 120,
  },
  {
    title: '问题',
    dataIndex: 'questionAndContent',
    width: 300

  },
  {
    title: '栏目',
    dataIndex: 'columnName',
    width: 300

  },

  {
    title: '作者',
    dataIndex: 'nickName',
    width: 160,
    ellipsis: true,
  },
  {
    title: '身份',
    dataIndex: 'platformIdentity',
    width: 160,
    ellipsis: true,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 160,
    ellipsis: true,
  },
  {
    title: '浏览量',
    dataIndex: 'viewNum',
    width: 100,
    ellipsis: true,
  },
  {
    title: '点赞',
    dataIndex: 'likeNum',
    width: 100,
    ellipsis: true,
  },
  {
    title: '收藏',
    dataIndex: 'collectionNum',
    width: 100,
    ellipsis: true,
  },
  {
    title: '评论',
    dataIndex: 'commentNum',
    width: 100,
    ellipsis: true,
  },

  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: 180,
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 160,
    ellipsis: true,
  },
  {
    title: '审核时间',
    dataIndex: 'reviewTime',
    width: 180,
    ellipsis: true,
  },
  {
    title: '审核人',
    dataIndex: 'reviewer',
    width: 160,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 180,
    fixed: 'right'
  },
]

export const containerConfig = {
  tableColumns,
  tableColumnsPart
}

export const filterFormConfig = {
  baseColumns,
  accessColumns,
  rejectColumns,
}
