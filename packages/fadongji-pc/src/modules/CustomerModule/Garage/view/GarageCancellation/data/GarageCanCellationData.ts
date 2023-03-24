import { FormSchema } from '/@/components/Form'

export const filterGarageCanCellForm: FormSchema[] = [
  {
    field: 'storeName',
    component: 'Input',
    label: '修理厂名称',
    componentProps: {
      placeholder: '请输入修理厂名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '手机号',
    componentProps: {
      placeholder: '请输入负责人手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

/**
 *@desc “修理厂注销”列表
 */
export const GarageCanCellColumn = [
  { title: '修理厂名称', dataIndex: 'storeName',fixed: 'left',width:'200px' },
  { title: '手机号', dataIndex: 'userName',width:'150px' },
  { title: '地区', dataIndex: 'areaStr',width:'150px' },
  { title: '账号状态', dataIndex: 'checkStatusStr',width:'120px' },
  { title: '注销状态', dataIndex: 'logoffStatusStr',width:'120px' },
  { title: '店铺名称', dataIndex: 'storeName',width:'200px' },
  { title: '渠道经理', dataIndex: 'channelManagerName',width:'150px' },
  { title: '申请注销时间', dataIndex: 'createTime',width:'200px' },
]
