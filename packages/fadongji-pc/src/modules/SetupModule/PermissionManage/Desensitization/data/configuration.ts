import { FormSchema } from '/@/components/Form'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'columnName',
    component: 'Input',
    label: '字段名',
    componentProps: {
      placeholder: '请输入字段名',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'columnDesc',
    component: 'Input',
    label: '字段描述',
    componentProps: {
      placeholder: '请输入字段描述',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '状态',
    componentProps: {
      placeholder: '请选择',
      options: [
        {
          label: '启用',
          value: '1',
          key: '1',
        },
        {
          label: '禁用',
          value: '0',
          key: '0',
        },
      ],
    },
  },
]

export const tableColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: '60px',
  },
  {
    title: '字段名',
    dataIndex: 'columnName',
    width: '180px',
  },
  {
    title: '字段描述',
    dataIndex: 'columnDesc',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '脱敏方向',
    dataIndex: 'directionDesc',
    width: '180px',
  },
  {
    title: '脱敏起始位数',
    dataIndex: 'startIndex',
    width: '130px',
  },
  {
    title: '脱敏字符数',
    dataIndex: 'wordNum',
    width: '130px',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '130px',
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    width: '150px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
]
