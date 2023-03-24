import { FormSchema } from '/@/components/Form'

// 集师傅拓客
export const filterFormSchemas: FormSchema[] = [
  {
    field: 'searchTime',
    label: '日期',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['年/月/日', '年/月/日'],
      style: {
        width: '100%',
      },
    },
  },
]

export const tableColumns = [
  {
    title: '获取时间',
    dataIndex: 'createTime',
    ellipsis: true,
    width: 200,
  },
  {
    title: '行为',
    dataIndex: 'title',
    ellipsis: true,
  },
  {
    title: '数量',
    dataIndex: 'score',
    ellipsis: true,
    width: 200,
  },
]

// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    id: 29903,
    time: '2020-02-09 11:11:11',
    behavior: '完成第一笔销售订单',
    count: '+5',
  },
]
