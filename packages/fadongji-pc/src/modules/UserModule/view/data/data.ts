export const userColumn = [
  {
    title: '用户昵称',
    dataIndex: 'nickName',
    align: 'center',
    width: '150px',
  },
  {
    title: '手机号',
    dataIndex: 'userName',
    key: 'move',
    slots: { customRender: '' },
    align: 'center',
  },
  {
    title: '身份',
    dataIndex: 'roleNum',
    key: 'roleNum',
    slots: { customRender: '' },
    align: 'center',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    slots: { customRender: '' },
    align: 'center',
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    key: 'createTime',
    slots: { customRender: '' },
    align: 'center',
  },
  {
    title: '最后登录',
    dataIndex: 'loginTime',
    key: 'loginTime',
    slots: { customRender: '' },
    align: 'center',
  },
  {
    title: '启用状态',
    dataIndex: 'person',
    key: 'person',
    slots: { customRender: 'parent' },
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: '150px',
    fixed: 'right',
    slots: { customRender: 'operation' },
    align: 'center',
  },
]

export const userColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'identityId',
    slots: { customRender: '' },
    align: 'center',
    width: '170px',
  },

  {
    title: '身份',
    dataIndex: 'identityName',
    key: 'identityName',
    slots: { customRender: '' },
    align: 'center',
  },
  {
    title: '加入时间',
    dataIndex: 'identityDateTime',
    key: 'identityDateTime',
    slots: { customRender: '' },
    align: 'center',
  },

  {
    title: '启用状态',
    dataIndex: 'person',
    key: 'person',
    slots: { customRender: 'parent' },
    align: 'center',
  },
  // {
  //   title: '操作',
  //   dataIndex: 'operation',
  //   key: 'operation',
  //   width: '300px',
  //   slots: { customRender: 'operation' },
  //   align: 'center',
  // },
]

export const basicesItem = [
  {
    field: 'id',
    label: 'ID',
    labelMinWidth:100,
    contentMinWidth:200,
  },
  {
    field: 'photoUrl',
    label: '头像',
    labelMinWidth:100,
    contentMinWidth:200,
  },
  {
    field: 'nickName',
    label: '昵称',
    labelMinWidth:120
  },
  {
    field: 'userName',
    label: '手机号',
    labelMinWidth:120
  },
  {
    field: 'weChatName',
    label: '微信名',
    labelMinWidth:120
  },
  {
    field: 'weChatOpenId',
    label: 'openid',
    labelMinWidth:120
  },

  {
    field: 'tikTokName',
    label: '抖音名',
    labelMinWidth:120,
  },
  {
    field: 'tikTokOpenId',
    label: '抖音id',
    labelMinWidth:120
  },
  {
    field: 'status',
    label: '状态',
    labelMinWidth:100,
    contentMinWidth:200,
    render: (curVal) => {
      return `${curVal == true?'正常':'禁用'}`;
    },

  },
  {
    field: 'createTime',
    label: '首次加入时间',
    labelMinWidth:120
  },
  {
    field: 'licenseId',
    label: '注册设备ID',
    labelMinWidth:120
  },
  {
    field: 'level',
    label: '用户等级',
    labelMinWidth:120
  },

];
