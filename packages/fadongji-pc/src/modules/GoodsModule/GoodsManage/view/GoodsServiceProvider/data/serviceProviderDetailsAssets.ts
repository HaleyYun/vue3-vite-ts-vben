import { DescItem } from '/@/components/Description/index'
//  服务商商品列表 -- （1-1）详情页面（基础信息 column）
export const serviceProviderDetailsBasicInfoColumn = [
  {
    title: '编码',
    dataIndex: 'shopCode',
    align: 'center',
    width: 200,
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    align: 'center',
  },
  {
    title: '提交人',
    dataIndex: 'submitterName',
    align: 'center',
    width: 300,
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    align: 'center',
    width: 240,
  },
]
export const adaptationColumn = [
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
//查看操作
export const handleColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 200,
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    align: 'center',
    width: 300,
  },
  {
    title: '操作人账号',
    dataIndex: 'creatorUserName',
    align: 'center',
    width: 240,
  },
]
//  服务商商品列表 -- (1-1) 详情页面（基础信息 data）
export const serviceProviderDetailsBasicInfoMockData = [
  {
    code: '100000000001',
    seller: '上海左班汽车零部件 13200000000',
    creator: '魏处经 100000000000000',
    submitterTime: '2022-02-03 12:00:00',
  },
  {
    code: '100000000002',
    seller: '北京左班汽车零部件 13300000000',
    creator: '蒋芳河 100000000000000',
    submitterTime: '2022-02-03 12:00:00',
  },
]

//  服务商商品列表 -- （1-2）详情页面（基础信息 column）
export const serviceProviderDetailsSaleColumn = [
  {
    title: '商品编码',
    dataIndex: 'goodsCode',
    align: 'center',
    width: 200,
  },
  {
    title: '现金价',
    dataIndex: 'cashPrice',
    align: 'center',
    width: 240,
  },
  {
    title: '账期价',
    dataIndex: 'accountPrice',
    align: 'center',
    width: 250,
  },
  {
    title: '起购数量',
    dataIndex: 'minOrderNumber',
    align: 'center',
    width: 200,
  },
  {
    title: '运费',
    dataIndex: 'shippingType',
    align: 'center',
    width: 200,
  },
  {
    title: '销售区域',
    dataIndex: 'salesTerritory',
    align: 'center',
    width: 200,
  },
]
//  服务商商品列表 -- (1-2) 详情页面（基础信息 data）
export const serviceProviderDetailsSaleMockData = [
  {
    code: '100000000001',
    cashPrice: '2800元',
    initialPurchaseQuantity: '45天账期2900元',
    accountingPeriodPrice: '5',
    freight: '包邮',
  },
  {
    code: '100000000002',
    cashPrice: '2800元',
    initialPurchaseQuantity: '45天账期2900元',
    accountingPeriodPrice: '5',
    freight: '包邮',
  },
]

//  服务商商品列表 -- （1-2）详情页面（基础信息 column）
export const serviceProviderProfitSharing = [
  {
    title: '平台服务费',
    dataIndex: 'platform',
    align: 'center',
  },
  {
    title: '投资人',
    dataIndex: 'investor',
    align: 'center',
  },
  {
    title: '客户运营',
    dataIndex: 'customerBusiness',
    align: 'center',
  },
  {
    title: '商家运营',
    dataIndex: 'merchantOperation',
    align: 'center',
  },
  {
    title: '代运营',
    dataIndex: 'agentOperation',
    align: 'center',
  },
  {
    title: '渠道经理',
    dataIndex: 'channelManager',
    align: 'center',
  },
  {
    title: '渠道经理',
    dataIndex: 'opinionLeaders',
    align: 'center',
  },
]
//  服务商商品列表 -- (1-2) 详情页面（基础信息 data）
export const serviceProviderProfitSharingMockData = [
  {
    id: '100000000000000',
    platformServiceFee: '2800元',
    investor: '2800元',
    customerBusiness: '2800元',
    merchantOperation: '2800元',
    agentOperation: '2800元',
    channelManager: '2800元',
    opinionLeaders: '2800元',
  },
  {
    id: '12000000000000',
    platformServiceFee: '21800元',
    investor: '2800元',
    customerBusiness: '22800元',
    merchantOperation: '2800元',
    agentOperation: '2800元',
    channelManager: '2800元',
    opinionLeaders: '2800元',
  },
  {
    id: '1200000000000230',
    platformServiceFee: '28300元',
    investor: '28400元',
    customerBusiness: '280220元',
    merchantOperation: '2800元',
    agentOperation: '2833300元',
    channelManager: '28033元',
    opinionLeaders: '2800元',
  },
  {
    id: '120000000000220230',
    platformServiceFee: '333',
    investor: '2800元',
    customerBusiness: '283330元',
    merchantOperation: '2800元',
    agentOperation: '2800元',
    channelManager: '2800元',
    opinionLeaders: '2800元',
  },
]

