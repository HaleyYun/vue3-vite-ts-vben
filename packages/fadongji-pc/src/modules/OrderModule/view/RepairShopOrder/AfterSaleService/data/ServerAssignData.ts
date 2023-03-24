import { FormSchema } from '/@/components/Form'
import { getAfterSaleStatus } from '/@/api/data/ModelFormApis'

export const afterSaleTableColumn = [
  {
    title: '商品信息',
    dataIndex: 'productInfo',
    width: '120px',
  },
  {
    title: '商品识别码',
    dataIndex: 'engineNo',
    width: '145px',
  },
  {
    title: '商品型号',
    dataIndex: 'modelName',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '补偿金额',
    dataIndex: 'amount',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '故障部件',
    dataIndex: 'unit',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '150px',
  },
  {
    title: '买家',
    dataIndex: 'buyerName',
    width: '120px',
  },
  {
    title: '生产商',
    dataIndex: 'supplierName',
    width: '140px',
  },
  {
    title: '订单状态',
    dataIndex: 'statusName',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    ellipsis: true,
    width: '160px',
    fixed: 'right',
  },
]

export const afterSaleTableColumnTwo = [
  {
    title: '商品信息',
    dataIndex: 'productInfo',
    width: '120px',
  },
  {
    title: '商品识别码',
    dataIndex: 'engineNo',
    width: '145px',
  },
  {
    title: '商品型号',
    dataIndex: 'modelName',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '补偿金额',
    dataIndex: 'amount',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '故障部件',
    dataIndex: 'unit',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '返还旧件',
    dataIndex: 'isSendBack',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '150px',
  },
  {
    title: '买家',
    dataIndex: 'buyerName',
    width: '120px',
  },
  {
    title: '生产商',
    dataIndex: 'supplierName',
    width: '140px',
  },
  {
    title: '订单状态',
    dataIndex: 'statusName',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    ellipsis: true,
    width: '160px',
    fixed: 'right',
  },
]

export const afterSaleTableColumnThree = [
  {
    title: '商品信息',
    dataIndex: 'productInfo',
    width: '120px',
  },
  {
    title: '商品识别码',
    dataIndex: 'engineNo',
    width: '145px',
  },
  {
    title: '补偿金额',
    dataIndex: 'amount',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '150px',
  },
  {
    title: '买家',
    dataIndex: 'buyerName',
    width: '120px',
  },
  {
    title: '生产商',
    dataIndex: 'supplierName',
    width: '140px',
  },
  {
    title: '处理结果',
    dataIndex: 'result',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '售后上门服务',
    dataIndex: 'supportOrderId',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '订单状态',
    dataIndex: 'statusName',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    ellipsis: true,
    width: '160px',
    fixed: 'right',
  },
]

export const assignFormSchemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '服务单编号',
    componentProps: {
      type: 'number',
      placeholder: '服务单编号',
    },
  },
  {
    field: 'goodsName',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '商品名称',
    },
  },

  {
    field: 'searchTime',
    label: '申请时间',
    component: 'RangePicker',
    componentProps: {
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
    componentProps: {
      placeholder: '买家名称',
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
    field: 'orderStatus',
    component: 'ApiSelect',
    label: '订单状态',
    componentProps: {
      api: getAfterSaleStatus,
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const saleAfterDetailTableColumns = [
  {
    title: '商品ID',
    dataIndex: 'id',
    width: '120px',
  },
  {
    title: '商品信息',
    dataIndex: 'productInfo',
    width: '160px',
  },
  {
    title: '商品识别码',
    dataIndex: 'engineNo',
    width: '120px',
  },
  {
    title: '销售价格',
    dataIndex: 'originalPrice',
    ellipsis: true,
    width: '100px',
  },
  {
    title: '质保时间',
    dataIndex: 'warrantyMonth',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '激活时间',
    dataIndex: 'activeTime',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '支付方式',
    dataIndex: 'payMethod',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '实付款',
    dataIndex: 'payAmountTotal',
    ellipsis: true,
    width: '100px',
  },
  {
    title: '买家',
    dataIndex: 'buyerName',
    width: '150px',
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: '150px',
  },
  {
    title: '生产商',
    dataIndex: 'supplierName',
    width: '150px',
  },
]
