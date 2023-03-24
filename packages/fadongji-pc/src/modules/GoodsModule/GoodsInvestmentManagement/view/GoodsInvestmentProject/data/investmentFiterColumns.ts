import { FormSchema } from '/@/components/Form'
import {
  getCategoryFunc,
  getBrandFunc,
  getCategoryAllFunc,
  getGoodsTypeFunc,
} from '/@/modules/ContentModule/api/basicFormApis'
import { getInvestmentSellerData, getGoodsInvestmentSubmitter } from '/@/api/model/dictionaryApi'


export const investmentFiterColumns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    width: '180px',
    sorter: true,
    fixed: 'left',
  },
  {
    title: '项目编码',
    dataIndex: 'code',
    width: '120px',
  },
  {
    title: '商品类别',
    dataIndex: 'categoryName',
    width: '180px',
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
    width: '120px',
    sorter: true,
  },
  {
    title: '投资价格',
    dataIndex: 'cashPrice',
    width: '200px',
    sorter: true,
  },
  {
    title: '投资回报率',
    dataIndex: 'rol',
    width: '120px',
    sorter: true,
  },
  {
    title: '发货仓库',
    dataIndex: 'warehouseName',
    width: '250px',
  },
  {
    title: '已投量/总可投资量',
    dataIndex: 'investmentNum',
    width: '160px',
  },
  {
    title: '品号',
    dataIndex: 'articleNumber',
    width: '120px',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '220px',
    sorter: true,
  },
  {
    title: '平台服务费',
    dataIndex: 'platformService',
    width: '220px',
    sorter: true,
  },
  {
    title: '提交人',
    dataIndex: 'submitterName',
    width: '200px',
  },
  {
    title: '项目状态',
    dataIndex: 'status',
    width: '120px',
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    width: '200px',
    sorter: true,
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
    title: '项目名称',
    dataIndex: 'name',
    width: '180px',
    sorter: true,
    fixed: 'left',
  },
  {
    title: '项目编码',
    dataIndex: 'code',
    width: '120px',
  },
  {
    title: '商品类别',
    dataIndex: 'categoryName',
    width: '180px',
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
    width: '120px',
    sorter: true,
  },
  {
    title: '投资价格',
    dataIndex: 'cashPrice',
    width: '200px',
    sorter: true,
  },
  {
    title: '投资回报率',
    dataIndex: 'rol',
    width: '120px',
    sorter: true,
  },
  {
    title: '发货仓库',
    dataIndex: 'warehouseName',
    width: '250px',
  },
  {
    title: '已投量/总可投资量',
    dataIndex: 'investmentNum',
    width: '160px',
  },
  {
    title: '品号',
    dataIndex: 'articleNumber',
    width: '120px',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '220px',
    sorter: true,
  },
  {
    title: '提交人',
    dataIndex: 'submitterName',
    width: '200px',
  },
  {
    title: '项目状态',
    dataIndex: 'status',
    width: '120px',
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    width: '200px',
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
    field: 'updateTime',
    label: '最后更新时间',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
    },
  },
]

export const filterFormSchemasByAwait: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '项目名称',
    componentProps: {
      placeholder: '请输入项目名称',
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
      api: getInvestmentSellerData,
      resultField: 'data',
    },
  },
  {
    field: 'warehouseId',
    component: 'ApiSelect',
    label: '发货仓库',
    slot: 'remoteStorageSearch',
    componentProps: {
      allowClear: true,
      placeholder: '发货仓库搜索',
    },
    defaultValue: null,
  },

]
export const lastGoneData: FormSchema[] = [
  {
    field: 'updateTime',
    label: '最后更新时间',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%'
      }
    },
  },
]
export const accessGoneData: FormSchema[] = [
  {
    field: 'violationTime',
    label: '审核时间',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%'
      }
    },
  },
]

export const hasNoneData: FormSchema[] = [
  {
    field: 'violationTime',
    label: '提交时间',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%'
      }
    },
  },
]
export const hasViolationData: FormSchema[] = [
  {
    field: 'violationTime',
    component: 'RangePicker',
    label: '上架时间',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%'
      }
    },
  },
]
export const fiveGoneData: FormSchema[] = [
  {
    field: 'violationTime',
    component: 'RangePicker',
    label: '下架时间',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%'
      }
    },
  },
]

export const sixGoneData: FormSchema[] = [
  {
    field: 'violationTime',
    component: 'RangePicker',
    label: '上架时间',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%'
      }
    },
  },
  {
    field: 'violationTime',
    component: 'RangePicker',
    label: '完成时间',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%'
      }
    },
  },
]

export const sevenGoneData: FormSchema[] = [
  {
    field: 'List',
    component: 'Select',
    label: '违规类型',
    componentProps: {
      placeholder: '请选择',
      // mode: 'tags',
      options: [
        {
          label: '项目违规',
          value: '0',
        },
        {
          label: '商品违规',
          value: '1',
        },
      ],
    },
  },
  {
    field: 'violationTime',
    component: 'RangePicker',
    label: '违规时间',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%'
      }
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
      api: getGoodsInvestmentSubmitter,
      resultField: 'data',
    },
  },
]

export const adaptationModelColumn = [
  {
    title: '车系',
    dataIndex: 'model',
    align: 'center',
  },
  {
    title: '发动机型号',
    dataIndex: 'engineModel',
    align: 'center',
  },
  {
    title: '排量(L)',
    dataIndex: 'displacement',
    align: 'center',
  },
  {
    title: '功率',
    dataIndex: 'powerKw',
    align: 'center',
  },
]
