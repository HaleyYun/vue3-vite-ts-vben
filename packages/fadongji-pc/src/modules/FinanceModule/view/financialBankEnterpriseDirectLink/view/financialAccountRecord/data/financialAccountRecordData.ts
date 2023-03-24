import { FormSchema } from '/@/components/Form'
export const financialAccountRecordForm: FormSchema[]  = [
  {
    field: '[startTime, endTime]',
    label: '日期',
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


export const financialAccountRecordColumn = [
  {
    title: '日期',
    dataIndex: 'createTime',
    width: 280,
  },
  {
    title: '期初余额',
    dataIndex: 'openingBalance',
    width: 280,
  },
  {
    title: '期末余额',
    dataIndex: 'closingBalance',
    width: 280,
  },
  {
    title: '本日变动',
    dataIndex: 'currentDayChange',
  },
]
