import { FormSchema } from '/@/components/Form'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'shortName',
    component: 'Input',
    label: '旧机买家名称',

    componentProps: {
      placeholder: '名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '旧机买家手机号',
    componentProps: {
      placeholder: '请输入手机号',
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
  { title: '旧机买家名称', dataIndex: 'fullName' },
  { title: '手机号', dataIndex: 'userName' },
  { title: '地区', dataIndex: 'areaStr' },
  { title: '账号状态', dataIndex: 'statusStr' },
  { title: '认证状态', dataIndex: 'checkStatusStr' },
  { title: '注销状态', dataIndex: 'logoffStatusStr' },
  // { title: '用户等级', dataIndex: 'level' },
  { title: '申请注销时间', dataIndex: 'createTime' },
]
