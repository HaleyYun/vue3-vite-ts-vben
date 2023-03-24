import { FormSchema } from '/@/components/Form'
import { classTechnician } from '/@/modules/ContentModule/view/Authentication/data/configCenterApi'

export const assignColumns = [
  {
    title: '姓名',
    dataIndex: 'realName',
  },
  {
    title: '手机号',
    dataIndex: 'userName',
    width: '180px',
  },
  {
    title: '服务技能',
    dataIndex: 'initials',
  },
  {
    title: '接单状态',
    dataIndex: 'status',
  },
  {
    title: '主修车系',
    dataIndex: 'carSeries',
  },
  // {
  //   title: '等级',
  //   dataIndex: 'levelId',
  // },
  // {
  //   title: '距离修理厂',
  //   dataIndex: 'origin',
  // },
  {
    title: '操作',
    dataIndex: 'operation',
  },
]

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'searchTime',
    label: '时间',
    component: 'RangePicker',
    slot: 'searchTime',
    componentProps: {
      showTime: { format: 'HH:mm:ss' },
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
      placeholder: '请选择车系',
      options: [
        {
          label: '日系',
          value: '1',
          key: '1',
        },
        {
          label: '国产',
          value: '2',
          key: '2',
        },
        {
          label: '韩系',
          value: '3',
          key: '3',
        },
        {
          label: '德系',
          value: '4',
          key: '4',
        },
        {
          label: '其他',
          value: '5',
          key: '5',
        },
      ],
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
