import { FormSchema } from '/@/components/Form'
import { getCategoryFunc, getBrandFunc } from '/@/modules/ContentModule/api/basicFormApis'
import { classEvent } from '/@/modules/ContentModule/view/StudyCenter/data/StudyCenterApi'

export const Classification = [
  {
    title: '所属角色',
    dataIndex: 'platformCode',
    width: '100px',
  },
  {
    title: '分类名称',
    dataIndex: 'name',
    width: '300px',
  },
  {
    title: '内容数量',
    dataIndex: 'sort',
    width: '120px',
  },
  {
    title: '是否启用',
    dataIndex: 'isEnable',
    width: '100px',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '160px',
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
    label: '分类名称',
    componentProps: {
      placeholder: '请选择分类',
      api: classEvent,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
