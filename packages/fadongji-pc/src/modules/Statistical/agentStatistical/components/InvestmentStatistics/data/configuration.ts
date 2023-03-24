import { FormSchema } from '/@/components/Form'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'searchTime',
    label: '日期',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]

export const tableColumns = [
  {
    title: '品牌',
    dataIndex: 'brandName',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '投资量',
    dataIndex: 'salesCount',
    ellipsis: true,
    width: '150px',
  },
]

// 这是mock 数据以后对接口会删掉
export const mockTableData = [
  {
    id: 1,
    brandName: '江陵动力',
    salesCount: '20',
    salesAmount: '200',
    buyerName: '江陵动力服务商',
  },
]
