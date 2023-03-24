


export const filterFormSchemas = [
  {
    field: 'companyName',
    component: 'Input',
    label: '卖家名称',
    componentProps: {
      placeholder: '请输入',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: '确认收货日期',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      }
    },
  },
  {
    field: 'orderId',
    component: 'Input',
    label: '订单号',
    componentProps: {
      placeholder: '请输入订单号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
];



export const salesTableColumns = [
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
    title: '金额',
    dataIndex: 'amount_of',
    width: '10%',
  },
  {
    title: '卖家',
    dataIndex: 'seller',
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
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
];
export const RecyclingTableColumns = [
  {
    title: '回收服务名称',
    dataIndex: 'goods',
    width: '20%'
  },
  {
    title: '服务价格',
    dataIndex: 'service_price',
    width: '10%',
  },
  {
    title: '上门时间',
    dataIndex: 'door_time',
    width: '10%',
  },
  {
    title: '修理厂',
    dataIndex: 'garage',
    width: '15%',
  },
  {
    title: '集师傅',
    dataIndex: 'set_master',
    width: '15%',
  },
  {
    title: '回收公司',
    dataIndex: 'recycling_company',
    width: '10%',
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
    width: '10%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
];
export const OldMachineTableColumns = [
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
    title: '金额',
    dataIndex: 'amount_of',
    width: '10%',
  },
  {
    title: '卖家',
    dataIndex: 'seller',
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
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
];
export const InvestmentTableColumns = [
  {
    title: '投资项目',
    dataIndex: 'goods',
    width: '20%'
  },
  {
    title: '投资价格/投资数量',
    dataIndex: 'Price_investment',
    width: '10%',
  },
  {
    title: '金额',
    dataIndex: 'amount_of',
    width: '10%',
  },
  {
    title: '卖家',
    dataIndex: 'seller',
    width: '15%',
  },
  {
    title: '买家',
    dataIndex: 'buyers',
    width: '15%',
  },
  {
    title: '发货仓库',
    dataIndex: 'delivery_warehouse',
    width: '10%',
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
    width: '10%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
];
export const InstallationTableColumns = [
  {
    title: '安装服务名称',
    dataIndex: 'goods',
    width: '20%'
  },
  {
    title: '服务价格',
    dataIndex: 'service_price',
    width: '10%',
  },
  {
    title: '上门时间',
    dataIndex: 'door_time',
    width: '10%',
  },
  {
    title: '修理厂',
    dataIndex: 'garage',
    width: '15%',
  },
  {
    title: '集师傅',
    dataIndex: 'set_master',
    width: '15%',
  },
  {
    title: '地区',
    dataIndex: 'address',
    width: '10%',
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
    width: '10%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
];
export const AfterDoorTableColumns = [
  {
    title: '服务名称',
    dataIndex: 'goods',
    width: '20%'
  },
  {
    title: '服务价格',
    dataIndex: 'service_price',
    width: '10%',
  },
  {
    title: '上门时间',
    dataIndex: 'door_time',
    width: '10%',
  },
  {
    title: '修理厂',
    dataIndex: 'garage',
    width: '15%',
  },
  {
    title: '集师傅',
    dataIndex: 'set_master',
    width: '15%',
  },
  {
    title: '地区',
    dataIndex: 'address',
    width: '10%',
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
    width: '10%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
];
export const getTableColumns = (goodsLength, type) => {
  let customCell = (_, index) => {
    console.log(index, goodsLength)
    if (index == 0 && goodsLength && goodsLength >= 1) {
      return {rowSpan: goodsLength};
    } else {
      return {rowSpan: 0}
    }
  }
  let column = getColumns(type).map((item, index) => {
    if (index != 0) {
      return {...item, customCell: customCell,}
    } else {
      return item
    }
  })
  return column;

}
export const getColumns = (type) => {
  let columns: any = []
  switch (type) {
    case '11':
      columns = salesTableColumns
      break;
    case '12':
      columns = InvestmentTableColumns
      break;
    case '32':
      columns = InstallationTableColumns
      break;
    case '33':
      columns = RecyclingTableColumns
      break;
    case '31':
      columns = AfterDoorTableColumns
      break;
    case '13':
      columns = OldMachineTableColumns
      break;

  }
  return columns
}


export const MockTableData = [{
  order_no: '0100220292929',
  goodsDetail: [{title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}, {title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}],
  service_price: '2800',
  number: 3,
  bill_day: '30',
  After_number: 3,
  Price_investment: '8400元',
  garage: '江陵动力旗舰店',
  set_master: '张三',
  order_statusStr: '待发货',
  address: '郑州市',
  door_time: '2022-7-29 14:45:16',
  confirm_time: '2022-7-29 14:45:16',
  about_order: '0100220292929'
}, {
  order_no: '0100220292929',
  goodsDetail: [{title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}, {title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}],
  service_price: '2800',
  number: 3,
  bill_day: '30',
  After_number: 3,
  Price_investment: '8400元',
  garage: '江陵动力旗舰店',
  set_master: '张三',
  order_statusStr: '待发货',
  address: '郑州市',
  door_time: '2022-7-29 14:45:16',
  confirm_time: '2022-7-29 14:45:16',
  about_order: '0100220292929'
}, {
  order_no: '0100220292929',
  goodsDetail: [{title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}, {title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成'}],
  service_price: '2800',
  number: 3,
  bill_day: '30',
  After_number: 3,
  Price_investment: '8400元',
  garage: '江陵动力旗舰店',
  set_master: '张三',
  order_statusStr: '待发货',
  address: '郑州市',
  door_time: '2022-7-29 14:45:16',
  confirm_time: '2022-7-29 14:45:16',
  about_order: '0100220292929'
}]
