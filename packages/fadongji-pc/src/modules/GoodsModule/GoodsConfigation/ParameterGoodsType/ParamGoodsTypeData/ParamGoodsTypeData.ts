import { FormSchema } from '/@/components/Form'

export const filterParamGoodsTypeForm: FormSchema[] = [
  {
    field: 'categoryId',
    label: '商品类别',
    component: 'TreeSelect',
    slot: 'categorySlot',
    colProps: {
      span: 12,
    },
  },
]
