import { FormSchema } from '/@/components/Form'
import { getCategoryFunc, getBrandFunc } from '/@/modules/ContentModule/api/basicFormApis'
export const categoryTreeSelectApi = () => {
  return [
    {
      title: 'parent 1',
      value: 'parent 1',
      levelType: 1,
      children: [
        {
          title: 'parent 1-0',
          value: 'parent 1-0',
          levelType: 2,
          children: [
            {
              title: 'my leaf',
              value: 'leaf1',
              levelType: 3,
            },
            {
              title: 'your leaf',
              value: 'leaf2',
              levelType: 3,
            },
          ],
        },
        {
          levelType: 2,
          title: 'parent 1-1',
          value: 'parent 1-1',
        },
      ],
    },
  ]
}
export const supplierFilterSchemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '商品名称',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'secondaryCategoryName',
    label: '商品分类',
    component: 'ApiSelect',
    // slot: 'categorySlot',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入商品名称',
      api: getCategoryFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'name',
    component: 'ApiSelect',
    label: '商品品牌',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请选择商品品牌',
      api: getBrandFunc,
      // mode: 'multiple',
      // options: [
      //   {
      //     label: 'xlsx',
      //     value: 'xlsx',
      //     key: 'xlsx',
      //   },
      //   {
      //     label: 'html',
      //     value: 'html',
      //     key: 'html',
      //   },
      //   {
      //     label: 'csv',
      //     value: 'csv',
      //     key: 'csv',
      //   },
      //   {
      //     label: 'txt',
      //     value: 'txt',
      //     key: 'txt',
      //   },
      // ],
    },
  },
  {
    field: 'shopName',
    component: 'Input',
    label: '卖家',
    colProps: {
      span: 6,
    },
    slot: 'remoteSearch',
    componentProps: {
      allowClear: true,
      placeholder: '请选择卖家',
    },
  },
  // {
  //   field: 'status',
  //   component: 'Select',
  //   label: '库存状态',
  //   colProps: {
  //     span: 6,
  //   },
  //   defaultValue: '1',
  //   componentProps: {
  //     placeholder: '请选择库存状态',
  //     options: [
  //       {
  //         label: '全部',
  //         value: '1',
  //       },
  //       {
  //         label: '库存正常',
  //         value: '2',
  //       },
  //       {
  //         label: '安全库存预警',
  //         value: '3',
  //       },
  //       {
  //         label: '无货',
  //         value: '4',
  //       },
  //     ],
  //   },
  // },
  {
    field: '[startTime, endTime]',
    label: '时间范围',
    colProps: {
      span: 6,
    },
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
    },
  },
]

// “商品管理--供应商列表__【列表column数据集】”
export const supplierColumn = [
  {
    title: '编码',
    dataIndex: 'code',
    width: 80,
  },
  {
    title: '商品类别',
    dataIndex: 'categoryInfo',
    width: 300,
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
    title: '修理厂购买价',
    dataIndex: 'cashPrice',
    width: 250,
  },
  // {
  //   title: '库存信息',
  //   dataIndex: 'inventoryInformation',
  //   width: 80,
  // },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: 300,
  },
  {
    title: '提交人',
    dataIndex: 'submitterName',
    width: 250,
  },
  {
    title: '商品状态',
    dataIndex: 'goodsStatus',
    width: 120,
  },
  {
    title: '提交时间',
    dataIndex: 'updateTime',
    width: 220,
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 300,
  },
]
export const supplierData = [
  {
    id: '100',
    code: '100',
    category: '火化塞',
    goodsName: '江陵动力发动机-B15荣光黑色OCV阀',
    brand: '江陵动力',
    outPrice: '45天账期 4000元',
    seller: '上海左班汽车零部件',
    commitPerson: '李阿四',
    goodsStatus: false,
    commitTime: '2021-06-15 14:35:51',
  },
  {
    id: '200',
    code: '100',
    category: '底盘件',
    goodsName: '江陵动力发动机-B15荣光黑色OCV阀',
    brand: '大众.一汽',
    outPrice: '45天账期 4000元',
    seller: '上海左班汽车零部件',
    commitPerson: '李阿四',
    goodsStatus: true,
    commitTime: '2021-06-15 14:35:51',
  },
]