//  服务商商品列表 -- （1-3）仓库运营费用（基础信息 column）
export const serviceProviderWarehouseOperationManagementColumn = [
  {
    title: '广州平台仓',
    dataIndex: 'guangzhou',
    align: 'center',
  },
  {
    title: '沈阳平台仓',
    dataIndex: 'shenyang',
    align: 'center',
  },
  {
    title: '杭州平台仓',
    dataIndex: 'hangzhou',
    align: 'center',
  },
  {
    title: '郑州平台仓',
    dataIndex: 'zhengzhou',
    align: 'center',
  },
  {
    title: '济南平台仓',
    dataIndex: 'jinan',
    align: 'center',
  },
  {
    title: '成都平台仓',
    dataIndex: 'chengdu',
    align: 'center',
  },
  {
    title: '前置仓',
    dataIndex: 'frontWarehouse',
    align: 'center',
  },
  {
    title: '工厂仓',
    dataIndex: 'factoryWarehouse',
    align: 'center',
  },
]
//  服务商商品列表 -- (1-3) 仓库运营费用（基础信息 data）
export const serviceProviderWarehouseOperationManagementMockData = [
  {
    guangzhou: '100000000000000',
    shenyang: '2800元',
    hangzhou: '2800元',
    zhengzhou: '2800元',
    jinan: '2800元',
    chengdu: '2800元',
    frontWarehouse: '2800元',
    factoryWarehouse: '2800元',
  },
]

