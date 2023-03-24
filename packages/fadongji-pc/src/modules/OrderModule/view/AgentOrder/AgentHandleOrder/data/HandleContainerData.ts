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
      style:{
        width:'100%'
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
const tableColumns = [
  {
    title: '商品信息',
    dataIndex: 'id',
    width: 120,
  },
  {
    title: '单价/数量',
    dataIndex: 'columnName',
    width: 100,
  },

  {
    title: '金额',
    dataIndex: 'isEnable',
    width: 160,
  },
  {
    title: '卖家',
    dataIndex: 'sort',
    width: 120,
  },
  {
    title: '买家',
    dataIndex: 'editorNickName',
    width: 120,
  },
  {
    title: '发货仓库',
    dataIndex: 'updateTime',
    width: 160,
  },
  {
    title: '订单状态',
    dataIndex: 'creator',
    width: 120,
  },

  {
    title: '操作',
    dataIndex: 'operation',
    width: 340,
  },
]

export const containerConfig = {
  tableColumns,
}

export const filterFormConfig = {
  baseColumns,
  accessColumns,
  rejectColumns,
}
