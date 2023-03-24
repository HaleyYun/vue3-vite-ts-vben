// import { _ } from '@vocen/shared'
import { _ } from '../../../../../../../shared/src/index'

export const transUploadDataPipeEvent = (data, res) => {
  const tData = _.cloneDeep(data.value)
  console.log(tData, 'sssssssssss')
  const tempImages = tData.map((item, i) => {
    if (i < res.length) {
      item['src'] = res[i].src
      item['name'] = res[i].name
      item['type'] = res[i].type
    } else {
      item['src'] = ''
      item['name'] = ''
    }
    return item
  })
  return tempImages
}
export const uploadInfo = 'uploadInfo'

export enum uploadType {
  MATERIAL = 'MATERIAL',
  ORIGINMATERIALIMG = 'ORIGINMATERIALIMG',
  INSTALLGUIDE = 'INSTALLGUIDE',
  VIDEO = 'VIDEO',
  IMAGES = 'IMAGES',
  GOODSDETAILS = 'GOODSDETAILS',
}

export const GoodsSkuTableColumns = [
  {
    title: '型号',
    dataIndex: 'supplierID',
    key: 'supplierID',
    align: 'center',
  },
  {
    title: '品牌',
    dataIndex: 'information',
    key: 'information',
    align: 'center',
  },
  {
    title: 'OCV阀',
    dataIndex: 'region',
    key: 'region',
    align: 'center',
  },
  {
    title: '商品名称',
    dataIndex: 'Grade',
    key: 'Grade',
    align: 'center',
  },
  {
    title: '价格上限',
    key: 'channel',
    align: 'center',
    width: '200px',
    slots: { customRender: 'price' },
  },
  {
    title: '价格下限',
    key: 'chaPrice',
    align: 'center',
    width: '200px',
    slots: { customRender: 'price' },
  },
  {
    align: 'center',
    title: 'OE码',
    width: '200px',
    key: 'OeCode',
    slots: { customRender: 'code' },
  },
  {
    align: 'center',
    title: '适配车型',
    key: 'adapter',
    width: '200px',
    slots: { customRender: 'adapter' },
  },
  {
    align: 'center',
    title: '参数属性',
    key: 'parameter',
    width: '200px',
    slots: { customRender: 'parameter' },
  },
  {
    align: 'center',
    title: '商品分润',
    key: 'FenRun',
    width: '200px',
    slots: { customRender: 'FenRun' },
  },
  {
    align: 'center',
    title: '操作',
    width: '200px',
    slots: { customRender: 'action' },
  },
]

export const detailsImgDefault = [
  {
    id: 1,
    name: 1,
    src: '',
    type: 1,
  },
  {
    id: 2,
    name: 2,
    src: '',
    type: 1,
  },
  {
    id: 3,
    name: 3,
    src: '',
    type: 1,
  },
  {
    id: 4,
    name: 4,
    src: '',
    type: 1,
  },
  {
    id: 5,
    name: 5,
    src: '',
    type: 1,
  },
  {
    id: 6,
    name: 6,
    src: '',
    type: 1,
  },
  {
    id: 7,
    name: 7,
    src: '',
    type: 1,
  },
  {
    id: 8,
    name: 8,
    src: '',
    type: 1,
  },
  {
    id: 9,
    name: 9,
    src: '',
    type: 1,
  },
  {
    id: 10,
    name: 10,
    src: '',
    type: 1,
  },
]
