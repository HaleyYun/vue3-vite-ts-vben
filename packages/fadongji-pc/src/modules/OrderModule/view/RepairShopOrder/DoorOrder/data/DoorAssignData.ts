import { FormSchema } from '/@/components/Form'
import { classTechnician } from '/@/modules/ContentModule/view/Authentication/data/configCenterApi'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'searchTime',
    label: '时间',
    component: 'RangePicker',
    slot: 'searchTime',
    componentProps: {
      showTime: { format: 'HH:mm:ss' },
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  // {
  //     field: 'source',
  //     component: 'Select',
  //     label: '订单来源',
  //     componentProps: {
  //       placeholder: '请选择订单来源',
  //       options: [
  //         {
  //           label: '安卓',
  //           value: '1',
  //           key: '1',
  //         },
  //         {
  //           label: 'ios',
  //           value: '2',
  //           key: '2',
  //         },
  //         {
  //           label: 'H5',
  //           value: '3',
  //           key: '3',
  //         },
  //         {
  //           label: 'PC',
  //           value: '4',
  //           key: '4',
  //         },
  //         {
  //           label: '小程序',
  //           value: '5',
  //           key: '5',
  //         },
  //         {
  //           label: '公众号',
  //           value: '6',
  //           key: '6',
  //         },
  //       ],
  //     },
  //   },
  {
    field: 'majorCarSeries',
    component: 'Select',
    label: '主修车系',
    componentProps: {
      placeholder: '请选择车系',
      options: [
        {
          label: '日系',
          value: '1',
          key: '1',
        },
        {
          label: '国产',
          value: '2',
          key: '2',
        },
        {
          label: '韩系',
          value: '3',
          key: '3',
        },
        {
          label: '德系',
          value: '4',
          key: '4',
        },
        {
          label: '其他',
          value: '5',
          key: '5',
        },
      ],
    },
  },

  {
    field: 'level',
    component: 'ApiSelect',
    label: '等级',
    componentProps: {
      api: classTechnician,
      placeholder: '请选择集师傅等级',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
export const assignFormSchemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '订单编号',
    componentProps: {
      placeholder: '订单编号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'supportName',
    component: 'Input',
    label: '服务名称',
    componentProps: {
      placeholder: '服务名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'searchTime',
    label: '下单时间',
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
    label: '修理厂',
    componentProps: {
      placeholder: '修理厂',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'masterName',
    component: 'Input',
    label: '集师傅',
    componentProps: {
      placeholder: '集师傅名称/手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const DoorTableColumn = [
  {
    title: '服务名称',
    dataIndex: 'supportName',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '服务价格',
    dataIndex: 'supportAmount',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '上门时间',
    dataIndex: 'homeStartTime',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '修理厂',
    dataIndex: 'buyerName',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '集师傅',
    dataIndex: 'masterName',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '地区',
    dataIndex: 'orderAddress',
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
    width: '150px',
    fixed: 'right',
  },
]

//基本信息
export const baseData: any[] = [
  {
    title: '订单编号',
    key: 'id',
  },
  {
    title: '服务名称',
    key: 'supportName',
  },
  {
    title: '服务价格',
    key: 'supportAmount',
  },
  {
    title: '商品识别码',
    key: 'engineNo',
  },
  {
    title: '上门指导',
    key: 'homeMsg',
  },
  {
    title: '故障描述',
    key: 'desc',
  },
  {
    title: '故障图片',
    key: 'pic',
  },
  {
    title: '修理厂',
    key: 'buyerName',
  },
  {
    title: '集师傅',
    key: 'masterName',
  },
  {
    title: '上门时间',
    key: 'homeStartTime',
  },
  {
    title: '售后地址',
    key: 'orderAddress',
  },
  {
    title: '关联售后订单',
    key: 'relationOrderId',
  },
]
