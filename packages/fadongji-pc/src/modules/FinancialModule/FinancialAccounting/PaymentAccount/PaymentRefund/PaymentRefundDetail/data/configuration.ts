export const payInfoDesc = [
  {
    field: 'relationType',
    label: '退款类型',
  },
  {
    field: 'orderId',
    label: '服务订单',
  },
  {
    field: 'pay_price',
    label: '退款金额',
  },
  {
    field: 'statusName',
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
    label: '退款到帐时间',
    span: 3
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
    title: '商品信息',
    dataIndex: 'goods',
    colSpan: 0,
    width: '20%',
  },
  {
    title: '单价/数量',
    dataIndex: 'serialNo',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '售后数量',
    dataIndex: 'goodsCount',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '退款金额',
    dataIndex: 'price',
    width: '10%',
    ellipsis: true,
  },
  {
    title: '卖家',
    dataIndex: 'seller',
    width: '15%',
    ellipsis: true,
  },
  {
    title: '买家',
    dataIndex: 'buyers',
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
      return {rowSpan: goodsLength};
    } else {
      return {rowSpan: 0}
    }
  }
  let column = tableColumns.map((item, index) => {
    if (index != 0) {
      return {...item, customCell: customCell}
    } else {
      return item;
    }
  })
  return column;

}

export const MockTableData = [{
  order_no: '0100220292929',
  apply_time: '2022-04-02 18:00:45',
  goods_list: [{title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}],
  after_number: '6',
  unit_price: '2800',
  number: 3,
  bill_day: '30',
  After_number: 3,
  refund_amount: '8400元',
  seller: '江陵动力旗舰店',
  buyers: '郑州安途服务商',
  producers: '江陵动力发动机工厂',
  order_status: '待审核'
}, {
  order_no: '0100220292929',
  apply_time: '2022-04-02 18:00:45',
  goods_list: [{title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}],
  after_number: '6',
  unit_price: '2800',
  number: 3,
  bill_day: '30',
  After_number: 3,
  refund_amount: '8400元',
  seller: '江陵动力旗舰店',
  buyers: '郑州安途服务商',
  producers: '江陵动力发动机工厂',
  order_status: '已关闭'
}, {
  order_no: '0100220292929',
  apply_time: '2022-04-02 18:00:45',
  goods_list: [{title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}],
  after_number: '6',
  unit_price: '2800',
  number: 3,
  bill_day: '30',
  After_number: 3,
  refund_amount: '8400元',
  seller: '江陵动力旗舰店',
  buyers: '郑州安途服务商',
  producers: '江陵动力发动机工厂',
  order_status: '已关闭'
}]


// 这是mock 数据以后对接口会删掉
export const MockPayInfo = {
  corpType: '付款',
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

