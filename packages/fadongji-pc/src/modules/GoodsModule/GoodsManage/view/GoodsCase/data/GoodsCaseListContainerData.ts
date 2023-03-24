import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'
import {
  getCategoryFunc,
  getBrandFunc,
  getCategoryAllFunc,
} from '/@/modules/ContentModule/api/basicFormApis'

const baseColumns = reactive([
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '请输入关键词',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    label: '商品类别',
    field: 'categoryIds',
    component: 'ApiCascader',
    componentProps: {
      api: getCategoryAllFunc,
      placeholder: '请选择商品类别',

      isLeaf: (record) => {
        return !record.children
      },
    },
  },
  {
    field: 'brandId',
    component: 'ApiSelect',
    label: '商品品牌',
    componentProps: {
      mode: 'multiple',
      placeholder: '输入关键字',
      api: getBrandFunc,
      filterOption: (input, option)=> {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      onChange: (e) => {
        console.log(e)
      },
    },
  },


])

const endTimeColumns: FormSchema[] = [
  {
    field: 'searchTime',
    label: '最后操作时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]

const accessColumns: FormSchema[] = [
  {
    field: 'creattime',
    label: '提交时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]

const rejectColumns: FormSchema[] = [
  {
    field: 'cancellationTime',
    label: '发布时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },

]

const tableColumns = [
  {
    title: '编码',
    dataIndex: 'code',
    width: 120,
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    // sorter: true,
    width: 190,
  },
  {
    title: '商品类别',
    dataIndex: 'categoryName',
    width: 150,
  },

  {
    title: '品牌',
    dataIndex: 'brandName',
    width: 160,
  },
  {
    title: '价格区间',
    dataIndex: 'priceCap',
    // sorter: true,
    width: 220,
  },
  {
    title: '模版状态',
    dataIndex: 'status',
    width: 120,
  },
  {
    title: '最后操作时间',
    dataIndex: 'cancellationTime',
    // sorter: true,
    width: 150,
  },
  {
    title: '商品信息',
    dataIndex: 'codeList',
    width: 300,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 240,
    fixed: 'right',
  },
]

export const containerConfig = {
  tableColumns,
}

export const filterFormConfig = {
  baseColumns,
  accessColumns,
  rejectColumns,
  endTimeColumns,
}
