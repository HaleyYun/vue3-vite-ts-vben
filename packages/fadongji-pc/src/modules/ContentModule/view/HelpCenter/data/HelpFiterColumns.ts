import { FormSchema } from '/@/components/Form'
import { getCategoryFunc, getBrandFunc } from '/@/modules/ContentModule/api/basicFormApis'
import { classEvent } from '/@/modules/ContentModule/view/StudyCenter/data/StudyCenterApi'

export const HelpFiterColumns = [
  {
    title: '所属角色',
    dataIndex: 'platformCode',
    width: 150,
    ellipsis: true,
  },
  {
    title: '分类',
    dataIndex: 'categoryName',
    ellipsis: true,
    width: 150,
  },
  {
    title: '标题',
    dataIndex: 'name',
    width: 150,
    ellipsis: true,
  },
  {
    title: '是否启用',
    dataIndex: 'isEnable',
    width: 150,
    ellipsis: true,
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    width: 200,
    ellipsis: true,
  },

  {
    title: '操作',
    dataIndex: 'operation',
    width: 150,
    fixed: 'right',
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
    component: 'ApiSelect',
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
    label: '时间',
    field: 'searchTime',
    component: 'RangePicker',
    componentProps: {},
  },
]

export const filterFormSchemasByAwait: FormSchema[] = [
  {
    field: 'platformCode',
    component: 'Select',
    label: '所属角色',
    componentProps: {
      placeholder: '请选择所属角色',
      options: [
        {
          label: '供应商',
          value: 'supplier',
        },
        {
          label: '服务商',
          value: 'agent',
        },
        {
          label: '修理厂',
          value: 'garage',
        },
        {
          label: '集师傅',
          value: 'skilledWorker',
        },
        {
          label: '旧机买家',
          value: 'oldMachine',
        },
        {
          label: '回收公司',
          value: 'recycling',
        },
        {
          label: '招商经理',
          value: 'investmentManager',
        },
        {
          label: '渠道经理',
          value: 'channelManager',
        },
      ],
    },
  },
  {
    field: 'categoryId',
    component: 'ApiSelect',
    label: '分类',
    componentProps: {
      placeholder: '请选择分类',
      api: classEvent,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    label: '修改时间',
    field: 'searchTime',
    component: 'RangePicker',
    componentProps: {
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '关键字',
    componentProps: {
      placeholder: '请输入关键词',
      onChange: (e) => {
        console.log(e)
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
