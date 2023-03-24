import { FormSchema } from '/@/components/Form'

export const filterGarageAssetsForm: FormSchema[] = [
  {
    field: 'storeName',
    component: 'Input',
    label: '修理厂名称',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入修理厂名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'subjectPhone',
    component: 'Input',
    label: '修理厂手机号',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

/**
 *@desc “修理厂注销”列表
 */
export const GarageAssetsColumn = [
  {title: '客户ID', dataIndex: 'id'},
  {title: '客户类型', dataIndex: 'platformCode'},
  {title: '客户名称', dataIndex: 'platformCodeStr'},
  {title: '主体手机号', dataIndex: 'subjectPhone'},
  {title: '积分', dataIndex: 'integral'},
  {title: '成长值', dataIndex: 'growthValue'},
  {title: '优惠券', dataIndex: 'logoffStatusStr'},
  {title: '账户余额', dataIndex: 'accountBalance'},
  {title: '应付账款', dataIndex: 'accountsPayable'},
  {title: '明细', dataIndex: 'action'},
]
