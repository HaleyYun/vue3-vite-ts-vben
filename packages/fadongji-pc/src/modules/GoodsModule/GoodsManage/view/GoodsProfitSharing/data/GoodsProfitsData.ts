import { FormSchema } from '/@/components/Form'
import { getGoodsSellerData } from '/@/api/model/dictionaryApi'

export const FilterGoodsProfitsForm: FormSchema[] = [
  {
    field: 'goodsName',
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
    field: 'shopId',
    component: 'ApiSearchSelect',
    label: '卖家',
    componentProps: {
      allowClear: true,
      placeholder: '请选择卖家',
      immediate: true,
      api: getGoodsSellerData,
      resultField: 'data',
    },
  },
  {
    field: 'type',
    component: 'Select',
    label: '商品状态',
    defaultValue: '0',
    componentProps: {
      placeholder: '请选择商品状态',
      options: [
        {
          label: '全部',
          value: '0',
        },
        {
          label: '待审核',
          value: '1',
        },
        {
          label: '审核不通过',
          value: '2',
        },
        {
          label: '待售',
          value: '3',
        },
        {
          label: '在售',
          value: '4',
        },
        {
          label: '违规下架',
          value: '5',
        },
        {
          label: '违规审核',
          value: '6',
        },
      ],
    },
  },
]

// 商品分润  列表-- column
export const GoodsProfitsColumns = [
  {
    title: '编码',
    dataIndex: 'code',
    width: 120,
    fixed: 'left',
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    width: 350,
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: 250,
  },
  {
    title: '出厂价格',
    dataIndex: 'cashPrice',
    width: 200,
  },
]
