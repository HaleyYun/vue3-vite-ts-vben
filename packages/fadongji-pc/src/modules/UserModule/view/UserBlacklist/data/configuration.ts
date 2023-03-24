import {FormSchema} from '/@/components/Form'




const getUserSwitchFunc = () => {
  return new Promise((resolve) => {
    resolve([
      { label: '全部', value: '' },
      { label: '启用', value: true },
      { label: '关闭', value: false },
    ])
  })
}
export const filterFormSchemas: FormSchema[] = [
  {
    field: 'userName',
    component: 'Input',
    label: '手机号',
    defaultValue: '',
    componentProps: {
      placeholder: '手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'status',
    component: 'ApiSelect',
    label: '账号启用状态',
    defaultValue: '',
    componentProps: {
      placeholder: '请选择启用状态',
      api: getUserSwitchFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

/**
 *@desc 改变状态 table Column 配置
 */
export const tableColumns = [
  {title: '用户名称', dataIndex: 'nickName', width: '150px',},
  {
    title: '手机号',
    dataIndex: 'userName',
    key: 'move',
    align: 'center',
  },
  {
    title: '身份',
    dataIndex: 'roleNum',
    key: 'roleNum',
    align: 'center',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '最后登录',
    dataIndex: 'loginTime',
    key: 'loginTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
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
    field: '状态',
    label: 'status',
    labelMinWidth:100,
    contentMinWidth:200,
    render: (curVal) => {
      return `${curVal == true?'正常':'禁用'}`;
    },

  },
  {
    field: 'loginTime',
    label: '首次加入时间',
    labelMinWidth:120
  },
  {
    field: 'licenseId',
    label: '注册设备ID',
    labelMinWidth:120
  },
  {
    field: 'use_level',
    label: '用户等级',
    labelMinWidth:120
  },

];





// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    id:29903,
    shortName: '长葛姜天龙',
    status: 1,
    userName: '1568888888',
    shopName:'长葛某某汽修',
    statusStr:'正常',
    checkStatusStr:'已认证',
    logoffStatusStr:'待审核',
    level: 'LV5',
    createTime: '2022-03-28 11:11:11'
  }
];




