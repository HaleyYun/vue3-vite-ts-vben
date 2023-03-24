import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'

export const goodsAttributeSearch: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '属性名称',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入属性名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '商品类别',
    defaultValue: '',
    componentProps: {
      placeholder: '请收入商品类别',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
// export const goodsAttributeSearch = reactive([
//   {
//     label: '属性名称',
//     name: 'attibuteName',
//     value: '',
//     placeholder: '请输入属性名称',
//   },
//   {
//     label: '商品类别',
//     name: 'goodsCategory',
//     type: 'select',
//     value: '',
//     placeholder: '请选择商品类别',
//     slots: { customRender: 'column' },
//     options: [
//       { label: '配件', value: '0' },
//       { label: '汽修', value: '1' },
//       { label: '技术专区', value: '2' },
//     ],
//   },
// ])

// “规则属性” 以及 “参数属性” table 表头
export const attributeColumns = [
  { title: '编码', dataIndex: 'code', key: 'code' },
  { title: 'Platform', dataIndex: 'platform', key: 'platform' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Creator', dataIndex: 'creator', key: 'creator' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Action', key: 'operation' },
]

export const categoryColumns = [
  {
    key: 'name',
    title: '类别名称',
    dataIndex: 'name',
    width: '400px',
    align: 'left',
  },
  {
    key: '122',
    title: '属性',
    dataIndex: '122',
    slots: { customRender: 'addAttribute' },
  },

  { dateIndex: 'operation', key: 'operation', title: '', align: 'left' },
]
export const innerColumns = [
  {
    key: 'code',
    title: '编码',
    dataIndex: 'code',
    width: '10%',
    align: 'center',
  },
  {
    key: 'name',
    title: '属性名称',
    dataIndex: 'name',
    width: '15%',
    align: 'center',
  },
  {
    key: 'order',
    title: '排序',
    dataIndex: 'order',
    align: 'center',
    width: '200px',
    slots: { customRender: 'order' },
  },
  {
    key: 'value',
    title: '属性值',
    dataIndex: 'value',
    width: '400px',
    align: 'center',
    slots: { customRender: 'attributeName' },
  },
  {
    key: 'isShow',
    title: '是否启用',
    dataIndex: 'isShow',
    slots: { customRender: 'switch' },
    align: 'center',
    width: '150px',
  },
  {
    key: 'action',
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
    align: 'center',
  },
]
export const categoryThirdColumn = reactive([
  { key: 'code', title: '编码', dataIndex: 'code', align: 'center', width: '10%' },
  { key: 'codeName', title: '属性名称', dataIndex: 'codeName', align: 'center', width: '15%' },
  {
    key: 'order',
    title: '排序',
    dataIndex: 'order',
    align: 'center',
    width: '200px',
    slots: { customRender: 'order' },
  },
  {
    key: 'attributeName',
    title: '属性值',
    dataIndex: 'attributeName',
    align: 'center',
    width: '400px',
    slots: { customRender: 'attributeName' },
  },
  {
    key: 'isShow',
    title: '是否显示',
    dataIndex: 'isShow',
    slots: { customRender: 'switch' },
    align: 'center',
    width: '150px',
  },
  {
    key: 'action',
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
    align: 'center',
  },
])

// 二级data 数据集
interface seconedItem {
  itemName: string
  key: number
  seconedColumn: any
  seconedData: any
}

interface DataItem {
  key: number
  categoryName: string
  primaryChildData?: seconedItem[]
}

export const categoryData: DataItem[] = reactive([
  {
    categoryName: '发动机系列产品',
    key: 1,
    primaryChildData: [
      {
        itemName: '发动机整机',
        key: 100,
        seconedColumn: [
          {
            key: 'series',
            title: '发动机整机',
            dataIndex: 'series',
            width: '400px',
            align: 'left',
          },
          {
            key: 'name',
            title: '属性',
            dataIndex: 'name',
            slots: { customRender: 'addAttribute' },
          },
        ],
        seconedData: [
          {
            series: '发动机整机',
            name: '添加属性',
            id: 80,
            key: 'index-1',
            ceshiData: [
              {
                code: '100',
                codeName: 'sss',
                order: 'order',
                attributeName: 'B12,B15,474Q/长安，B12B，465Q-2DE1，474Q/五菱，4G15V……',
                isShow: true,
                isNeedInput: true,
              },
              {
                code: '200',
                codeName: 'ceshi2',
                order: 'order_1',
                attributeName: '1立方米,3立方米',
                isShow: false,
                isNeedInput: false,
              },
            ],
            ceshiColumn: [
              { key: 'code', title: '编码', dataIndex: 'code' },
              { key: 'codeName', title: '属性名称', dataIndex: 'codeName' },
              { key: 'order', title: '排序', dataIndex: 'order', width: '500px' },
              {
                key: 'attributeName',
                title: '属性值',
                dataIndex: 'attributeName',
                align: 'center',
                width: '400px',
              },
              {
                key: 'isShow',
                title: '是否显示',
                dataIndex: 'isShow',
                align: 'center',
              },
            ],
          },
          {
            series: '零部件',
            name: '添加属性',
            id: 81,
            key: 'index-2',
            ceshiData: [
              {
                code: '100',
                codeName: '代码名称',
                attributeName: 'B12,B15,474Q/长安，B12B，465Q-2DE1，474Q/五菱，4G15V……',
                isShow: true,
                isNeedInput: false,
              },
            ],
          },
        ],
      },
    ],
  },
])

// “弹框”--内容测试
export const secondaryClassification = reactive([
  {
    label: '商品类别',
    isText: true,
    value: '',
    id: 0,
  },
  {
    label: '属性名称',
    value: '',
    isRequire: true,
    isPlaceHolder: '请输入属性名称',
    Require: '请输入属性名称',
    isInput: true,
    id: 1,
  },
  {
    label: '属性值格式',
    value: '',
    isRequire: true,
    Require: '请输入属性值格式',
    Radio: [
      { name: '文本', value: 0 },
      { name: '数值', value: 1 },
    ],
    radioValue: '1',
    id: 2,
  },
  {
    label: '设置属性值',
    assetsValue: '',
    id: 4,
  },
  {
    label: '是否启用',
    isShow: false,
    id: 5,
  },
])

// “弹框”--内容测试
export const addRowAttributeData = reactive([
  {
    label: '商品类别',
    value: null,
    isRequire: true,
    isPlaceHolder: '请选择',
    Require: '请选择关联商品',
    id: 2000,
    isSelectTree: true,
    name: 'brandName',
    treeData: [],
    defaultValue: '',
  },
  {
    label: '属性名称',
    value: '',
    // isRequire: true,
    isPlaceHolder: '请输入属性名称',
    Require: '请输入属性名称',
    isInput: true,
    id: 1,
  },
  {
    label: '属性值格式',
    value: '',
    isRequire: true,
    Require: '请输入属性值格式',
    Radio: [
      { name: '文本', value: '1' },
      { name: '数值', value: '2' },
    ],
    radioValue: '1',
    id: 2,
  },
  {
    label: '设置属性值',
    assetsValue: '',
    id: 4,
  },
  {
    label: '是否启用',
    isShow: false,
    id: 5,
  },
])

// 参数属性 “弹框”--内容测试
export const parmsData = reactive([
  {
    label: '商品类别',
    value: '',
    isRequire: true,
    isPlaceHolder: '请选择关联商品',
    Require: '请选择关联商品',
    id: 2000,
    isSelect: true,
    name: 'select',
  },
  {
    label: '属性名称',
    value: '',
    isRequire: true,
    isPlaceHolder: '请输入属性名称',
    Require: '请输入属性名称',
    isInput: true,
    id: 1,
  },
  {
    label: '属性值录入',
    value: '',
    isRequire: true,
    Require: '请输入属性值录入方式',
    Radio: [
      { name: '属性值录入', value: '1' },
      { name: '手动录入', value: '2' },
    ],
    radioValue: '1',
    id: 2,
  },
  {
    label: '设置属性值',
    assetsValue: '',
    id: 4,
  },
  {
    label: '是否必填',
    isNeedInput: false,
    id: 5,
  },
  {
    label: '是否启用',
    isShow: false,
    id: 6,
  },
])

// 参数属性 “弹框”--内容测试
export const editParmsData = reactive([
  {
    label: '商品类别',
    isText: true,
    value: '发动机系列-发动机',
    id: 0,
  },
  {
    label: '属性名称',
    value: '',
    isRequire: true,
    isPlaceHolder: '请输入属性名称',
    Require: '请输入属性名称',
    isInput: true,
    id: 1,
  },
  {
    label: '属性值录入',
    value: '',
    isRequire: true,
    Require: '请输入属性值录入方式',
    Radio: [
      { name: '属性值录入', value: '1' },
      { name: '手动录入', value: '2' },
    ],
    radioValue: '1',
    id: 2,
  },
  {
    label: '设置属性值',
    assetsValue: '',
    id: 4,
  },
  {
    label: '是否必填',
    isNeedInput: false,
    id: 5,
  },
  {
    label: '是否启用',
    isShow: false,
    id: 6,
  },
])

export const paramThirdColumnData = reactive([
  { key: 'code', title: '编码', dataIndex: 'code', align: 'center', width: '10%' },
  { key: 'codeName', title: '属性名称', dataIndex: 'codeName', align: 'center', width: '15%' },
  {
    key: 'order',
    title: '排序',
    dataIndex: 'order',
    align: 'center',
    width: '200px',
    slots: { customRender: 'order' },
  },
  {
    key: 'attributeName',
    title: '属性值',
    dataIndex: 'attributeName',
    align: 'center',
    width: '400px',
    slots: { customRender: 'attributeName' },
  },
  {
    key: 'isNeedInput',
    title: '是否必填',
    dataIndex: 'isNeedInput',
    slots: { customRender: 'isNeedInput' },
    align: 'center',
    width: '150px',
  },
  {
    key: 'isShow',
    title: '是否显示',
    dataIndex: 'isShow',
    slots: { customRender: 'switch' },
    align: 'center',
    width: '150px',
  },
  {
    key: 'action',
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
    align: 'center',
  },
])
