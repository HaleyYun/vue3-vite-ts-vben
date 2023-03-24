import { FormSchema } from '/@/components/Form'
import { getSellerData } from '/@/modules/ContentModule/api/basicFormApis'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'searchTime',
    label: '时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },

  {
    field: 'shop',
    component: 'ApiSelect',
    label: '主修车系',
    componentProps: {
      options: [],
      placeholder: '请选择车系',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'lavel',
    component: 'ApiSelect',
    label: '等级',
    componentProps: {
      options: [],
      placeholder: '请选择集师傅等级',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
export const assignFormSchemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '订单编号',
    componentProps: {
      placeholder: '订单编号',
      allowClear: true,
    },
  },
  {
    field: 'goodsName',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '商品名称',
      allowClear: true,
    },
  },

  {
    field: 'searchTime',
    label: '下单时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'shopName',
    component: 'Input',
    label: '卖家',
    componentProps: {
      placeholder: '卖家名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'buyerId',
    component: 'ApiSearchSelect',
    label: '买家',
    colProps: {
      span: 8,
    },
    componentProps: {
      allowClear: true,
      placeholder: '请选择买家',
      immediate: true,
      api: getSellerData,
      resultField: 'data',
    },
  },
  {
    field: 'source',
    component: 'Select',
    label: '订单来源',
    componentProps: {
      options: [
        {
          label: '安卓',
          value: '1',
          key: '1',
        },
        {
          label: 'ios',
          value: '2',
          key: '2',
        },
        {
          label: 'H5',
          value: '3',
          key: '3',
        },
        {
          label: 'PC',
          value: '4',
          key: '4',
        },
        {
          label: '小程序',
          value: '5',
          key: '5',
        },
        {
          label: '公众号',
          value: '6',
          key: '6',
        },
      ],
      placeholder: '请选择',
    },
  },
  {
    field: 'isWarn',
    component: 'Select',
    label: '提醒发货',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
          key: 'true',
        },
        {
          label: '否',
          value: false,
          key: 'false',
        },
      ],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  // {
  //     label: '所属地区',
  //     field: 'areaCode',
  //     component: 'ApiCascader',
  //     componentProps: {
  //         api: CascaderDataApi,
  //         placeholder: '所属地区',
  //         fieldNames: {
  //             children: 'children',
  //             label: 'name',
  //             value: 'id',
  //         },
  //         isLeaf: (record) => {
  //             return !record.children
  //         },
  //     },
  // },
  // {
  //     field: 'lavel',
  //     component: 'ApiSelect',
  //     label: '招商经理等级',
  //     componentProps: {
  //         options:[],
  //         placeholder: '请选择等级',
  //         onChange: (e) => {
  //             console.log(e)
  //         },
  //     },
  // },
]

export const oldAssignTableColumn = [
  {
    title: '商品信息',
    dataIndex: 'goodsDetail',
    width: '20%',
  },
  {
    title: '单价/数量',
    dataIndex: 'originalPrice',
    width: '15%',
  },
  {
    title: '金额',
    dataIndex: 'payAmount',
    width: '15%',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '12%',
  },
  {
    title: '买家',
    dataIndex: 'buyerName',
    width: '12%',
  },
  {
    title: '订单状态',
    dataIndex: 'statusName',
    width: '13%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '12%',
    fixed: 'right',
  },
]

export const getOldAssignTableColumn = (goodsLength) => {
  const customCell = (_, index) => {
    console.log(index, goodsLength)
    if (index == 0 && goodsLength && goodsLength >= 1) {
      return { rowSpan: goodsLength }
    } else {
      return { rowSpan: 0 }
    }
  }
  // customCell: customCell,
  const column = [
    {
      title: '商品信息',
      dataIndex: 'goodsDetail',
      width: '20%',
      colSpan: 0,
    },
    {
      title: '单价/数量',
      dataIndex: 'originalPrice',
      width: '15%',
      colSpan: 0,
    },
    {
      title: '金额',
      dataIndex: 'payAmount',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '卖家',
      dataIndex: 'shopName',
      width: '12%',
      customCell: customCell,
    },
    {
      title: '买家',
      dataIndex: 'buyerName',
      width: '12%',
      customCell: customCell,
    },
    {
      title: '订单状态',
      dataIndex: 'statusName',
      width: '13%',
      customCell: customCell,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '12%',
      fixed: 'right',
      customCell: customCell,
    },
  ]
  return column
}

