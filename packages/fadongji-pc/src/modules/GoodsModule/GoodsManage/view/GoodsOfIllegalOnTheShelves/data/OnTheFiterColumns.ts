import { FormSchema } from '/@/components/Form'
import {
  getCategoryFunc,
  getBrandFunc,
  getCategoryAllFunc,
  getGoodsTypeFunc,
} from '/@/modules/ContentModule/api/basicFormApis'
import { getGoodsSellerData } from '/@/api/model/dictionaryApi'

export const OnTheFiterColumns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    width: '200px',
    sorter: true,
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
    width: '220px',
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
    width: '150px',
    sorter: true,
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
    width: '120px',
  },

  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '150px',
    sorter: true,
  },
  {
    title: '平台服务费',
    dataIndex: 'platformService',
    width: '220px',
    sorter: true,
  },

  {
    title: '品号',
    dataIndex: 'articleNumber',
    width: '120px',
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
    width: '150px',
    fixed: 'right',
  },
]

export const opFormConfig: FormSchema[] = [
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
    rules: [{ required: true, message: '请输入商品名称' }],
  },
  {
    field: 'categoryInfo',
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
    field: 'shopId',
    component: 'ApiSearchSelect',
    label: '卖家',
    componentProps: {
      allowClear: true,
      placeholder: '请选择卖家',
      immediate: true,
      api: getGoodsSellerData,
      resultField: 'data',
    },
  },
  {
    field: '[startTime, endTime]',
    label: '最后更新时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
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
        }
      }
    },
  },
  {
    label: '商品类型',
    field: 'categoryType',
    component: 'Select',
    componentProps: {
      placeholder: '请选择商品类别后操作',
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
      api: getGoodsSellerData,
      resultField: 'data',
    },
  },
  {
    field: 'searchTime',
    label: '提交时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
    },
    },
  },
  {
    field: 'statusList',
    component: 'Select',
    label: '审核情况',
    componentProps: {
      placeholder: '请选择',
      options: [
        {
          label: '全部',
          value: null,
        },
        {
          label: '待审核',
          value: '2',
        },
        {
          label: '审核未通过',
          value: '3',
        },

      ],
    },
  },
]