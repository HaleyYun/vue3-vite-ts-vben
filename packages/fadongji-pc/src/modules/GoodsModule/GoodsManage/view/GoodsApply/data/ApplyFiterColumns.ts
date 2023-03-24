import { FormSchema } from '/@/components/Form'
import {
  getCategoryAllFunc,
  getCategoryFunc,
  getBrandFunc,
  getGoodsTypeFunc,
} from '/@/modules/ContentModule/api/basicFormApis'
import { _ } from '/@/../../shared/src/index'

import {getGoodsSupplierData, getGoodsGoodsSubmitter } from '/@/api/model/dictionaryApi'

export const ApplyFiterColumns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    ellipsis: true,
    sorter: true,
    width: '200px',
    fixed: 'left',
  },
 
  {
    title: '商品ID',
    dataIndex: 'code',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '商品类别',
    dataIndex: 'categoryInfo',
    width: '200px',
    ellipsis: true,
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
    ellipsis: true,
  },
  {
    title: '商品标签',
    dataIndex: 'label',
    width: '120px',
    ellipsis: true,
    align:'center'
  },
  {
    title: '修理厂价格',
    dataIndex: 'cash_price',
    width: '180px',
    sorter: true,
  },
  {
    title: '库存信息',
    dataIndex: 'availableNumber',
    width: '160px',
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
    width: '120px',
    sorter: true,
    ellipsis: true,
  },
  {
    title: '品号',
    dataIndex: 'articleNumber',
    width: '120px',
    ellipsis: true,
  },
 
  {
    title: '提交人',
    dataIndex: 'submitterName',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '商品状态',
    dataIndex: 'status',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    width: '200px',
    sorter: true,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
]
export const platformFiterColumns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    ellipsis: true,
    sorter: true,
    width: '200px',
    fixed: 'left',
  },
  {
    title: '商品ID',
    dataIndex: 'code',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '商品类别',
    dataIndex: 'categoryInfo',
    width: '200px',
    ellipsis: true,
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
    ellipsis: true,
  },
  {
    title: '商品标签',
    dataIndex: 'label',
    width: '120px',
    ellipsis: true,
    align:'center'
  },
  {
    title: '修理厂价格',
    dataIndex: 'cash_price',
    width: '180px',
    sorter: true,
  },
  {
    title: '库存信息',
    dataIndex: 'availableNumber',
    width: '160px',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '120px',
    sorter: true,
    ellipsis: true,
  },
  {
    title: '品号',
    dataIndex: 'articleNumber',
    width: '120px',
    ellipsis: true,
  },

  {
    title: '提交人',
    dataIndex: 'submitterName',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '商品状态',
    dataIndex: 'status',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    width: '200px',
    sorter: true,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
]

export const getColums = () => {
  const columns = _.cloneDeep(ApplyFiterColumns)
  // switch (key) {
  //   case 'one':
  //     columns[columns.length - 2].dataIndex = 'updateTime'
  //     break
  //   case 'two':
  //     columns = _.cloneDeep(ApplyFiterColumns).filter((item) => item.dataIndex != 'availableNumber')
  //     columns.splice(7, 0, {
  //       title: '提交人',
  //       dataIndex: 'submitterName',
  //       width: '180px',
  //     })
  //     columns[columns.length - 2]['title'] = '提交时间'
  //     break
  //   case 'three':
  //     columns = _.cloneDeep(ApplyFiterColumns).filter((item) => item.dataIndex != 'availableNumber')
  //     columns[columns.length - 2]['title'] = '审核时间'
  //     break
  //   case 'four':
  //     columns[columns.length - 2]['title'] = '上架时间'
  //     break
  //   case 'five':
  //     columns[columns.length - 2]['title'] = '下架时间'
  //     break
  //   case 'six':
  //     columns[columns.length - 2]['title'] = '违规时间'
  //     break
  // }
  return columns
}
export const platformColumns = () => {
  const columns = _.cloneDeep(platformFiterColumns)
  return columns
}

export const opFormConfig: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    disabledLabelWidth: true,
    componentProps: {
      placeholder: '请输入商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入商品名称' }],
  },
  {
    field: 'categoryId',
    component: 'ApiSelect',
    label: '商品类别',
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
    disabledLabelWidth: true,
    componentProps: {
      placeholder: '请输入卖家',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入卖家名称' }],
  },
]

export const filterFormSchemasByAwait: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '名称',
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
      api: getGoodsSupplierData,
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
    colProps: {
      span: 8,
    },
    componentProps: {
      style: {
        width: '100%',
      },
      placeholder: ['开始时间', '结束时间'],
    },
  },
]
export const accessGoneData: FormSchema[] = [
  {
    field: 'logTime',
    label: '下架时间',
    component: 'RangePicker',
    colProps: {
      span: 8,
    },
    componentProps: {
      style: {
        width: '100%',
      },
      placeholder: ['开始时间', '结束时间'],
    },
  },
]

export const submitData: FormSchema[] = [
  {
    field: 'submitter',
    component: 'ApiSearchSelect',
    label: '提交人',
    componentProps: {
      allowClear: true,
      placeholder: '请选择提交人',
      immediate: true,
      api: getGoodsGoodsSubmitter,
      resultField: 'data',
    },
  },
]
export const hasViolationData: FormSchema[] = [
  {
    field: 'shpe',
    component: 'ApiSelect',
    label: '违规下架时间',
    colProps: {
      span: 8,
    },
    componentProps: {
      style: {
        width: '100%',
      },
      placeholder: '请选择下架时间',
      api: getCategoryFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
