import { FormSchema } from '/@/components/Form'
import {
  getBrandFunc,
  getCategoryAllFunc,
  getStorageData,
  getGoodsTypeFunc,
} from '/@/modules/ContentModule/api/basicFormApis'
import { getInvestmentSellerData } from '/@/api/model/dictionaryApi'

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '项目名称',
    componentProps: {
      placeholder: '输入名称搜索',
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
      api: getBrandFunc,
      placeholder: '请选择商品品牌',
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
    component: 'ApiSearchSelect',
    label: '发货仓库',
    componentProps: {
      api: getStorageData,
      allowClear: true,
      immediate: true,
      placeholder: '发货仓库搜索',
    },
    defaultValue: null,
  },
  {
    field: 'time',
    component: 'RangePicker',
    label: '提交时间',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'statusList',
    component: 'Select',
    label: '审核状态',
    componentProps: {
      placeholder: '请输入审核状态',
      options: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '待审核',
          value: 2,
        },
        {
          label: '审核未通过',
          value: 3,
        },
      ],
    },
  },
]
// 商品模块 -- 违规商品上线 -- table Column
export const violationsProjectToOnlineColumns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    width: 300,
    fixed: 'left',
  },
  {
    title: '商品编码',
    dataIndex: 'code',
    width: 120,
  },

  {
    title: '商品类别',
    dataIndex: 'categoryName',
    width: 200,
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
    width: 100,
  },
  {
    title: '投资价格',
    dataIndex: 'cashPrice',
    width: 150,
  },
  {
    title: '投资回报率',
    dataIndex: 'rol',
    width: 120,
    align: 'center',
  },
  {
    title: '发货仓库',
    dataIndex: 'warehouseName',
    width: 150,
  },
  {
    title: '已投量/总投资量',
    dataIndex: 'totalInvestment',
    width: 150,
  },
  {
    title: '品号',
    dataIndex: 'articleNumber',
    width: '120px',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: 200,
  },
  {
    title: '审核情况',
    dataIndex: 'violationStatus',
    width: 140,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 200,
    sorter: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 280,
    fixed: 'right',
    align: 'center',
  },
]
export const violationsProjectToOnlineData = [
  {
    id: '100',
    code: '100001',
    category: '发动机系列-发动机',
    projectName: '江陵动力发动机-B15荣光适用黑色OCV阀',
    brand: '江陵动力发动机-B15荣光适用黑色OCV阀',
    investmentPrice: '3800元  45天账期 4000元',
    returnOnInvestment: '5.55%',
    shippingWarehouse: '杭州平台仓',
    investmentVolume: '500/500',
    seller: '上海左班汽车零部件 13200000000',
    auditStatus: '待审核',
    recentlyUpdateTime: '2022-03-23 12:00:23',
  },
  {
    id: '200',
    code: '200001',
    category: '发动机系列-发动机',
    projectName: '江陵动力发动机-B15荣光适用黑色OCV阀',
    brand: '江陵动力发动机-B15荣光适用黑色OCV阀',
    investmentPrice: '3800元  45天账期 4000元',
    returnOnInvestment: '58.55%',
    shippingWarehouse: '郑州平台仓',
    investmentVolume: '500/1500',
    seller: '上海左班汽车零部件 13200000000',
    auditStatus: '已审核',
    recentlyUpdateTime: '2022-03-23 12:00:23',
  },
  {
    id: '300',
    code: '300001',
    category: '发动机系列-底盘件',
    projectName: '江陵动力发动机-B15荣光适用黑色OCV阀',
    brand: '江陵动力发动机-B15荣光适用黑色OCV阀',
    investmentPrice: '3800元  45天账期 4000元',
    returnOnInvestment: '8.55%',
    shippingWarehouse: '济南平台仓',
    investmentVolume: '500/1500',
    seller: '上海左班汽车零部件 13200000000',
    auditStatus: '未通过审核',
    recentlyUpdateTime: '2022-03-23 12:00:23',
  },
]
