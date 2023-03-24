import { FormSchema } from '/@/components/Form'
import { getCategoryFunc } from '/@/modules/ContentModule/api/basicFormApis'
import { CascaderDataApi } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/GarageListApi'

export const GarageFiterColumns = [
  {
    title: '注册手机号',
    dataIndex: 'userName',
    width: '150px',
  },
  {
    title: '修理厂照片',
    dataIndex: 'storeUrl',
    width: '200px',
  },
  {
    title: '负责人',
    dataIndex: 'contractName',
    width: '120px',
  },
  {
    title: '修理厂手机号',
    dataIndex: 'contractPhone',
    width: '120px',
  },
  {
    title: '修理厂名称',
    dataIndex: 'storeName',
    width: '140px',
  },
  {
    title: '服务项目',
    dataIndex: 'serviceProjectStr',
    width: '160px',
  },
  {
    title: '所在地区',
    dataIndex: 'address',
    width: '150px',
  },
  {
    title: '认证状态',
    dataIndex: 'checkStatusStr',
    width: '180px',
  },
  {
    title: '主修车系',
    dataIndex: 'carSeriesStr',
    width: '140px',
  },
  {
    title: '邀请人',
    dataIndex: 'bindInviteeStatus',
    width: '180px',
  },
  {
    title: '绑定人（服务商）',
    dataIndex: 'bindingFullName',
    width: '180px',
  },
  {
    title: '绑定人（分佣）',
    dataIndex: 'bindCommissionStatus',
    width: '180px',
  
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: '200px',
  },
  {
    title: '渠道类型',
    dataIndex: 'sourceStr',
    width: '120px',
  },
  {
    title: '渠道',
    dataIndex: 'inviteUserName',
    width: '150px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
]

export const opFormConfig: FormSchema[] = [
  {
    field: 'storeName',
    component: 'Input',
    label: '修理厂名称',
    componentProps: {
      placeholder: '修理厂名称',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入商品名称' }],
  },
  {
    field: 'userName',
    component: 'Input',
    label: '修理厂手机号',
    componentProps: {
      api: getCategoryFunc,
      placeholder: '修理厂手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  // {
  //   field: 'brandName',
  //   component: 'Select',
  //   label: '修理厂等级',
  //   colProps: {
  //     span: 8,
  //   },
  //   componentProps: {
  //     placeholder: '修理厂等级',
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },
  {
    field: 'shopName',
    component: 'Input',
    label: '卖家',
    componentProps: {
      placeholder: '请输入卖家',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入卖家名称' }],
  },
  {
    label: '最后更新时间',
    field: 'searchTime',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm:ss' },
      fieldMapToTime: [['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss']],
    },
  },
]

export const filterFormSchemasByAwait: FormSchema[] = [
  {
    field: 'storeName',
    component: 'Input',
    label: '修理厂名称',
    componentProps: {
      placeholder: '修理厂名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '修理厂手机号',
    componentProps: {
      placeholder: '修理厂手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  // {
  //   field: 'brandName',
  //   component: 'Select',
  //   label: '修理厂等级',
  //   colProps: {
  //     span: 6,
  //   },
  //   componentProps: {
  //     placeholder: '修理厂等级',
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },
  {
    field: 'searchTime',
    label: '注册时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  // {
  //   field: 'isCash',
  //   component: 'Select',
  //   label: '支付方式',
  //   componentProps: {
  //     options: [
  //       {
  //         label: '现金支付',
  //         value: '1',
  //         key: '1',
  //       },
  //       {
  //         label: '账期支付',
  //         value: '0',
  //         key: '2',
  //       },
  //     ],
  //   },
  // },
  {
    field: 'source',
    component: 'Select',
    label: '渠道类型',
    componentProps: {
      placeholder: '渠道类型',
      options: [
        {
          label: 'APP注册',
          value: '1',
          key: '1',
        },
        {
          label: 'H5邀请',
          value: '2',
          key: '2',
        },
        {
          label: '运营后台添加',
          value: '3',
          key: '3',
        },
        {
          label: 'APP代添加',
          value: '4',
          key: '4',
        },
        {
          label: '小程序导入',
          value: '5',
          key: '5',
        },
      ],
    },
  },
  {
    label: '所属地区',
    field: 'areaCode',
    component: 'ApiCascader',
    componentProps: {
      api: CascaderDataApi,
      placeholder: '所属地区',
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
]
export const lastGoneData: FormSchema[] = [
  // {
  //   field: '[starTime, endTime]',
  //   label: '最后更新时间',
  //   component: 'RangePicker',
  //   colProps: {
  //     span: 6,
  //   },
  //   componentProps: {
  //     format: 'YYYY-MM-DD HH:mm:ss',
  //     placeholder: ['开始时间', '结束时间'],
  //     showTime: { format: 'HH:mm:ss' },
  //   },
  // },
]
export const accessGoneData: FormSchema[] = [
  {
    field: '[starTime, endime]',
    label: '下架时间',
    component: 'RangePicker',
    colProps: {
      span: 6,
    },
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm:ss' },
    },
  },
]

export const hasNoneData: FormSchema[] = [
  {
    field: 'shope',
    component: 'ApiSelect',
    label: '库存状态',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请选择库存状态',
      api: getCategoryFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
export const hasViolationData: FormSchema[] = [
  {
    field: 'shpe',
    component: 'ApiSelect',
    label: '违规下架时间',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请选择下架时间',
      api: getCategoryFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
