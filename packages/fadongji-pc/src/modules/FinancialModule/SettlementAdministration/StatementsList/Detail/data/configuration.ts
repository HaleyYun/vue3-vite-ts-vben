

 export const payInfoDesc = [
  {
    field: 'id',
    label: '结算单号',
  },
  {
     field: 'type',
     label: '结算类型',
  },
  {
    field: 'platformName',
    label: '客户角色',
  },
  {
    field: 'companyName',
    label: '客户名称',
  },
  {
    field: 'status',
    label: '结算状态',
  },
  {
    field: 'amount',
    label: '结算金额',
  },
  {
     field: 'createTime',
     label: '生成时间',
  },
  {
    field: 'billTime',
    label: '结算时间',
  },
  {
    field: 'serialNo',
    label: '第三方结算批次号',
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
    title: '商品信息' ,
    dataIndex: 'goods',
    width:'25%'
  },
  {
    title: '单价/数量',
    dataIndex: 'unit_price',
    width: '15%',
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: '10%',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '15%',
  },
  {
    title: '买家',
    dataIndex: 'buyerName',
    width: '15%',
  },
  {
    title: '订单状态',
    dataIndex: 'statusName',
    width: '10%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
];

export const getTableColumns = (goodsLength) =>{
  let customCell = (_, index) => {
    console.log(index,goodsLength)
    if (index == 0 &&goodsLength &&goodsLength >= 1) {
      return { rowSpan: goodsLength};
    }else {
      return {rowSpan: 0}
    }
  }
  let column = [
    {
      title: '商品信息' ,
      dataIndex: 'goods',
      colSpan: 0,
      width:'25%'
    },
    {
      title: '单价/数量',
      dataIndex: 'unit_price',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '金额',
      dataIndex: 'amount',
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
      dataIndex: 'buyerName',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '订单状态',
      dataIndex: 'statusName',
      width: '10%',
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
  order_no:'0100220292929',
  goods_list:[{title:'适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'},{title:'适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}],
  unit_price:'2800',
  number:3,
  bill_day:'30',
  After_number:3,
  amount_of:'8400元',
  seller:'江陵动力旗舰店',
  buyers:'郑州安途服务商',
  order_status:'待发货'
},{
  order_no:'0100220292929',
  goods_list:[{title:'适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}],
  unit_price:'2800',
  number:3,
  bill_day:'30',
  After_number:3,
  amount_of:'8400元',
  seller:'江陵动力旗舰店',
  buyers:'郑州安途服务商',
  order_status:'待发货'
},{
  order_no:'0100220292929',
  goods_list:[{title:'适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}],
  unit_price:'2800',
  number:3,
  bill_day:'30',
  After_number:3,
  amount_of:'8400元',
  seller:'江陵动力旗舰店',
  buyers:'郑州安途服务商',
  order_status:'待发货'
}]



// 这是mock 数据以后对接口会删掉
export const MockPayInfo = {
    corpType:'付款',
    serialNumber:'TL358231682',
    serialType:'销售订单',
    customer_role:'供应商',
    customer_name:'江陵动力汽配公司',
    settlementStatusStr:'已结算',
    settlement_amount:'32746213.43元',
    create_time:'2022-7-13 16:17:04',
    clearing_time:'2022-7-13 16:17:04',
    pay_results:'支付成功',
    settlement_No:'通联-TL358231682',
    settlement_status:2
  }

