

export const payInfoDesc = [
  {
    field: 'serialNo',
    label: '流水号',
  },
  {
    field: 'orderId',
    label: '回收订单',
  },
  {
    field: 'pay_price',
    label: '支付金额',
  },
  {
    field: 'statusName',
    label: '状态',
  },
  {
    field: 'createTime',
    label: '支付时间',
  },
  {
    field: 'relationType',
    label: '收款人',
  },
  {
    field: 'debitPhone',
    label: '收款人账号',
    span: 3
  },
  {
    field: 'pay_results',
    label: '还款状态',
  },
  {
    field: 'operatorName',
    label: '操作人',
  },
  {
    field: 'operatorTime',
    label: '操作时间',
  },

];

export const payDesc = [
  {
    field: 'serialNo',
    label: '流水号',
  },
  {
    field: 'orderId',
    label: '回收订单',
  },
  {
    field: 'pay_price',
    label: '支付金额',
  },
  {
    field: 'statusName',
    label: '垫付状态',
  },
  {
    field: 'createTime',
    label: '支付时间',
  },
  {
    field: 'relationType',
    label: '收款人',
  },
  {
    field: 'debitPhone',
    label: '收款人账号',
    span: 3
  },
  {
    field: 'pay_results',
    label: '还款状态',
  },

];

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
    title: '回收服务名称',
    dataIndex: 'service_name',
    colSpan: 0,
    width: '15%',
  },
  {
    title: '服务价格',
    dataIndex: 'service_price',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '上门时间',
    dataIndex: 'door_time',
    width: '15%',
    ellipsis: true,
  },
  {
    title: '修理厂',
    dataIndex: 'garage',
    width: '15%',
    ellipsis: true,
  },
  {
    title: '集师傅',
    dataIndex: 'fault_components',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '回收公司',
    dataIndex: 'recycling_company',
    width: '15%',
    ellipsis: true,
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },


]

export const getTableColumns = (goodsLength) => {
  let customCell = (_, index) => {
    console.log(index, goodsLength)
    if (index == 0 && goodsLength && goodsLength >= 1) {
      return { rowSpan: goodsLength };
    } else {
      return { rowSpan: 0 }
    }
  }
  let column = [
    {
      title: '回收服务名称',
      dataIndex: 'service_name',
      colSpan: 0,
      width: '15%',
    },
    {
      title: '服务价格',
      dataIndex: 'service_price',
      width: '10%',
      ellipsis: true,
      customCell: customCell,
    },
    {
      title: '上门时间',
      dataIndex: 'door_time',
      width: '15%',
      ellipsis: true,
      customCell: customCell,
    },
    {
      title: '修理厂',
      dataIndex: 'garage',
      width: '15%',
      ellipsis: true,
      customCell: customCell,
    },
    {
      title: '集师傅',
      dataIndex: 'fault_components',
      width: '10%',
      ellipsis: true,
      customCell: customCell,
    },
    {
      title: '回收公司',
      dataIndex: 'recycling_company',
      width: '15%',
      ellipsis: true,
      customCell: customCell,
    },
    {
      title: '订单状态',
      dataIndex: 'order_status',
      width: '10%',
      ellipsis: true,
      customCell: customCell,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
      customCell: customCell,
    },


  ]

  return column;

}

export const MockTableData = [{
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
  order_status: '已关闭'
}, {
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
  order_status: '已关闭'
}, {
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
  order_status: '已关闭'
}]



// 这是mock 数据以后对接口会删掉
export const MockPayInfo = {
  corpType: '付款',
  order_no: 'TL358231682',
  serialNumber: '202202100001234',
  pay_price: '32213.43元',
  pay_type: '已支付',
  pay_time: '2022-7-13 16:17:04',
  refund_time: '2022-7-13 16:17:04',
  pay_results: '支付成功',
  operation_people: '王海',

}

