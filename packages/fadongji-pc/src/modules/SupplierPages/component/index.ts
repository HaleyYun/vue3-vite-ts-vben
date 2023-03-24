// 自定义模板内容、可根// 自定义模板内容、可根据需求按需编辑相应的内容
export interface columnsItem {
  key: string
  align: string
  title: string
  dataIndex: string
}

export const columnsList: columnsItem[] = [
  {
    align: 'center',
    title: '供应商ID',
    dataIndex: 'supplierID',
    key: '1',
  },
  {
    align: 'center',
    title: '供应商信息',
    dataIndex: 'information',
    key: '2',
  },
  {
    align: 'center',
    title: '所属地区',
    dataIndex: 'region',
    key: '3',
  },
  {
    align: 'center',
    title: '等级',
    dataIndex: 'Grade',
    key: '4',
  },
  {
    align: 'center',
    title: '产品运营',
    dataIndex: 'operation',
    key: '5',
  },
  {
    align: 'center',
    title: '关联代理商',
    dataIndex: 'agent',
    key: '6',
  },
  {
    align: 'center',
    title: '注册时间',
    dataIndex: 'register',
    key: '7',
  },
  {
    align: 'center',
    title: '注册认证状态',
    dataIndex: 'certification',
    key: '8',
  },
  {
    align: 'center',
    title: '启用状态',
    dataIndex: 'Enable',
    key: '9',
    slots: { customRender: 'enable' },
  },
  {
    align: 'center',
    title: '操作',
    key: '10',
    width: '20%',
    slots: { customRender: 'action' },
  },
]
