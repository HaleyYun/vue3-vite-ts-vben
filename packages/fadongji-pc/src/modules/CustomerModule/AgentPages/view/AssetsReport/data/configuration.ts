




export const paymentDaysColumns = [
  {
    title: '修改内容',
    dataIndex: 'type',
    ellipsis: true,
  },
  {
    title: '修改前数值',
    dataIndex: 'frontAmount',
    ellipsis: true,
  },
  {
    title: '修改后数值',
    dataIndex: 'afterAmount',
    ellipsis: true,
  },
  {
    title: '修改人',
    dataIndex: 'creatorName',
    ellipsis: true,
  },
  {
    title: '修改时间',
    dataIndex: 'createTime',
    ellipsis: true,
  },
];

// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    id:29903,
    time:"2020-02-09 11:11:11",
    behavior:'完成第一笔销售订单',
    count:'+5'
  }
];
