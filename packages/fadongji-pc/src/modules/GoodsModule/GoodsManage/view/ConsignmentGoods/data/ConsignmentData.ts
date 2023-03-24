import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'
import {
  getBrandFunc, getItemFunc, getTypeAllFunc
} from '/@/modules/ContentModule/api/basicFormApis'

const baseColumns = reactive([
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '请输入商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'articleNumber',
    component: 'Input',
    label: '商品品号',
    componentProps: {
      placeholder: '请输入商品品号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

  {
    field: 'categoryType',
    component: 'ApiSelect',
    label: '商品类型',
    componentProps: {
      api: getTypeAllFunc,
      placeholder: '请选择商品类型',
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
      placeholder: '请选择商品品牌',
      api: getBrandFunc,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '寄售状态',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请选择寄售状态',
      options: [
        {
          label: '全部',
          value: '0',
          key: '0',
        },
        {
          label: '是',
          value: '1',
          key: '1',
        },
        {
          label: '否',
          value: '2',
          key: '2',
        },
      ],
    },
  },


])

const accessColumns: FormSchema[] = []

const rejectColumns: FormSchema[] = []
const tableColumns = [
  {
    title: '商品品号',
    dataIndex: 'articleNumber',
    width: '120px',
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    width: '230px',
  },
  {
    title: '商品类型',
    dataIndex: 'categoryType',
    width: '140px',
  },

  {
    title: '品牌',
    dataIndex: 'brandName',
    width: '130px',
  },
  {
    title: '修理厂价格',
    dataIndex: 'repairDepot',
    width: '230px',
  },
  {
    title: '寄售价',
    dataIndex: 'distributionPrice',
    width: '130px',
  },
  {
    title: '商品编码',
    dataIndex: 'code',
    width: '120px',
  },
  // {
  //   title: '最近更新时间',
  //   dataIndex: 'updateTime',
  //   width: '230px',
  // },
  {
    title: '实际库存',
    dataIndex: 'number',
    width: '130px',
  },
  {
    title: '寄售可用库存',
    dataIndex: 'availableNumber',
    width: '160px',
  },
  {
    title: '寄售状态',
    dataIndex: 'status',
    width: '120px',
  },

]
// export const getTableColumns = (goodsLength) => {
//   const customCell = (_, index) => {
//     if (index == 0 && goodsLength && goodsLength >= 1) {
//       return { rowSpan: goodsLength }
//     } else {
//       return { rowSpan: 0 }
//     }
//   }
//   // customCell: customCell,
//   const column =  [
//     {
//       title: '商品品号',
//       dataIndex: 'goodsName',
//       width: '5%',
//       colSpan: 0,
//       customCell: customCell
//     },
//     {
//       title: '商品名称',
//       dataIndex: 'categoryType',
//       width: '8%',
//       colSpan: 0,
//       customCell: customCell
//     },
//     {
//       title: '商品类型',
//       dataIndex: 'columnName',
//       width: '7%',
//       colSpan: 0,
//       customCell: customCell
//     },
//     {
//       title: '品牌',
//       dataIndex: 'isEnable',
//       width: '6%',
//       customCell: customCell
//     },
//     {
//       title: '修理厂价格',
//       dataIndex: 'sort',
//       width: '12%',
//       customCell: customCell
//     },
//     {
//       title: '寄售价',
//       dataIndex: 'editorNickName',
//       width: '12%',
//       customCe2l: customCell
//     },
//     {
//       title: '商品编码',
//       dataIndex: 'updateTime',
//       width: '11%',
//       customCell: customCell
//     },
//     {
//       title: '最近更新时间',
//       dataIndex: 'creator',
//       width: '7%',
//       customCell: customCell
//     },

//     {
//       title: '实际库存',
//       dataIndex: 'orderSellId',
//       width: '13%',
//       customCell: customCell
//     },
//     {
//       title: '寄售可用库存',
//       dataIndex: 'engineNos',
//       width: '10%',
//       customCell: customCell
//     },
//     {
//       title: '寄售状态',
//       dataIndex: 'engineNos',
//       width: '9%',
//       customCell: customCell
//     },
//   ]
//   return column
// }
export const containerConfig = {
  tableColumns,
}

export const filterFormConfig = {
  baseColumns,
  accessColumns,
  rejectColumns,
}
