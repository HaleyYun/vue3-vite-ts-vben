import { FormSchema } from '/@/components/Form'
import {
  getCategoryFunc,
  getBrandFunc,
  getUserInfoComplaintDic,
} from '/@/modules/ContentModule/api/basicFormApis'

export const userFiterColumns = [
  {
    title: '用户ID',
    dataIndex: 'userId',
    width: '100px',
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '手机号',
    dataIndex: 'userName',
    width: '120px',
  },
  {
    title: '投诉类型',
    dataIndex: 'categoryName',
    width: 150,
  },
  {
    title: '投诉时间',
    dataIndex: 'createTime',
    width: 150,
  },
  {
    title: '投诉描述',
    dataIndex: 'content',
    width: 180,
  },

  {
    title: '图片',
    dataIndex: 'fileUrl',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'dealStatusStr',
    width: 150,
  },
  {
    title: '处理时间',
    dataIndex: 'dealTime',
    width: 150,
  },
  {
    title: '处理',
    dataIndex: 'dealReason',
    width: 150,
  },
  {
    title: '用户评价',
    dataIndex: 'evaluationContent',
    width: 190,
  },
]

export const opFormConfig: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入商品名称' }],
  },
  {
    field: 'categoryInfo',
    component: 'Select',
    label: '商品类别',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: getCategoryFunc,
      placeholder: '请选择商品类别',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'brandName',
    component: 'ApiSelect',
    label: '商品品牌',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: getBrandFunc,
      placeholder: '请选择商品品牌',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'shopName',
    component: 'Input',
    label: '卖家',
    componentProps: {
      placeholder: '请输入卖家',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入卖家名称' }],
  },
  {
    field: '[startTime, endTime]',
    label: '最后更新时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm:ss' },
    },
  },
]

export const filterFormSchemasByAwait: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '用户名称',
    componentProps: {
      placeholder: '请输入用户名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'categoryId',
    component: 'ApiSelect',
    label: '投诉类型',
    componentProps: {
      placeholder: '请选择投诉类型',
      api: getUserInfoComplaintDic,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'createTime',
    label: '投诉时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },

  {
    field: 'dealStatus',
    component: 'Select',
    label: '处理状态',
    componentProps: {
      placeholder: '请选择处理状态',
      options: [
        {
          label: '未处理',
          value: '0',
        },
        {
          label: '已处理',
          value: '2',
        },
      ],
    },
  },

  {
    field: 'dealTime',
    label: '处理时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]
// export const lastGoneData: FormSchema[] = [
//   {
//     field: '[starTscime, endTime]',
//     label: '最后更新时间',
//     component: 'RangePicker',
//     colProps: {
//       span: 6,
//     },
//     componentProps: {
//       format: 'YYYY-MM-DD HH:mm:ss',
//       placeholder: ['开始时间', '结束时间'],
//       showTime: { format: 'HH:mm:ss' },
//     },
//   },
// ]
// export const accessGoneData: FormSchema[] = [
//   {
//     field: '[starTime, endime]',
//     label: '下架时间',
//     component: 'RangePicker',
//     colProps: {
//       span: 6,
//     },
//     componentProps: {
//       format: 'YYYY-MM-DD HH:mm:ss',
//       placeholder: ['开始时间', '结束时间'],
//       showTime: { format: 'HH:mm:ss' },
//     },
//   },
// ]

// export const hasNoneData: FormSchema[] = [
//   {
//     field: 'shope',
//     component: 'ApiSelect',
//     label: '库存状态',
//     colProps: {
//       span: 6,
//     },
//     componentProps: {
//       placeholder: '请选择库存状态',
//       api: getCategoryFunc,
//       onChange: (e) => {
//         console.log(e)
//       },
//     },
//   },
// ]
// export const hasViolationData: FormSchema[] = [
//   {
//     field: 'shpe',
//     component: 'ApiSelect',
//     label: '违规下架时间',
//     colProps: {
//       span: 6,
//     },
//     componentProps: {
//       placeholder: '请选择下架时间',
//       api: getCategoryFunc,
//       onChange: (e) => {
//         console.log(e)
//       },
//     },
//   },
// ]
