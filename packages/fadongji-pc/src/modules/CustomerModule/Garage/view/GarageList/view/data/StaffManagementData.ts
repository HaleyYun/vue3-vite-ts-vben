import { FormSchema } from '/@/components/Form'

export const schemas: FormSchema[] = [
  {
    field: 'account',
    component: 'Input',
    label: '账号',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入账号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'roleId',
    component: 'Select',
    label: '所属角色',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '所属角色',
      options: [],
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'time',
    label: '添加时间',
    component: 'RangePicker',
    colProps: {
      span: 8,
    },
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm:ss' },
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '账号启用状态',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '启用',
          value: false,
          key: '1',
        },
        {
          label: '禁用',
          value: true,
          key: '2',
        },
      ],
    },
  },
]

export const columns = [
  {
    title: '员工名称',
    dataIndex: 'realName',
    key: 'realName',
    align: 'center',
  },
  {
    title: '所属角色',
    dataIndex: 'roleName',
    key: 'roleName',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'userName',
    key: 'userName',
    align: 'center',
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '是否启用',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
  },
]

export const basicesItem = [
  {
    field: 'id',
    label: 'ID',
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
  {
    field: 'level',
    label: '修理厂等级',
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
  {
    field: 'storeName',
    label: '修理厂名称',
    labelMinWidth: 120,
  },
  {
    field: 'checkStatusStr',
    label: '认证状态',
    labelMinWidth: 120,
  },
  {
    field: 'contractName',
    label: '修理厂负责人',
    labelMinWidth: 120,
  },
  {
    field: 'contractPhone',
    label: '联系电话',
    labelMinWidth: 120,
  },

  {
    field: 'areaStr',
    label: '所在地区',
    labelMinWidth: 120,
  },
  {
    field: 'address',
    label: '详细地址',
    labelMinWidth: 120,
  },
  {
    field: 'serviceProjectStr',
    label: '服务项目',
    labelMinWidth: 120,
  },

  {
    field: 'sourceStr',
    label: '用户来源',
    labelMinWidth: 120,
  },
  {
    field: 'bindInviteeStatus',
    label: '邀请人',
    labelMinWidth: 120,
  },
  {
    field: 'bindPeople',
    label: '绑定人（服务商）',
    labelMinWidth: 120,
  },
  {
    field: 'bindCommissionStatus',
    label: '绑定人（分佣）',
    labelMinWidth: 120,
  },
  {
    field: 'channelManagerName',
    label: '渠道经理',
    labelMinWidth: 120,
  },
  {
    field: 'carSeriesStr',
    label: '主修车系',
    labelMinWidth: 120,
  },
  {
    field: 'scale',
    label: '规模',
    labelMinWidth: 120,
  },
  {
    field: 'locationNumber',
    label: '工位数量',
    labelMinWidth: 120,
  },
  {
    field: 'createTime',
    label: '注册时间',
    labelMinWidth: 120,
  },
  {
    field: 'integral',
    label: '积分',
    labelMinWidth: 120,
  },
]
