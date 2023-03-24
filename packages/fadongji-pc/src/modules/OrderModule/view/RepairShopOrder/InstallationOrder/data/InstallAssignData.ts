import { FormSchema } from '/@/components/Form'
import { classTechnician } from '/@/modules/ContentModule/view/Authentication/data/configCenterApi'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'searchTime',
    label: '时间',
    component: 'RangePicker',
    slot: 'searchTime',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'majorCarSeries',
    component: 'Select',
    label: '主修车系',
    componentProps: {
      options: [
        {
          label: '日系',
          value: 1,
        },
        {
          label: '国产',
          value: 2,
        },
        {
          label: '韩系',
          value: 3,
        },
        {
          label: '德系',
          value: 4,
        },
        {
          label: '其他',
          value: 5,
        },
      ],
      placeholder: '请选择车系',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'level',
    component: 'ApiSelect',
    label: '等级',
    componentProps: {
      api: classTechnician,
      placeholder: '请选择集师傅等级',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const getTableColumns = (goodsLength) => {
  const customCell = (_, index) => {
    if (index == 0 && goodsLength && goodsLength >= 1) {
      return { rowSpan: goodsLength }
    } else {
      return { rowSpan: 0 }
    }
  }
  // customCell: customCell,
  const column = [
    {
      title: '安装服务名称',
      dataIndex: 'supportName',
      width: '20%',
      colSpan: 0,
      customCell: customCell,
    },
    {
      title: '服务价格',
      dataIndex: 'supportAmount',
      width: '10%',
      colSpan: 0,
      customCell: customCell,
    },
    {
      title: '上门时间',
      dataIndex: 'homeStartTime',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '修理厂',
      dataIndex: 'buyerName',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '集师傅',
      dataIndex: 'realName',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '地区',
      dataIndex: 'repayment',
      width: '15%',
      customCell: customCell,
    },
    {
      title: '订单状态',
      dataIndex: 'statusName',
      width: '10%',
      customCell: customCell,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
      customCell: customCell,
    },
  ]
  return column
}
export const tableColumns = [
  {
    title: '安装服务名称',
    dataIndex: 'supportName',
    width: '20%',
  },
  {
    title: '服务价格',
    dataIndex: 'supportAmount',
    width: '10%',
  },
  {
    title: '上门时间',
    dataIndex: 'homeStartTime',
    width: '15%',
  },
  {
    title: '修理厂',
    dataIndex: 'buyerName',
    width: '10%',
  },
  {
    title: '集师傅',
    dataIndex: 'realName',
    width: '10%',
  },
  {
    title: '地区',
    dataIndex: 'repayment',
    width: '15%',
  },
  {
    title: '订单状态',
    dataIndex: 'statusName',
    width: '10%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
  },
]
