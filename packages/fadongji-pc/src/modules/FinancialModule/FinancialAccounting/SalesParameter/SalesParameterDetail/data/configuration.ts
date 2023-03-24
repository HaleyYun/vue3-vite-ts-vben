

export const payInfoDesc = [
  {
    field: 'tradeTypeName',
    label: '支付类型',
  },
  {
    field: 'serialNumber',
    label: '流水号',
  },
  {
    field: 'pay_price',
    label: '支付金额',
  },
  {
    field: 'payTypeName',
    label: '支付方式',
  },
  {
    field: 'userName',
    label: '付款人',
  },
  {
    field: 'payeeName',
    label: '收款人',
  },
  {
    field: 'payTime',
    label: '支付时间',
  },
  {
    field: 'pay_results',
    label: '支付结果',
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
    width: '25%'
  },
  {
    title: '单价/数量',
    dataIndex: 'unit_price',
    width: '15%',
  },
  {
    title: '售后数量',
    dataIndex: 'After_number',
    width: '10%',
  },
  {
    title: '金额',
    dataIndex: 'amount_of',
    width: '10%',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '15%',
  },
  {
    title: '买家',
    dataIndex: 'buyers',
    width: '15%',
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
    width: '10%',
  },
];

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
      title: '商品信息',
      dataIndex: 'goods',
      colSpan: 0,
      width: '25%'
    },
    {
      title: '单价/数量',
      dataIndex: 'unit_price',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '售后数量',
      dataIndex: 'After_number',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '金额',
      dataIndex: 'amount_of',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '卖家',
      dataIndex: 'shopName',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '买家',
      dataIndex: 'buyers',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '订单状态',
      dataIndex: 'statusName',
      width: '10%',
      customCell: customCell,
    },


  ]

  return column;

}

export const MockTableData = [{
  order_no: '0100220292929',
  goods_list: [{ title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }, { title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }],
  unit_price: '2800',
  number: 3,
  bill_day: '30',
  After_number: 3,
  amount_of: '8400元',
  seller: '江陵动力旗舰店',
  buyers: '郑州安途服务商',
  order_status: '待发货'
}, {
  order_no: '0100220292929',
  goods_list: [{ title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }],
  unit_price: '2800',
  number: 3,
  bill_day: '30',
  After_number: 3,
  amount_of: '8400元',
  seller: '江陵动力旗舰店',
  buyers: '郑州安途服务商',
  order_status: '待发货'
}, {
  order_no: '0100220292929',
  goods_list: [{ title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }],
  unit_price: '2800',
  number: 3,
  bill_day: '30',
  After_number: 3,
  amount_of: '8400元',
  seller: '江陵动力旗舰店',
  buyers: '郑州安途服务商',
  order_status: '待发货'
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
  pay_results: '支付成功'
}

