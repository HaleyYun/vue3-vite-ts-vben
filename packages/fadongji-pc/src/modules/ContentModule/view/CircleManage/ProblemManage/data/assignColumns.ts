import { FormSchema } from '/@/components/Form'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'searchTime',
    label: '请选择时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },

  {
    field: 'name',
    component: 'Input',
    label: '评论人信息',
    componentProps: {
      placeholder: '评论人信息',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

const commentColumns = [
  {
    title: '评论内容',
    dataIndex: 'name',
  },
  {
    title: '评论人',
    dataIndex: 'creator',
    width: '180px',
  },
  {
    title: '回复给',
    dataIndex: 'initials',
  },
  {
    title: '评论时间',
    dataIndex: 'status',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
]
export const commentConfig = {
  commentColumns,
}