export const DeliveryTableColumn = [
  {
    title: '提醒人',
    dataIndex: 'realName',
    ellipsis: true,
    width: '100px',
  },
  {
    title: '提醒人账号',
    dataIndex: 'username',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '提醒时间',
    dataIndex: 'createTime',
    ellipsis: true,
    width: '150px',
  },
]

export const goodsColumn = [
  {
    title: '商品id',
    dataIndex: 'code',
    ellipsis: true,
    width: '100px',
  },
  {
    title: '商品信息',
    dataIndex: 'goodsName',
    ellipsis: true,
    width: '300px',
  },
  {
    title: '数量',
    dataIndex: 'goodsCount',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '商品单价',
    dataIndex: 'payPrice',
    ellipsis: true,
    width: '120px',
  },
]
// warehouseName
export const payMentColumn = [
  {
    title: '商品id',
    dataIndex: 'goodsId',
    ellipsis: true,
    width: '100px',
  },
  {
    title: '商品信息',
    dataIndex: 'goodsName',
    ellipsis: true,
    width: '300px',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '发货仓库',
    dataIndex: 'warehouseName',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '数量',
    dataIndex: 'goodsCount',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '商品单价',
    dataIndex: 'payPrice',
    ellipsis: true,
    width: '120px',
  },
]
export const logisticsColumn = [
  {
    title: '发货方式',
    dataIndex: 'deliveryType',
    ellipsis: true,
    width: '100px',
  },
  {
    title: '物流公司',
    dataIndex: 'goodsName',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '物流单号',
    dataIndex: 'deliveryNum',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '物流电话',
    dataIndex: 'payPrice',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '发货产品',
    dataIndex: 'goodsDetail',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '发货凭证',
    dataIndex: 'credentials',
    ellipsis: true,
    width: '150px',
  },
]

//基本信息
export const sendGoodsData: any[] = [
  {
    title: '订单编号',
    key: 'id',
  },
  {
    title: '买家',
    key: 'buyerName',
  },
  {
    title: '支付方式',
    key: 'supportAmount',
  },
  {
    title: '订单来源',
    key: 'source',
  },
  {
    title: '收货地址',
    key: 'orderAddress',
  },
  {
    title: '备注',
    key: 'remarkList',
  },
]
export const forGoodsData: any[] = [
  {
    title: '订单编号',
    key: 'id',
  },
  {
    title: '买家',
    key: 'buyerName',
  },
  {
    title: '支付方式',
    key: 'supportAmount',
  },
  {
    title: '订单来源',
    key: 'source',
  },
  {
    title: '收货地址',
    key: 'orderAddress',
  },
  {
    title: '卖家',
    key: 'shopName',
  },
  {
    title: '备注',
    key: 'remarkList',
  },
]
export const completeData: any[] = [
  {
    title: '订单编号',
    key: 'id',
  },
  {
    title: '发货单流水号',
    key: 'deliveryId',
  },
  {
    title: '买家',
    key: 'buyerName',
  },
  {
    title: '支付方式',
    key: 'supportAmount',
  },
  {
    title: '订单来源',
    key: 'source',
  },
  {
    title: '收货地址',
    key: 'orderAddress',
  },
  {
    title: '卖家',
    key: 'shopName',
  },
  {
    title: '备注',
    key: 'remarkList',
  },
]

export const getBaseData = (status) => {
  let data: any[] = []
  switch (status) {
    case 1310:
      data = sendGoodsData
      break
    case 1320:
      data = forGoodsData
      break
    case 1330:
      data = completeData
      break
    case 1340:
      data = completeData
      break
    case 1350:
      data = forGoodsData
      break
    case 1360:
      data = forGoodsData
      break
  }
  return data
}
