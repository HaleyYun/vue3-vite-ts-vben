import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'
import {
  getColumnsOptiosFunc,
  getCategoryOptiosFunc,
} from '/@/modules/ContentModule/api/basicFormApis'

const baseColumns = reactive([
  {
    field: 'id',
    component: 'Input',
    label: '服务单编号',
    defaultValue: '',
    componentProps: {
      placeholder: '服务单编号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'goodsName',
    component: 'Input',
    label: '商品名称',
    defaultValue: '',
    componentProps: {
      placeholder: '商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'time',
    label: '申请时间',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
    },
    },
  },
  {
    field: 'buyerName',
    component: 'Input',
    label: '买家',
    defaultValue: '',
    componentProps: {
      placeholder: '买家',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  // 订单状态，2110：待审核，2120：待发货，2130：待签收，2140:待退款,2150:已完成,2160:已关闭 0全部
  {
    field: 'status',
    component: 'Select',
    label: '订单状态',
    componentProps: {
      options: [
        {
          label: '待审核',
          value: '2110',
          key: '2110',
        },
        {
          label: '待退货',
          value: '2120',
          key: '2120',
        },
        {
          label: '待签收',
          value: '2140',
          key: '2140',
        },
        {
          label: '待退款',
          value: '2130',
          key: '2130',
        },
        {
          label: '已完成',
          value: '2150',
          key: '2150',
        },
        {
          label: '已关闭',
          value: '2160',
          key: '2160',
        },
      ],
    },
  },
])

const accessColumns: FormSchema[] = []

const rejectColumns: FormSchema[] = [
  {
    field: 'isRefundOnly',
    component: 'Select',
    label: '售后类型',
    componentProps: {
      options: [
        {
          label: '仅退款',
          value: 'true',
          key: 'true',
        },
        {
          label: '退货退款',
          value: 'false',
          key: 'false',
        },
      ],
    },
  },
]
// businessType: 0
// columnCode: "C000001"
// columnName: "栏目0602"
// createTime: "2022-06-08 15:35:42"
// creator: "1234567890"
// editTime: "2022-06-08 15:35:42"
// editor: "zhaikk"
// id: "132843638517530624"
// isDeleted: 0
// isEnable: 0
// modifier: "1234567890"
// remark: "备注"
// sort: 10
// updateTime: "2022-06-08 15:35:42"
// version: 1
// searchCount: true
// size: 999999
// total: 6
// errors: null
// message: "成功."
// success: true
// time: "2022-06-08 21:52:58"
export const getTableColumns = (goodsLength) => {
  const customCell = (_, index) => {
    if (index == 0 && goodsLength && goodsLength >= 1) {
      return { rowSpan: goodsLength }
    } else {
      return { rowSpan: 0 }
    }
  }
  const column = [
    {
      title: '商品详情',
      dataIndex: 'goodsDetails',
      width: '20%',
      colSpan: 0,
      customCell: customCell,
    },
    {
      title: '单价/数量',
      dataIndex: 'columnName',
      width: '10%',
      colSpan: 0,
      customCell: customCell,
    },
    {
      title: '售后数量',
      dataIndex: 'afterSales',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '退款金额',
      dataIndex: 'refundAmount',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '卖家',
      dataIndex: 'seller',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '买家',
      dataIndex: 'Buyer',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '订单状态',
      dataIndex: 'creatorState',
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
  return column
}
export const tableColumns = [
  {
    title: '商品详情',
    dataIndex: 'goodsDetails',
    width: '20%',
  },
  {
    title: '单价/数量',
    dataIndex: 'columnName',
    width: '10%',
  },

  {
    title: '售后数量',
    dataIndex: 'afterSales',
    width: '15%',
  },
  {
    title: '退款金额',
    dataIndex: 'refundAmount',
    width: '10%',
  },
  {
    title: '卖家',
    dataIndex: 'seller',
    width: '10%',
  },
  {
    title: '买家',
    dataIndex: 'Buyer',
    width: '15%',
  },
  {
    title: '订单状态',
    dataIndex: 'creatorState',
    width: '10%',
  },

  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
]


export const filterFormConfig = {
  baseColumns,
  accessColumns,
  rejectColumns,
}
