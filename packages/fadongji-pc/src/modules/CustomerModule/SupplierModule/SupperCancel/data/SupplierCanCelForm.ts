import { FormSchema } from '/@/components/Form'

export const filterSupplierForm: FormSchema[] = [
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
export const supplierCancelColumn = [
  { title: '供应商名称', dataIndex: 'fullName' },
  { title: '手机号', dataIndex: 'userName' },
  { title: '地区', dataIndex: 'areaStr' },
  { title: '账号状态', dataIndex: 'statusStr' },
  { title: '认证状态', dataIndex: 'checkStatusStr' },
  { title: '注销状态', dataIndex: 'logoffStatusStr' },
  { title: '店铺名称', dataIndex: 'storeName' },
  { title: '招商经理', dataIndex: 'channelManagerName' },
  { title: '申请注销时间', dataIndex: 'createTime' },
]
