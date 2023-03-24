import { reactive } from 'vue'
import { CascaderProps } from 'ant-design-vue'

export const opFormColumns = reactive([
  {
    label: '一级分类名称',
    prop: 'name',
    value: '',
    isRequire: true,
    RequireMessage: '分类名称必填',
    isPlaceHolder: '请输入分类名称',
    // id: 1000,
    isInput: true,
  },
])

export const secondaryClassification = reactive([
  {
    label: '一级分类名称',
    name: '',
    isText: true,
    value: '发动机系列-发动机',
    id: 1000,
  },
  {
    label: '二级分类名称',
    value: '',
    name: '',
    isRequire: true,
    isPlaceHolder: '请输入分类名称',
    Require: '异常文案提示',
    id: 2000,
    isInput: true,
  },
  {
    label: '关联商品类别',
    value: '',
    isRequire: true,
    isPlaceHolder: '请选择关联商品',
    Require: '请选择关联商品',
    id: 2000,
    isSelect: true,
    name: 'select',
  },
])

// 关联商品
export const options: CascaderProps['options'] = [
  {
    label: '发动机系列',
    value: '0',
    children: [
      {
        label: '本田',
        value: '0-0',
      },
    ],
  },
  {
    label: '底盘件',
    value: '1',
    children: [
      {
        label: '离合器',
        value: '1-1',
      },
      {
        label: '球头',
        value: '1-2',
      },
      {
        label: '悬挂',
        value: '1-3',
      },
      {
        label: '刹车片',
        value: '1-4',
      },
      {
        label: '方向机',
        value: '1-5',
      },
    ],
  },
]



