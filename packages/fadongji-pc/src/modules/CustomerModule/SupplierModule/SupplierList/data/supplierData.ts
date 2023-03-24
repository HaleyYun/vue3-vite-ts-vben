import { FormSchema } from '/@/components/Form'
import { CascaderDataApi } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/GarageListApi'

export const filterEmploymentPageForm: FormSchema[] = [
  {
    field: 'userName',
    component: 'Input',
    label: '账号',
    componentProps: {
      placeholder: '请输入账号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'roleCode',
    component: 'ApiSelect',
    label: '供应商名称',
    componentProps: {
      placeholder: '请选择供应商名称',
      options: [
        {
          label: '供应商',
          value: 'supplier',
        },
        {
          label: '服务商',
          value: 'agent',
        },
        {
          label: '修理厂',
          value: 'garage',
        },
        {
          label: '运营平台',
          value: 'op',
        },
      ],
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '供应商手机号',
    componentProps: {
      placeholder: '请输入供应商手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    label: '注册时间',
    field: 'searchTime',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm:ss' },
    },
  },
  {
    field: 'source',
    component: 'Select',
    label: '用户来源',
    componentProps: {
      placeholder: '请选择用户来源',
      options: [
        {
          label: '意见',
          value: '1',
        },
        {
          label: '质量问题',
          value: '2',
        },
      ],
    },
  },
]
export const filterSupplierForm: FormSchema[] = [
  {
    field: 'storeName',
    component: 'Input',
    label: '店铺名称',
    componentProps: {
      placeholder: '请输入店铺名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'shortName',
    component: 'Input',
    label: '供应商名称',
    componentProps: {
      placeholder: '请输入供应商名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '供应商手机号',
    componentProps: {
      placeholder: '请输入供应商手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    label: '所属地区',
    field: 'areaCode',
    component: 'ApiCascader',
    componentProps: {
      api: CascaderDataApi,
      resultField: 'data',
      placeholder: '所属地区',
      fieldNames: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      isLeaf: (record) => {
        return !record.children
      },
      onChange: (e) => {
        console.log(e,'2222')
      },
    },
  },
  {
    label: '注册时间',
    field: 'searchTime',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  {
    label: '是否自营',
    field: 'isSelf',
    component: 'Select',
    componentProps: {
    
      options: [
        {
          label: '是',
          value: true,
          key: true,
        },
        {
          label: '否',
          value: false,
          key: false,
        },
      ],
    },
  },
]

export const supplierColumn = [
  {
    title: '供应商名称',
    dataIndex: 'fullName',
    width: '200px',
  },
  {
    title: '手机号',
    dataIndex: 'userName',
    width: '120px',
  },
  {
    title: '所在地区',
    dataIndex: 'areaStr',
    width: '180px',
  },
  {
    title: '店铺状态',
    dataIndex: 'statusStr',
    width: '160px',
  },
  {
    title: '认证状态',
    dataIndex: 'checkStatusStr',
    width: '120px',
  },
  {
    title: '店铺名称',
    dataIndex: 'storeName',
    width: '180px',
  },
  {
    title: '招商经理',
    dataIndex: 'channelManagerName',
    width: '120px',
  },
  {
    title: '自营服务商',
    dataIndex: 'agentNum',
    width: '120px',
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: '180px',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '250px',
    fixed: 'right',
  },
]
