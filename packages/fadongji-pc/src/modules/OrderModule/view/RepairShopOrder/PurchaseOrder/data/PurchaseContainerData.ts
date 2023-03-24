import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'
import adminHttp from '/@/utils/http/adminHttp'
import { CascaderDataApi } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/GarageListApi'

//订单仓库v1/order/house/company/ids
export const getOrderFunc = (code) => {
  return new Promise((resolve) => {
    adminHttp.Order.orderHouseCompanyIds(code)
      .then((res) => {
        const ceshi = []
        res.data.map((item) =>
          ceshi.push({
            label: item.warehouseName,
            value: item.warehouseId,
          }),
        ),
          resolve(ceshi)
      })
      .catch(() => {
        resolve([])
      })
  })
}

const baseColumns = reactive([
  {
    field: 'id',
    component: 'Input',
    label: '订单编号',
    defaultValue: '',
    componentProps: {
      placeholder: '订单编号',
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
    label: '下单时间',
    colProps: {
      span: 6,
    },
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: 'shopName',
    component: 'Input',
    label: '卖家名称',
    defaultValue: '',
    componentProps: ({ schema, formActionType, formModel }) => {
      return {
        placeholder: '卖家名称',
        onChange: (e) => {
          const { updateSchema } = formActionType
          formModel.warehouseId = undefined
          if (e.target._value == '') {
            updateSchema({
              field: 'warehouseId',
              componentProps: {
                params: { storeName: e.target._value },
              },
            })
          }
        },
        onBlur: (e) => {
          const { updateSchema } = formActionType
          updateSchema({
            field: 'warehouseId',
            componentProps: {
              params: { storeName: e.target._value },
            },
          })
        },
      }
    },
  },
  {
    field: 'warehouseId',
    component: 'ApiSelect',
    label: '发货仓库',
    componentProps: {
      params: { storeName: '' },
      api: getOrderFunc,
      onChange: (e) => {
        console.log(e)
      },
      style: {
        width: '100%',
        maxWidth: '100%',
      },
    },
  },
  {
    field: 'buyerName',
    component: 'Input',
    label: '买家',
    defaultValue: '',
    componentProps: {
      placeholder: '买家名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'isCash',
    component: 'Select',
    label: '支付方式',
    componentProps: {
      options: [
        {
          label: '在线支付',
          value: true,
          key: true,
        },
        {
          label: '账期支付',
          value: false,
          key: false,
        },
      ],
    },
  },
  {
    field: 'goodsCode',
    component: 'Input',
    label: 'SKU编码',
    defaultValue: '',
    componentProps: {
      placeholder: 'SKU编码',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'source',
    component: 'Select',
    label: '订单来源',
    componentProps: {
      placeholder: '请选择订单来源',
      options: [
        {
          label: '安卓',
          value: '1',
          key: '1',
        },
        {
          label: 'IOS',
          value: '2',
          key: '2',
        },
        {
          label: 'H5',
          value: '3',
          key: '3',
        },
        {
          label: '小程序',
          value: '5',
          key: '5',
        },
        {
          label: '公众号',
          value: '6',
          key: '6',
        },
      ],
    },
  },
  // {
  //   field: 'isDeleted',
  //   component: 'ApiSelect',
  //   label: '收货地区',
  //   defaultValue: '',
  //   componentProps: {
  //     placeholder: '收货地区',
  //     api: getColumnsOptiosFunc,
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },
  {
    field: 'area',
    component: 'ApiSelect',
    label: '收货地区',
    colProps: {
      span: 6,
    },
    componentProps: {
      api: CascaderDataApi,
      placeholder: '收货地区',
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'warnType',
    component: 'Select',
    label: '提醒发货',

    placeholder: '请选择提醒发货状态',
    componentProps: {
      options: [
        {
          label: '全部',
          value: '',
          key: '',
        },
        {
          label: '是',
          value: true,
          key: '1',
        },
        {
          label: '否',
          value: false,
          key: '2',
        },
      ],
    },
  },
])

const accessColumns: FormSchema[] = []

const rejectColumns: FormSchema[] = []
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
//分润
const profitColumns = [
  {
    title: '佣金名称',
    dataIndex: 'keyName',
    width: 120,
  },
  {
    title: '佣金金额',
    dataIndex: 'amount',
    width: 100,
  },

  {
    title: '分账方名称',
    dataIndex: 'accountName',
    width: 160,
  },
  {
    title: '分账方账号',
    dataIndex: 'accountId',
    width: 120,
  },
]

//物流
const logisticsColumns = [
  {
    title: '发货方式',
    dataIndex: 'deliveryType',
    width: 120,
  },
  {
    title: '物流公司',
    dataIndex: 'company',
    width: 120,
  },
  {
    title: '物流单号',
    dataIndex: 'orderNumber',
    width: 100,
  },

  {
    title: '物流电话',
    dataIndex: 'mobile',
    width: 160,
  },
  {
    title: '发货产品',
    dataIndex: 'product',
    width: 120,
  },
  {
    title: '发货单',
    dataIndex: 'logisticsUrl',
    width: 120,
  },
]
//商品信息
const goodsColumns = [
  {
    title: '商品id',
    dataIndex: 'code',
  },
  {
    title: '商品信息',
    dataIndex: 'goodsName',
    width: '280px',
  },
  {
    title: '发货仓库',
    dataIndex: 'warehouseName',
  },
  {
    title: '数量',
    dataIndex: 'goodsCount',
  },
  {
    title: '商品单价',
    dataIndex: 'originalPrice',
  },
  {
    title: '发动机识别码',
    dataIndex: 'engineNos',
  },
  {
    title: '优惠金额',
    dataIndex: 'three',
  },
  {
    title: '退款退货进度',
    dataIndex: 'progress',
  },
]
//不带退货进度的
const progressColumns = [
  {
    title: '商品id',
    dataIndex: 'code',
  },
  {
    title: '商品信息',
    dataIndex: 'goodsName',
    width: '280px',
  },
  {
    title: '发货仓库',
    dataIndex: 'warehouseName',
  },
  {
    title: '数量',
    dataIndex: 'goodsCount',
  },
  {
    title: '商品单价',
    dataIndex: 'originalPrice',
  },
  {
    title: '发动机识别码',
    dataIndex: 'engineNos',
  },
  {
    title: '优惠金额',
    dataIndex: 'three',
  },
]
const dataCompanyId: any[] = [
  {
    title: '订单编号',
    key: 'id',
  },
  {
    title: '买家',
    key: 'buyerName',
  },
  {
    title: '支付方式',
    key: 'isCash',
    content: '支付宝',
  },
  {
    title: '订单来源',
    key: '',
    content: '小程序',
  },
  {
    title: '可得积分',
    key: '',
    content: '200',
  },
  {
    title: '活动信息',
    key: 'activityDetail',
    content: 'APP首单减免8元',
  },
  {
    title: '收货地址',
    key: 'orderAddress',
    content: '张木子 18000000000 河南省郑州市金水区正商木华广场A座编码：450000',
  },
  {
    title: '卖家',
    key: 'shopName',
    content: '上海左班汽车零部件',
  },
  {
    title: '备注',
    key: '',
    content: '备注信息',
  },
  {
    title: '发票信息',
    key: '',
  },
]
export const containerConfig = {
  tableColumns,
  profitColumns,
  logisticsColumns,
  goodsColumns,
  progressColumns,
  dataCompanyId,
}

export const filterFormConfig = {
  baseColumns,
  accessColumns,
  rejectColumns,
}
