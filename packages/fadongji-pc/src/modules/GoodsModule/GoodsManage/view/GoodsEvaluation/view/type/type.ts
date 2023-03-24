import { reactive } from 'vue'
import { FormSchema } from '/@/components/Form'
interface columnData {
  key: string
  align: string
  title: string
  dataIndex: string
  slots: Object
}
export const goodsClassfy = [
  { label: 'B系列', value: 'B' },
  { label: 'C系列', value: 'C' },
]
export const goodsEvaluatioForm = reactive([
  {
    label: '输入搜索',
    name: 'goodsName',
    value: '',
    placeholder: '请输入商品名称',
  },
  {
    label: '商品分类',
    name: 'goodsClassify',
    value: 'B',
    placeholder: '请选择商品分类',
  },
  {
    label: '用户昵称',
    name: 'nickName',
    value: '',
    placeholder: '请输入用户昵称',
  },
])
export const columnsList: columnData[] = [
  {
    key: '0',
    align: 'center',
    title: '商品id',
    dataIndex: 'goodsId',
    slots: { customRender: '' },
  },
  {
    key: '1',
    align: 'center',
    title: '商品名称',
    dataIndex: 'goodsName',
    slots: { customRender: '' },
  },
  {
    key: '2',
    align: 'center',
    title: '供应商',
    dataIndex: 'supplier',
    slots: { customRender: '' },
  },
  {
    key: '3',
    align: 'center',
    title: '用户昵称',
    dataIndex: 'userNickName',
    slots: { customRender: '' },
  },
  { key: '4', align: 'center', title: '评价', dataIndex: 'commit', slots: { customRender: '' } },
  {
    key: '5',
    align: 'center',
    title: 'ip地址',
    dataIndex: 'ipAddress',
    slots: { customRender: '' },
  },
  {
    key: '6',
    align: 'center',
    title: '评论时间',
    dataIndex: 'commitDate',
    slots: { customRender: '' },
  },
  {
    key: '7',
    align: 'center',
    title: '评论关键词',
    dataIndex: 'commitKeyWord',
    slots: { customRender: '' },
  },
  {
    key: '8',
    align: 'center',
    title: '是否显示',
    dataIndex: 'isShow',
    slots: { customRender: 'enable' },
  },
  {
    key: '9',
    align: 'center',
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'action' },
  },
]

export const commitSchemas: FormSchema[] = [
  {
    field: 'goodsName',
    component: 'Input',
    label: '商品名称',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入商品名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'categoryId',
    component: 'Select',
    label: '商品分类',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请选择商品分类',
      options: [
        {
          label: 'xlsx',
          value: 'xlsx',
          key: 'xlsx',
        },
        {
          label: 'html',
          value: 'html',
          key: 'html',
        },
        {
          label: 'csv',
          value: 'csv',
          key: 'csv',
        },
        {
          label: 'txt',
          value: 'txt',
          key: 'txt',
        },
      ],
    },
  },
  {
    field: 'nickName',
    component: 'Input',
    label: '用户昵称',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入用户昵称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'keyWord',
    component: 'Input',
    label: '关键词',
    colProps: {
      span: 6,
    },
    componentProps: {
      placeholder: '请输入关键词',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]
export const commitColumns = [
  {
    title: '商品编号',
    dataIndex: 'no',
    width: 120,
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
  },
  {
    title: '整体好评率',
    dataIndex: 'allFavorableRate',
    width: 120,
  },
  {
    title: '卖家',
    dataIndex: 'seller',
  },
  {
    title: '用户昵称',
    dataIndex: 'userNick',
    width: 140,
  },
  {
    title: '商品评价',
    dataIndex: 'commodityEvaluation',
  },
  {
    title: '评价关键词',
    dataIndex: 'keyWord',
    width: 250,
  },
  {
    title: '评论时间',
    dataIndex: 'commitTime',
    width: 200,
  },
  {
    title: '是否显示',
    dataIndex: 'isShow',
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 250,
  },
]
export const tableCommitData = [
  {
    id: '100',
    no: '100',
    goodsName: '江陵动力发动机-B15荣光黑色OCV阀',
    allFavorableRate: '50%',
    seller: '上海左班汽车零部件13400000000',
    userNick: 'hello-word',
    commodityEvaluation: '商品不错',
    keyWord: '关键词1、关键词2',
    commitTime: '2021-06-15 14:35:51',
    isShow: true,

  },
  {
    id: '200',
    no: '100',
    goodsName: '江陵动力发动机-B15荣光黑色OCV阀',
    allFavorableRate: '50%',
    seller: '上海左班汽车零部件13400000000',
    userNick: 'hello-word',
    commodityEvaluation: '商品不错',
    keyWord: '关键词1、关键词2',
    commitTime: '2021-06-15 14:35:51',
    isShow: false,

  },
]
