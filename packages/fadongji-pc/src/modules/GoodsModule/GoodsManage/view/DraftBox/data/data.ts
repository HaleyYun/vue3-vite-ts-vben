import { reactive } from 'vue'
import { TableColumnsType } from 'ant-design-vue'
import { FormSchema } from '/@/components/Form'
import { getCategoryAllFunc } from '/@/modules/ContentModule/api/basicFormApis'
import { getBrandFunc } from '/@/api/model/dictionaryApi'

export const categoryFunc = () => {
  // return new Promise((resolve) => {
  //   adminHttp.goodsCategoryCategorySelect().then((res) => {
  //     console.log(res, '00000000')
  //     resolve(
  //         res.data.map((item) => ({
  //           label: item.name,
  //           value: item.id,
  //         })),
  //     )
  //   })
  //       .catch(() => {
  //         resolve([])
  //       })
  // })
  return [
    {
      label: 'Light',
      value: 'light',
      children: new Array(20)
        .fill(null)
        .map((_, index) => ({ label: `Number ${index}`, value: index })),
    },
    {
      label: 'Bamboo',
      value: 'bamboo',
      children: [
        {
          label: 'Little',
          value: 'little',
          children: [
            {
              label: 'Toy Fish',
              value: 'fish',
            },
            {
              label: 'Toy Cards',
              value: 'cards',
            },
            {
              label: 'Toy Bird',
              value: 'bird',
            },
          ],
        },
      ],
    },
  ]
}

interface searchItem {
  title?: string
  id: string
  label?: string
  value?: string
  placeHolder?: string
}

export const searchList = [
  {
    label: '商品名称',
    name: 'name',
    value: '',
    placeholder: '请输入商品名称',
  },
  {
    label: '商品类别',
    name: 'categoryIds',
    value: '',
    placeholder: '请选择商品类别',
  },
  {
    label: '商品品牌',
    name: 'brandIds',
    value: '',
    type: 'select',
    options: [],
    placeholderText: '请选择商品品牌',
  },
  {
    label: '保存时间',
    name: 'updateDate',
    value: '',
    placeholderText: '请选择保存时间',
    type: 'RangeDatePicker',
  },
]

//草稿箱 --- 列表
interface searchItem {
  title: string
  categoryInfo: string
  brandName: string
  name: string
  updateTime: string
}

export const draftColumns: TableColumnsType<searchItem>[] = [
  {
    title: '商品类别',
    dataIndex: 'categoryInfo',
    key: 'categoryInfo',
    width: '20%',
    align: 'center',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
    key: 'brandName',
    align: 'center',
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '保存时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
    // sorter: true,

  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '240px',
    align: 'center',
    slots: { customRender: 'action' },
  },
]
export const draftSearchMap = reactive({
  brandIds: [],
  categoryIds: [],
  name: '',
  updateStartTime: '',
  updateEndTime: '',
})

export const isBlank = (data) => {
  if (
    data == null ||
    data === 'null' ||
    data === '' ||
    data === undefined ||
    data === 'undefined' ||
    data === 'unknown'
  ) {
    return true
  } else {
    return false
  }
}
export const schemas: FormSchema[] = reactive([
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    required: false,
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
    field: 'brandIds',
    component: 'ApiSearchSelect',
    label: '商品品牌',
    componentProps: {
      api: getBrandFunc,
    },
  },
  {
    field: 'updateTime',
    component: 'RangePicker',
    label: '保存时间',
    componentProps: {
      style: {
        width: '100%',
      },
    },
  },
])
