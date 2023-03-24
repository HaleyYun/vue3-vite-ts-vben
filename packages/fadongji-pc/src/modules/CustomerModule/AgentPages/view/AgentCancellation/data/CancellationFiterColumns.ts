import { FormSchema } from '/@/components/Form'
import { getCategoryFunc, getBrandFunc } from '/@/modules/ContentModule/api/basicFormApis'

export const CancellationFiterColumns = [
  {
    title: '服务商名称',
    dataIndex: 'fullName',
    width: '150px',
    fixed: 'left',
  },
  {
    title: '手机号',
    dataIndex: 'userName',
    width: '150px',
  },
  {
    title: '地区',
    dataIndex: 'areaStr',
    width: '150px',
  },
  {
    title: '账号状态',
    dataIndex: 'status',
    width: '100px',
  },
  {
    title: '认证状态',
    dataIndex: 'checkStatus',
    width: '150px',
  },
  {
    title: '注销状态',
    dataIndex: 'logoffStatus',
    width: '160px',
  },

  {
    title: '店铺名称',
    dataIndex: 'storeName',
    width: '120px',
  },
  {
    title: '渠道经理',
    dataIndex: 'inviteUserId',
    width: '120px',
  },
  // {
  //   title: '用户等级',
  //   dataIndex: 'dealTime',
  //   width: '180px',
  // },
  {
    title: '申请注销时间',
    dataIndex: 'createTime',
    width: '150px',
  },
]

export const opFormConfig: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
    rules: [{ required: true, message: '请输入商品名称' }],
  },
  {
    field: 'categoryInfo',
    component: 'ApiSelect',
    label: '商品类别',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: getCategoryFunc,
      placeholder: '请选择商品类别',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'brandName',
    component: 'ApiSelect',
    label: '商品品牌',
    colProps: {
      span: 8,
    },
    componentProps: {
      api: getBrandFunc,
      placeholder: '请选择商品品牌',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
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
      fieldMapToTime: [['searchTime', ['createStartTime', 'createEndTime'], 'YYYY-MM-DD HH:mm:ss']],
    },
  },
]

export const filterFormSchemasByAwait: FormSchema[] = [
  {
    field: 'shortName',
    component: 'Input',
    label: '服务商名称',

    componentProps: {
      placeholder: '请输入服务商名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '服务商手机号',
    componentProps: {
      placeholder: '请输入服务商手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
