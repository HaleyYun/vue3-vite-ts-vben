import { FormSchema } from '/@/components/Form'
export const financialUserAccountForm: FormSchema[]  = [
  {
    field: 'orderNo',
    component: 'Input',
    label: '订单编号',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入订单编号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: '[startTime, endTime]',
    label: '履约时间',
    colProps: {
      span: 6,
    },
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
    },
  },
]
export const financialUserAccountColumn = [
  {
    title: '用户名称',
    dataIndex: 'userName',
    width: 280,
  },
  {
    title: '用户编号',
    dataIndex: 'userNo',
    width: 240,
  },
  {
    title: '待分账金额',
    dataIndex: 'waitSplitAmount',
    width: 240,
  },
  {
    title: '账户余额',
    dataIndex: 'accountBalance',
  },
]
