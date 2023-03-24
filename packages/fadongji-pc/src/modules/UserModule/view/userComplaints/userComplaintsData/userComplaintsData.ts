import {FormSchema} from "/@/components/Form";

export const filterComplaintsForm: FormSchema[] = [
  {
    field: 'userName',
    component: 'Input',
    label: '用户名称',

    componentProps: {
      placeholder: '请输入用户名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'complaintsType',
    component: 'Select',
    label: '投诉类型',

    componentProps: {
      placeholder: '请选择投诉类型',
      options: [
        {
          label: '意见',
          value: '1',
        },
        {
          label: '质量问题',
          value: '2',
        },
      ],
    },
  },
  {
    field: '[complaintsStartTime, complaintsEndTime]',
    label: '投诉时间',

    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: 'handleStatus',
    component: 'Select',
    label: '处理状态',

    componentProps: {
      placeholder: '请选择处理状态',
      options: [
        {
          label: '待处理',
          value: '1',
        },
        {
          label: '已处理',
          value: '2',
        },
      ],
    },
  },
  {
    field: '[handleStartTime, handleEndTime]',
    label: '处理时间',

    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
    },
  },

]

export const userComplaintsColumn = [
  {
    title: '用户ID',
    dataIndex: 'userID',
    width: 200,
    fixed: 'left',
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    width: 100,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 200,
  },
  {
    title: '投诉类型',
    dataIndex: 'complaintsType',
    width: 120,
  },
  {
    title: '投诉时间',
    dataIndex: 'complaintsDate',
    width: 200,
  },
  {
    title: '投诉描述',
    dataIndex: 'complaintsDescription',
    width: 300,
  }, {
    title: '图片',
    dataIndex: 'image',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
  },
  {
    title: '处理时间',
    dataIndex: 'handleDate',
    width: 200,
  },
  {
    title: '处理',
    dataIndex: 'handle',
    width: 240,
    align: 'center',
  },
  {
    title: '用户评价',
    dataIndex: 'UserEvaluation',
    width: 200,
  }
]

export const userComplaintsMockData = [
  {
    id: '100000000000001',
    userID: '100000000000001',
    userName: '测试1',
    phone: '1402390189398',
    complaintsType: '质量问质量问',
    complaintsDate: '2021-09-12 12:00:00',
    complaintsDescription: '买的东西有问题，赶紧退了',
    image: ['https://community-test-1304549078.cos.ap-shanghai.myqcloud.com/1655091780377.jpg'],
    status: '已处理',
    handleDate: '2021-09-12 12:00:00',
    handle: '您的反馈已收到，正在处理。',
    UserEvaluation: '好的',
  },
  {
    id: '100000000000002',
    userID: '100000000000002',
    userName: '测试1',
    phone: '1402390189398',
    complaintsType: '质量问质量问',
    complaintsDate: '2021-09-12 12:00:00',
    complaintsDescription: '买的东西有问题，赶紧退了',
    image: ['https://community-test-1304549078.cos.ap-shanghai.myqcloud.com/1655091780377.jpg', 'https://community-test-1304549078.cos.ap-shanghai.myqcloud.com/1654926494866.jpg'],
    status: '已处理',
    handleDate: '2021-09-12 12:00:00',
    handle: '',
    UserEvaluation: '好的',
  },
]
