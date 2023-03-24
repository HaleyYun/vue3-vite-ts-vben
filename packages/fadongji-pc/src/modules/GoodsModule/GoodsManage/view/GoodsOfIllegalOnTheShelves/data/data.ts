import {FormSchema} from '/@/components/Form'

export const illegalGoodsFilterForm: FormSchema[] = [
  {
    field: 'goodsName',
    component: 'name',
    label: '商品名称',

    componentProps: {
      placeholder: '请输入商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'categoryId',
    label: '商品分类',
    component: 'TreeSelect',
    slot: 'categorySlot',

  },
  {
    field: 'brandId',
    component: 'Select',
    label: '商品品牌',

    componentProps: {
      placeholder: '请选择商品品牌',
      mode: 'multiple',
      options: [
        {
          label: 'xlsx',
          value: 'xlsx',
          key: 'xlsx',
        },
        {
          label: 'html',
          value: 'html',
          key: 'html',
        },
        {
          label: 'csv',
          value: 'csv',
          key: 'csv',
        },
        {
          label: 'txt',
          value: 'txt',
          key: 'txt',
        },
      ],
    },
  },
  {
    field: 'seller',
    component: 'Input',
    label: '卖家',

    componentProps: {
      placeholder: '请输入卖家',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: '[startTime, endTime]',
    label: '提交时间',

    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '审核情况',
    defaultValue: '1',
    componentProps: {
      placeholder: '请选择审核情况状态',
      options: [
        {
          label: '全部',
          value: '1',
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

export const illegalGoodsColumns = [
  {
    title: '商品编号',
    dataIndex: 'code',
    width: 120,
  },
  {
    title: '商品类别',
    dataIndex: 'categoryInfo',
    width: 250,
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    width: 300,
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
    width: 300,
  },
  {
    title: '出厂价格',
    dataIndex: 'cashPrice',
    width: 250,
  },
  // {
  //     title: '库存信息',
  //     dataIndex: 'inventoryInformation',
  //     width: 130,
  //     align: 'center',
  // },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: 250,
  },
  {
    title: '提交人',
    dataIndex: 'submitterName',
    width: 130,
    align: 'center',
  },
  {
    title: '商品状态',
    dataIndex: 'status',
    width: 250,
  },
  {
    title: '提交时间',
    dataIndex: 'updateTime',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,
    align: 'center',
    fixed: 'right',
  },
]
export const illegalGoodsData = [
  {
    id: '100',
    no: '100',
    category: '发动机系列-发动机',
    goodsName: '江陵动力发动机-B15荣光适用黑色OCV阀',
    brand: '江陵动力发动机-B15荣光适用黑色OCV阀',
    exFactoryPrice: '3800元  45天账期 4000元',
    inventoryInformation: '4',
    seller: '上海左班汽车零部件 13200000000',
    status: '待审核',
    updateDate: '2022-03-23 12:00:23',
  },
  {
    id: '200',
    no: '200',
    category: '发动机系列-发动机',
    goodsName: '江陵动力发动机-B15荣光适用黑色OCV阀',
    brand: '江陵动力发动机-B15荣光适用黑色OCV阀',
    exFactoryPrice: '3800元  45天账期 4000元',
    inventoryInformation: '65',
    seller: '上海左班汽车零部件 13200000000',
    status: '待审核',
    updateDate: '2022-03-23 12:00:23',
  },
]

// 違規商品-- 点击“库存数量”显示详情table
export const InventoryInformationColumn = [
  {
    title: '仓库类型',
    dataIndex: 'InventoryType',
    width: 100,
  },
  {
    title: '仓库名称',
    dataIndex: 'InventoryName',
  },
  {
    title: '库存预警值',
    dataIndex: 'InventoryValue',
    width: 100,
  },
  {
    title: '可用库存',
    dataIndex: 'InventoryEnable',
    width: 100,
  },
]

// mock違規商品-- 点击“库存数量”显示详情table
export const InventoryInformationData = [
  {
    InventoryType: '平台仓库',
    InventoryName: {name: '郑州平台仓', warn: '安全库存预警'},
    InventoryValue: '400',
    InventoryEnable: '200',
  },
  {
    InventoryType: '平台仓库',
    InventoryName: {name: '沈阳平台仓', warn: '无货'},
    InventoryValue: '400',
    InventoryEnable: '200',
  },
]
