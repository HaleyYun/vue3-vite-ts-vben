export const payInfoDesc = [
  {
    field: 'relationType',
    label: '售后服务',
  },
  {
    field: 'orderId',
    label: '服务订单',
  },
  {
    field: 'pay_price',
    label: '赔付金额',
  },
  {
    field: 'orderStatusName',
    label: '状态',
  },
  {
    field: 'debitPhone',
    label: '申请人',
  },
  {
    field: 'createTime',
    label: '申请时间',
  },
  {
    field: 'createTime',
    label: '赔付到账时间',
    span: 3,
  },
  {
    field: 'pay_results',
    label: '收款状态',
  },
  {
    field: 'operatorName',
    label: '操作人',
  },
  {
    field: 'operatorTime',
    label: '操作时间',
  },
]

// export const getPayInfoDesc = (isSuccess,pay_type,) =>{
//   if(isSuccess){
//     return payInfoDesc;
//   }else if(pay_type == 'pay' && !isSuccess){
//
//   }else if(pay_type == 'refund' && !isSuccess){
//
//   }
//
// }

export const tableColumns = [
  {
    title: '商品信息',
    dataIndex: 'goods',
    colSpan: 0,
    width: '20%',
  },
  {
    title: '商品识别码',
    dataIndex: 'identification_code',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '型号',
    dataIndex: 'model',
    width: '8%',
    ellipsis: true,
  },
  {
    title: '补偿金额',
    dataIndex: 'compensation_amount',
    width: '8%',
    ellipsis: true,
  },
  {
    title: '故障部件',
    dataIndex: 'fault_components',
    width: '8%',
    ellipsis: true,
  },
  {
    title: '卖家',
    dataIndex: 'seller',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '买家',
    dataIndex: 'buyers',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '生产商',
    dataIndex: 'producers',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
    width: '8%',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '8%',
  },
]

export const getTableColumns = (goodsLength) => {
  let customCell = (_, index) => {
    console.log(index, goodsLength)
    if (index == 0 && goodsLength && goodsLength >= 1) {
      return { rowSpan: goodsLength }
    } else {
      return { rowSpan: 0 }
    }
  }
  let column = [
    {
      title: '商品信息',
      dataIndex: 'goods',
      colSpan: 0,
      width: '20%',
    },
    {
      title: '商品识别码',
      dataIndex: 'identification_code',
      width: '10%',
      customCell: customCell,
      ellipsis: true,
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: '8%',
      customCell: customCell,
      ellipsis: true,
    },
    {
      title: '补偿金额',
      dataIndex: 'compensation_amount',
      width: '8%',
      customCell: customCell,
      ellipsis: true,
    },
    {
      title: '故障部件',
      dataIndex: 'fault_components',
      width: '8%',
      customCell: customCell,
      ellipsis: true,
    },
    {
      title: '卖家',
      dataIndex: 'seller',
      width: '10%',
      customCell: customCell,
      ellipsis: true,
    },
    {
      title: '买家',
      dataIndex: 'buyers',
      width: '10%',
      customCell: customCell,
      ellipsis: true,
    },
    {
      title: '生产商',
      dataIndex: 'producers',
      width: '10%',
      customCell: customCell,
      ellipsis: true,
    },
    {
      title: '订单状态',
      dataIndex: 'order_status',
      width: '8%',
      customCell: customCell,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '8%',
      customCell: customCell,
    },
  ]

  return column
}

export const MockTableData = [
  {
    order_no: '0100220292929',
    apply_time: '2022-04-02 18:00:45',
    associated_order_number: '202202100001234',
    identification_code: 'SQWERTXXG23552',
    model: 'B12',
    compensation_amount: '300',
    fault_components: '水泵',
    goods_list: [{ title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }],
    unit_price: '2800',
    number: 3,
    bill_day: '30',
    After_number: 3,
    amount_of: '8400元',
    seller: '江陵动力旗舰店',
    buyers: '郑州安途服务商',
    producers: '江陵动力发动机工厂',
    order_status: '已关闭',
  },
  {
    order_no: '0100220292929',
    apply_time: '2022-04-02 18:00:45',
    associated_order_number: '202202100001234',
    identification_code: 'SQWERTXXG23552',
    model: 'B12',
    compensation_amount: '300',
    fault_components: '水泵',
    goods_list: [{ title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }],
    unit_price: '2800',
    number: 3,
    bill_day: '30',
    After_number: 3,
    amount_of: '8400元',
    seller: '江陵动力旗舰店',
    buyers: '郑州安途服务商',
    producers: '江陵动力发动机工厂',
    order_status: '已关闭',
  },
  {
    order_no: '0100220292929',
    apply_time: '2022-04-02 18:00:45',
    associated_order_number: '202202100001234',
    identification_code: 'SQWERTXXG23552',
    model: 'B12',
    compensation_amount: '300',
    fault_components: '水泵',
    goods_list: [{ title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }],
    unit_price: '2800',
    number: 3,
    bill_day: '30',
    After_number: 3,
    amount_of: '8400元',
    seller: '江陵动力旗舰店',
    buyers: '郑州安途服务商',
    producers: '江陵动力发动机工厂',
    order_status: '已关闭',
  },
]

// 这是mock 数据以后对接口会删掉
export const MockPayInfo = {
  payType: '运输损坏',
  serialNumber: 'TL358231682',
  pay_price: '32213.43元',
  pay_type: '支付宝支付',
  drawee: '13012345678',
  payee: '河南弘途 汽配服务有限公司',
  pay_time: '2022-7-13 16:17:04',
  refund_time: '2022-7-13 16:17:04',
  pay_results: '支付成功',
  operation_people: '王海',
}
