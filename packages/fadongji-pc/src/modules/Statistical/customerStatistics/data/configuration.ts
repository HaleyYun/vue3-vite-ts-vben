
import { AreaDataApi } from '/@/api/model/dictionaryApi'
import { getAgentData } from '/@/modules/ContentModule/api/basicFormApis'

export const filterFormSchemas = [
  {
    label: '服务商地区',
    field: 'areaCodeSub',
    component: 'ApiCascader',
    componentProps: {
      api: AreaDataApi,
      placeholder: '服务商地区',
      fieldNames: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      isLeaf: (record) => {
        return !record.children
      },
    },
  },
  {
    field: 'agentId',
    component: 'ApiSearchSelect',
    label: '服务商',
    componentProps: {
      api: getAgentData,
      placeholder: '请输入服务商名称搜索',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: '日期',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      }
    },
  },
];



export const customerColumns = [
  {
    title: '排名',
    dataIndex: 'rankNumber',
    width: '100px'
  },
  {
    title: '服务商名称',
    dataIndex: 'buyerName',
    width: '15%',
  },
  {
    title: '投资数量',
    dataIndex: 'salesCount',
  },
  {
    title: '投资额（元）',
    dataIndex: 'salesAmount',
    sorter: (a, b) => a.salesAmount - b.salesAmount,
  },

];
export const CustomerInvestmentColumns = [
  {
    title: '排名',
    dataIndex: 'rankNumber',
    width: '100px'
  },
  {
    title: '服务商名称',
    dataIndex: 'buyerName',
    width: '15%',
  },
  {
    title: '投资次数',
    dataIndex: 'number',
  },
];
export const CustomerSales = [
  {
    title: '排名',
    dataIndex: 'rankNumber',
    width: '100px'
  },
  {
    title: '服务商名称',
    dataIndex: 'sellerName',
    width: '15%',
  },
  {
    title: '销货数量',
    dataIndex: 'salesCount',
    sorter: (a, b) => a.salesCount - b.salesCount,
  },
  {
    title: '销售额（元）',
    dataIndex: 'salesAmount',
    sorter: (a, b) => a.salesAmount - b.salesAmount,
  },
];
export const AssociatedRepairShopColumns = [
  {
    title: '排名',
    dataIndex: 'ranking',
    width: '100px'
  },
  {
    title: '服务商名称',
    dataIndex: 'companyName',
    width: '15%',
  },
  {
    title: '关联修理厂数量',
    dataIndex: 'count',
    sorter: (a, b) => a.count - b.count,
  },
  {
    title: '销量',
    dataIndex: 'salesNum',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];

export const getColumns = (key) => {
  let columns = []
  switch (key) {
    case '1':
      columns = customerColumns
      break;
    case '2':
      columns = CustomerInvestmentColumns
      break;
    case '3':
      columns = CustomerSales
      break;
    case '4':
      columns = AssociatedRepairShopColumns
      break;
  }
  return columns;
}




export const MockTableData = [{
  order_no: '0100220292929',
  goodsDetail: [{ title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }, { title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }],
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
  goodsDetail: [{ title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }, { title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }],
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
  goodsDetail: [{ title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }, { title: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成' }],
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
