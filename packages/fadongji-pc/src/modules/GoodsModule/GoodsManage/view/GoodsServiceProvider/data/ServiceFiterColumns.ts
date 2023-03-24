import { FormSchema } from '/@/components/Form'
import {
  getCategoryFunc,
  getBrandFunc,
  getCategoryAllFunc,
  getGoodsTypeFunc,
} from '/@/modules/ContentModule/api/basicFormApis'
import { getGoodsServiceData } from '/@/api/model/dictionaryApi'
import { _ } from '/@/../../shared/src/index'

export const ServiceFiterColumns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    sorter: true,
    width: '220px',
    fixed: 'left',
  },
  {
    title: '编码',
    dataIndex: 'code',
    width: '120px',
  },

  {
    title: '商品类别',
    dataIndex: 'categoryInfo',
    width: '150px',
  },
  {
    title: '商品类型',
    dataIndex: 'categoryType',
    width: '200px',
    ellipsis: true,
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
    width: '100px',
    sorter: true,
  },
  {
    title: '商品标签',
    dataIndex: 'label',
    width: '120px',
    ellipsis: true,
    align:'center'
  },
  {
    title: '零售价格',
    dataIndex: 'cashPrice',
    width: '150px',
    sorter: true,
  },
  {
    title: '库存信息',
    dataIndex: 'availableNumber',
    width: '100px',
  },
  {
    title: '平台服务费',
    dataIndex: 'platformFee',
    width: '120px',
  },
  {
    title: '推荐费',
    dataIndex: 'recommendFee',
    width: '100px',
  },

  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '150px',
    sorter: true,
  },
  {
    title: '商品状态',
    dataIndex: 'status',
    width: '120px',
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    width: '180px',
    sorter: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: '150px',
  },
]

export const getFiterColumns = (nval) => {
  const columns = _.cloneDeep(ServiceFiterColumns)
  console.log(nval)
  // switch (nval) {
  //   case 'one':
  //     columns[columns.length -2]['title'] = '最后更新时间'
  //     break;
  //   case 'two':
  //     columns[columns.length -2]['title'] = '上架时间'
  //     break;
  //   case 'three':
  //     columns[columns.length -2]['title'] = '下架时间'
  //     break;
  //   case 'four':
  //     columns[columns.length -2]['title'] = '违规时间'
  //     break;
  //
  // }
  return columns
}

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
    field: 'brandId',
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
    field: 'shopId',
    component: 'ApiSearchSelect',
    label: '卖家',
    componentProps: {
      allowClear: true,
      placeholder: '请选择卖家',
      immediate: true,
      api: getGoodsServiceData,
      resultField: 'data',
    },
  },
  {
    field: '[startTime, endTime]',
    label: '最后更新时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
    },
  },
]

export const filterFormSchemasByAwait: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '请输入商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    label: '商品类别',
    field: 'categoryId',
    component: 'ApiCascader',
    componentProps: ({ formActionType, formModel }) => {
      return {
        api: getCategoryAllFunc,
        placeholder: '请选择商品类别',
        isLeaf: (record) => {
          return !record.children
        },
        onChange: async (e: any) => {
          if (e.length > 1) {
            const target = e[1]
            const ret: any = await getGoodsTypeFunc(target)
            const { updateSchema } = formActionType
            formModel.categoryType = undefined
            await updateSchema({
              field: 'categoryType',
              defaultValue: '',
              componentProps: {
                options: ret,
              },
            })
          }
        },
      }
    },
  },
  {
    label: '商品类型',
    field: 'categoryType',
    component: 'Select',
    componentProps: {
      options: [],
    },
  },
  {
    field: 'brandId',
    component: 'ApiSelect',
    label: '商品品牌',
    componentProps: {
      placeholder: '请选择商品品牌',
      api: getBrandFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'shopId',
    component: 'ApiSearchSelect',
    label: '卖家',
    componentProps: {
      allowClear: true,
      placeholder: '请选择卖家',
      immediate: true,
      api: getGoodsServiceData,
      resultField: 'data',
    },
  },
  // {
  //   field: '[startTime, endTime]',
  //   label: '最后更新时间',
  //   component: 'RangePicker',
  //   colProps: {
  //     span: 6,
  //   },
  //   componentProps: {
  //     format: 'YYYY-MM-DD HH:mm:ss',
  //     placeholder: ['开始时间', '结束时间'],
  //     showTime: { format: 'HH:mm:ss' },
  //   },
  // },
]
export const lastGoneData: FormSchema[] = [
  {
    field: 'searchTime',
    label: '最后更新时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]
export const accessGoneData: FormSchema[] = [
  {
    field: 'logTime',
    label: '下架时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]

export const hasNoneData: FormSchema[] = [
  {
    field: 'shope',
    component: 'ApiSelect',
    label: '库存状态',
    componentProps: {
      placeholder: '请选择库存状态',
      api: getCategoryFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
export const hasViolationData: FormSchema[] = [
  {
    field: 'shpe',
    component: 'ApiSelect',
    label: '违规下架时间',
    componentProps: {
      placeholder: '请选择下架时间',
      api: getCategoryFunc,

      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