//  服务商商品列表 -- 详情信息-- （1-4）仓储信息 column
export const serviceProviderWarehouseInformationColumn = [
  {
    title: '发货仓库',
    dataIndex: 'warehouseName',
    align: 'center',
  },
  {
    title: '总库存',
    dataIndex: 'number',
    align: 'center',
  },
  {
    title: '可用库存',
    dataIndex: 'availableNumber',
    align: 'center',
  },
  {
    title: '订单占用',
    dataIndex: 'orderNumber',
    align: 'center',
  },
  {
    title: '库存预警',
    dataIndex: 'warningThreshold',
    align: 'center',
  },
  {
    title: '支持定制',
    dataIndex: 'isCoding',
    align: 'center',
  },
  {
    title: '定制价格',
    dataIndex: 'codingPrice',
    align: 'center',
  },
  {
    title: '发货时效',
    dataIndex: 'deliverySpeed',
    align: 'center',
  },
  {
    title: '配送时效',
    dataIndex: 'assetsSpeed',
    align: 'center',
  },
  {
    title: '预计到手（元）',
    dataIndex: 'expected',
    align: 'center',
  },
]
//  服务商商品列表 -- 详情信息-- （1-4）仓储信息（基础信息 data）
export const serviceProviderWarehouseInformationMockData = [
  {
    id: '100000000000000000',
    deliveryLocation: '郑州平台仓',
    warehouse: '2800元',
    inventoryAlert: '2800元',
    supportCoding: true,
    codingPrice: '2800元',
    deliverySpeed: '2800元',
    assetsSpeed: '2800元',
    expected: '2800元',
  },
  {
    id: '100000000000000001',
    deliveryLocation: '杭州平台仓',
    warehouse: '2800元',
    inventoryAlert: '2800元',
    supportCoding: false,
    codingPrice: '2800元',
    deliverySpeed: '2800元',
    assetsSpeed: '2800元',
    expected: '2800元',
  },
]
//  服务商商品列表 -- 详情信息-- （1-5）参数属性 column
export const serviceProviderParamColumn = [
  {
    title: '品牌',
    dataIndex: 'brand',
    align: 'center',
  },
  {
    title: '车系',
    dataIndex: 'carSeries',
    align: 'center',
  },
  {
    title: '年款',
    dataIndex: 'modelYear',
    align: 'center',
  },
  {
    title: '排量',
    dataIndex: 'displacement',
    align: 'center',
  },
  {
    title: '变速器',
    dataIndex: 'transmission',
    align: 'center',
  },
  {
    title: '车型',
    dataIndex: 'carModel',
    align: 'center',
  },
]
//  服务商商品列表 -- 详情信息-- （1-5）参数属性（ data）
export const serviceProviderParamMockData = [
  {
    brand: '宝马',
    carSeries: '宝马1系',
    modelYear: '2019款',
    displacement: '1.5T',
    transmission: '手自一体',
    carModel: '进取雅致型',
  },
  {
    brand: '宝马',
    carSeries: '宝马1系',
    modelYear: '2019款',
    displacement: '1.5T',
    transmission: '双离合',
    carModel: '豪华型',
  },
  {
    brand: '宝马',
    carSeries: '宝马1系',
    modelYear: '2019款',
    displacement: '1.5T',
    transmission: '自动挡',
    carModel: '运动型',
  },
  {
    brand: '奔驰',
    carSeries: '奔驰GLB',
    modelYear: '2020款',
    displacement: '2.0T',
    transmission: '自动挡',
    carModel: '舒享型',
  },
]
//  服务商商品列表 -- 详情信息-- （1-6）适配车型 column
export const serviceProviderApplicableModelsColumn = [
  {
    title: '排量',
    dataIndex: 'displacement',
    align: 'center',
  },
  {
    title: '气缸容积',
    dataIndex: 'cylinderVolume',
    align: 'center',
  },
  {
    title: '缸径',
    dataIndex: 'cylinderBore',
    align: 'center',
  },
  {
    title: '气缸数',
    dataIndex: 'cylinderNumber',
    align: 'center',
  },
  {
    title: '气门结构',
    dataIndex: 'valveStructure',
    align: 'center',
  },
  {
    title: '压缩比',
    dataIndex: 'compressionRatio',
    align: 'center',
  },
  {
    title: '材质',
    dataIndex: 'textureOfMaterial',
    align: 'center',
  },
]
//  服务商商品列表 -- 详情信息-- （1-6）适配车型（ data）
export const serviceProviderApplicableModelsMockData = [
  {
    displacement: '1.6L',
    cylinderVolume: '1591',
    cylinderBore: '77',
    cylinderNumber: '4',
    valveStructure: '双置顶',
    compressionRatio: '10.5:1',
    textureOfMaterial: '铸铁',
  },
]

export const personSchema: DescItem[] = [
  {
    field: 'category',
    label: '商品类别',
  },
  {
    field: 'operationCategory',
    label: '运营类别',
  },
  {
    field: 'goodsBrand',
    label: '商品品牌',
  },
  {
    field: 'goodsType',
    label: '商品类型',
  },
  {
    field: 'goodsSize',
    label: '商品型号',
  },
  {
    field: 'goodsName',
    label: '商品名称',
  },
  {
    field: 'articleNumber',
    label: '品号',
  },
]
export const personData = {
  category: '发动机系列 > 发动机',
  operationCategory: '发动机系列 > 发动机',
  goodsBrand: '商品品牌',
  goodsType: '浙江省杭州市西湖区万塘路18号',
  goodsSize: 'B15荣光',
  goodsName: '江陵动力-B15荣光',
}
// 投资信息
export const investmentProviderColumn = [
  {
    title: '项目名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '投资价格',
    dataIndex: 'investmentCashPrice',
    align: 'center',
  },
  {
    title: '已投量/总可投资量',
    dataIndex: 'totalInvestment',
    align: 'center',
  },
  {
    title: '发货仓库',
    dataIndex: 'warehouseName',
    align: 'center',
  },
  {
    title: '投资回报率',
    dataIndex: 'rol',
    align: 'center',
  },
  {
    title: '起投量',
    dataIndex: 'minOrderNumber',
    align: 'center',
  },
  {
    title: '限投量',
    dataIndex: 'investmentLimit',
    align: 'center',
  },
  {
    title: '运费',
    dataIndex: 'shippingType',
    align: 'center',
  },
  {
    title: '可投资区域',
    dataIndex: 'investableArea',
    align: 'center',
  },
]
