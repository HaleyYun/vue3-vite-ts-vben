import { FormSchema } from '/@/components/Form'
import { getCategoryFunc, getBrandFunc } from '/@/modules/ContentModule/api/basicFormApis'
export const filterServiceProviderFormByAwait: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'categoryInfo',
    label: '商品类别',
    component: 'ApiSelect',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请选择商品分类',
      api: getCategoryFunc,
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
      span: 6,
    },
    componentProps: {
      placeholder: '请选择商品品牌',
      api: getBrandFunc,
    },
  },
  {
    field: 'shopName',
    component: 'Input',
    label: '卖家',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入卖家',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: '[startTime, endTime]',
    label: '时间范围',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm:ss' },
    },
  },
]

// 服务商商品列表 --  违规
export const filterDynamicViolations = [
  {
    field: 'InventoryStatus',
    component: 'Select',
    label: '库存状态',
    colProps: {
      span: 6,
    },
    defaultValue: '1',
    componentProps: {
      placeholder: '请选择库存状态',
      options: [
        {
          label: '全部',
          value: '1',
        },
        {
          label: '库存正常',
          value: '2',
        },
        {
          label: '安全库存预警',
          value: '3',
        },
        {
          label: '无货',
          value: '4',
        },
      ],
    },
  },
]

// 服务商商品列表 -- table的 column
export const serviceProviderColumn = {
  one: [
    { title: '编码', dataIndex: 'code', width: 100 },
    { title: '商品类别', dataIndex: 'categoryInfo', width: 300 },
    { title: '商品名称', dataIndex: 'name', width: 300 },
    { title: '品牌', dataIndex: 'brandName', width: 300 },
    { title: '出厂价格', dataIndex: 'cashPrice', width: 200 },
    // { title: '库存信息', dataIndex: 'inventoryInformation', width: 80 },
    { title: '卖家', dataIndex: 'shopName', width: 300 },
    { title: '提交人', dataIndex: 'submitterName', width: 80 },
    { title: '商品状态', dataIndex: 'status', width: 120 },
    { title: '提交时间', dataIndex: 'updateTime', width: 200 },
    { title: '操作', dataIndex: 'action', width: 250, fixed: 'right', align: 'center' },
  ],
  two: [
    { title: '编码', dataIndex: 'code', width: 100 },
    { title: '商品类别', dataIndex: 'categoryInfo', width: 300 },
    { title: '商品名称', dataIndex: 'name', width: 300 },
    { title: '品牌', dataIndex: 'brandName', width: 300 },
    { title: '出厂价格', dataIndex: 'cashPrice', width: 200 },
    // { title: '库存信息', dataIndex: 'inventoryInformation', width: 80 },
    { title: '卖家', dataIndex: 'shopName', width: 300 },
    { title: '提交人', dataIndex: 'submitterName', width: 80 },
    { title: '商品状态', dataIndex: 'status', width: 120 },
    { title: '提交时间', dataIndex: 'updateTime', width: 200 },
    { title: '操作', dataIndex: 'action', width: 250, fixed: 'right', align: 'center' },
  ],
  three: [
    { title: '编码', dataIndex: 'code', width: 100 },
    { title: '商品类别', dataIndex: 'categoryInfo', width: 300 },
    { title: '商品名称', dataIndex: 'name', width: 300 },
    { title: '品牌', dataIndex: 'brandName', width: 300 },
    { title: '出厂价格', dataIndex: 'cashPrice', width: 200 },
    // { title: '库存信息', dataIndex: 'inventoryInformation', width: 80 },
    { title: '卖家', dataIndex: 'shopName', width: 300 },
    { title: '提交人', dataIndex: 'submitterName', width: 80 },
    { title: '商品状态', dataIndex: 'status', width: 120 },
    { title: '提交时间', dataIndex: 'updateTime', width: 200 },
    { title: '操作', dataIndex: 'action', width: 250, fixed: 'right', align: 'center' },
  ],
  four: [
    { title: '编码', dataIndex: 'code', width: 100 },
    { title: '商品类别', dataIndex: 'categoryInfo', width: 300 },
    { title: '商品名称', dataIndex: 'name', width: 300 },
    { title: '品牌', dataIndex: 'brandName', width: 300 },
    { title: '出厂价格', dataIndex: 'cashPrice', width: 200 },
    // { title: '库存信息', dataIndex: 'inventoryInformation', width: 80 },
    { title: '卖家', dataIndex: 'shopName', width: 300 },
    { title: '提交人', dataIndex: 'submitterName', width: 80 },
    { title: '商品状态', dataIndex: 'status', width: 120 },
    { title: '提交时间', dataIndex: 'updateTime', width: 200 },
    { title: '操作', dataIndex: 'action', width: 250, fixed: 'right', align: 'center' },
  ],
  five: [
    { title: '编码', dataIndex: 'code', width: 100 },
    { title: '商品类别', dataIndex: 'categoryInfo', width: 300 },
    { title: '商品名称', dataIndex: 'name', width: 300 },
    { title: '品牌', dataIndex: 'brandName', width: 300 },
    { title: '出厂价格', dataIndex: 'cashPrice', width: 200 },
    // { title: '库存信息', dataIndex: 'inventoryInformation', width: 80 },
    { title: '卖家', dataIndex: 'shopName', width: 300 },
    { title: '提交人', dataIndex: 'submitterName', width: 80 },
    { title: '商品状态', dataIndex: 'status', width: 120 },
    { title: '提交时间', dataIndex: 'updateTime', width: 200 },
    { title: '操作', dataIndex: 'action', width: 250, fixed: 'right', align: 'center' },
  ],
  six: [
    { title: '编码', dataIndex: 'code', width: 100 },
    { title: '商品类别', dataIndex: 'categoryInfo', width: 300 },
    { title: '商品名称', dataIndex: 'name', width: 300 },
    { title: '品牌', dataIndex: 'brandName', width: 300 },
    { title: '出厂价格', dataIndex: 'cashPrice', width: 200 },
    // { title: '库存信息', dataIndex: 'inventoryInformation', width: 80 },
    { title: '卖家', dataIndex: 'shopName', width: 300 },
    { title: '提交人', dataIndex: 'submitterName', width: 80 },
    { title: '商品状态', dataIndex: 'status', width: 120 },
    { title: '提交时间', dataIndex: 'updateTime', width: 200 },
    { title: '操作', dataIndex: 'action', width: 250, fixed: 'right', align: 'center' },
  ],
}
// 服务商商品列表 -- mock 数据
export const serviceProviderData = {
  one: [
    {
      id: '100',
      code: '100',
      category: '发动机系列-发动机',
      goodsName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
      brand: '引爆点',
      exFactoryPrice: '3800元 45天账期 4000.55元',
      inventoryInformation: '6',
      seller: '上海左班汽车零部件 13200000000',
      goodsStatus: '待售',
      lastUpdateTime: '2022-03-23 12:00:00',
    },
    {
      id: '200',
      code: '200',
      category: '发动机系列-发动机',
      goodsName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
      brand: '引爆点',
      exFactoryPrice: '3800元 45天账期 4000.55元',
      inventoryInformation: '6',
      seller: '上海左班汽车零部件 13200000000',
      goodsStatus: '待售',
      lastUpdateTime: '2022-03-23 12:00:00',
    },
  ],
  two: [
    {
      id: '300',
      code: '300',
      category: '发动机系列-发动机',
      goodsName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
      brand: '引爆点',
      exFactoryPrice: '3800元 45天账期 4000.55元',
      inventoryInformation: '6',
      seller: '上海左班汽车零部件 13200000000',
      goodsStatus: '待售',
      lastUpdateTime: '2022-03-23 12:00:00',
    },
  ],
  three: [
    {
      id: '400',
      code: '400',
      category: '发动机系列-发动机',
      goodsName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
      brand: '引爆点',
      exFactoryPrice: '3800元 45天账期 4000.55元',
      inventoryInformation: '6',
      seller: '上海左班汽车零部件 13200000000',
      goodsStatus: '待售',
      lastUpdateTime: '2022-03-23 12:00:00',
    },
    {
      id: '500',
      code: '500',
      category: '发动机系列-发动机',
      goodsName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
      brand: '引爆点',
      exFactoryPrice: '3800元 45天账期 4000.55元',
      inventoryInformation: '6',
      seller: '上海左班汽车零部件 13200000000',
      goodsStatus: '待售',
      lastUpdateTime: '2022-03-23 12:00:00',
    },
    {
      id: '600',
      code: '600',
      category: '发动机系列-发动机',
      goodsName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
      brand: '引爆点',
      exFactoryPrice: '3800元 45天账期 4000.55元',
      inventoryInformation: '6',
      seller: '上海左班汽车零部件 13200000000',
      goodsStatus: '待售',
      lastUpdateTime: '2022-03-23 12:00:00',
    },
  ],
  four: [
    {
      id: '700',
      code: '700',
      category: '发动机系列-发动机',
      goodsName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
      brand: '引爆点',
      exFactoryPrice: '3800元 45天账期 4000.55元',
      inventoryInformation: '6',
      seller: '上海左班汽车零部件 13200000000',
      goodsStatus: '待售',
      lastUpdateTime: '2022-03-23 12:00:00',
    },
  ],
}
