import { FormSchema } from '/@/components/Form'
import {getBrandFunc } from '/@/modules/ContentModule/api/basicFormApis'



export const filterFormSchemas: FormSchema[] = [
  {
    field: 'buyerName',
    component: 'Input',
    label: '修理厂名称',
    componentProps: {
      placeholder: '输入修理厂名称搜索',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'brandId',
    component: 'ApiSelect',
    label: '品牌',
    componentProps: {
      placeholder: '请输入品牌名称搜索',
      showSearch:true,
      filterOption: (input, option)=> {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      api: getBrandFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
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
];

export const tableColumns = [
  {
    title: '排名',
    dataIndex: 'rankNumber',
    width: '100px'
  },
  {
    title: '修理厂名称',
    dataIndex: 'buyerName',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '型号',
    dataIndex: 'modelName',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '销量',
    dataIndex: 'salesCount',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '销售额（元)',
    dataIndex: 'salesAmount',
    width: '120px',
    ellipsis: true,
  },
]

// 这是mock 数据以后对接口会删掉
export const mockTableData = [
  {
    id: 1,
    brandName: '江陵动力',
    salesCount:'20',
    salesAmount:'200',
    modelName:"B12",
    buyerName:"江陵动力服务商"
  },

];
