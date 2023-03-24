import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'
import { CascaderDataApi } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/GarageListApi'
import { getOrderFunc } from '/@/api/model/dictionaryApi'

const baseColumns = reactive([
  {
    field: 'id',
    component: 'Input',
    label: '订单编号',
    defaultValue: '',
    componentProps: {
      placeholder: '订单编号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'goodsName',
    component: 'Input',
    label: '商品名称',
    defaultValue: '',
    componentProps: {
      placeholder: '商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  //   {
  //     field: '[starTscime, endTime]',
  //     label: '最后更新时间',
  //     component: 'RangePicker',
  //     colProps: {
  //       span: 6,
  //     },
  //     componentProps: {
  //       format: 'YYYY-MM-DD HH:mm:ss',
  //       placeholder: ['开始时间', '结束时间'],
  //       : { format: 'HH:mm:ss' },
  //     },
  //   },
  // ]

  {
    field: 'time',
    label: '下单时间',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
   
  },
  {
    field: 'shopName',
    component: 'Input',
    label: '卖家',
    defaultValue: '',
    componentProps: ({ schema, formActionType, formModel }) => {
      return {
        placeholder: '卖家名称',
        onChange: (e) => {
          const { updateSchema } = formActionType
          formModel.warehouseId = undefined
          if (e.target._value == '') {
            updateSchema({
              field: 'warehouseId',
              componentProps: {
                params: { storeName: e.target._value },
              },
            })
          }
        },
        onBlur: (e) => {
          const { updateSchema } = formActionType
          updateSchema({
            field: 'warehouseId',
            componentProps: {
              params: { storeName: e.target._value },
            },
          })
        },
      }
    },
  },
  
  {
    field: 'buyerName',
    component: 'Input',
    label: '买家',
    defaultValue: '',
    componentProps: {
      placeholder: '买家名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },

 
  {
    field: 'goodsCode',
    component: 'Input',
    label: 'SKU编码',
    defaultValue: '',
    componentProps: {
      placeholder: 'SKU编码',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
 
  {
    field: 'area',
    component: 'ApiSelect',
    label: '收货地区',
    componentProps: {
      api: CascaderDataApi,
      placeholder: '收货地区',
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  // {
  //   field: 'isDeleted',
  //   component: 'ApiSelect',
  //   label: '收货地区',
  //   defaultValue: '',
  //   componentProps: {
  //     placeholder: '收货地区',
  //     api: getColumnsOptiosFunc,
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },
  // {
  //   label: '收货地区',
  //   field: 'areaCode',
  //   component: 'ApiCascader',
  //   colProps: {
  //     span: 6,
  //   },
  //   componentProps: {
  //     api: CascaderDataApi,
  //     placeholder: '收货地区',
  //     fieldNames: {
  //       children: 'children',
  //       label: 'name',
  //       value: 'id',
  //     },
  //     isLeaf: (record) => {
  //       return !record.children
  //     },
  //   },
  // },
])

const accessColumns: FormSchema[] = []

const rejectColumns: FormSchema[] = []
const tableColumns = [
  {
    title: '商品信息',
    dataIndex: 'goodsName',
    width: '14%',
  },
  {
    title: '商品类型',
    dataIndex: 'categoryType',
    width: '8%',
  },
  {
    title: '单价/数量',
    dataIndex: 'columnName',
    width: '7%',
  },

  {
    title: '金额',
    dataIndex: 'isEnable',
    width: '6%',
  },
  {
    title: '卖家',
    dataIndex: 'sort',
    width: '12%',
  },
  {
    title: '买家',
    dataIndex: 'editorNickName',
    width: '12%',
  },
  {
    title: '发货仓库',
    dataIndex: 'updateTime',
    width: '11%',
  },
  {
    title: '订单状态',
    dataIndex: 'creator',
    width: '7%',
  },
  {
    title: '关联销售订单',
    dataIndex: 'orderSellId',
    width: '13%',
  },
  {
    title: '发动机识别码',
    dataIndex: 'engineNos',
    width: '10%',
  },

]
export const getTableColumns = (goodsLength) => {
  const customCell = (_, index) => {
    if (index == 0 && goodsLength && goodsLength >= 1) {
      return { rowSpan: goodsLength }
    } else {
      return { rowSpan: 0 }
    }
  }
  // customCell: customCell,
  const column =  [
    {
      title: '商品信息',
      dataIndex: 'goodsName',
      width: '14%',
      colSpan: 0,
      customCell: customCell
    },
    {
      title: '商品类型',
      dataIndex: 'categoryType',
      width: '8%',
      colSpan: 0,
      customCell: customCell
    },
    {
      title: '单价/数量',
      dataIndex: 'columnName',
      width: '7%',
      colSpan: 0,
      customCell: customCell
    },
    {
      title: '金额',
      dataIndex: 'isEnable',
      width: '6%',
      customCell: customCell
    },
    {
      title: '卖家',
      dataIndex: 'sort',
      width: '12%',
      customCell: customCell
    },
    {
      title: '买家',
      dataIndex: 'editorNickName',
      width: '12%',
      customCe2l: customCell
    },
    {
      title: '发货仓库',
      dataIndex: 'updateTime',
      width: '11%',
      customCell: customCell
    },
    {
      title: '订单状态',
      dataIndex: 'creator',
      width: '7%',
      customCell: customCell
    },
    
    {
      title: '关联销售订单',
      dataIndex: 'orderSellId',
      width: '13%',
      customCell: customCell
    },
    {
      title: '发动机识别码',
      dataIndex: 'engineNos',
      width: '10%',
      customCell: customCell
    },
  ]
  return column
}
export const containerConfig = {
  tableColumns,
}

export const filterFormConfig = {
  baseColumns,
  accessColumns,
  rejectColumns,
}
