import { resultSuccess } from './util'

const directoryMenu = [
  { name: '我的分组', label: 1, count: 100, id: 1 },
  { name: '小分组1', label: 2, count: 50, id: 2 },
  { name: '小分组2', label: 2, count: 50, id: 3 },
]

const imgMockList = [
  [],
  [
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 1,
    },
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 2,
    },
  ],
  [
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 3,
    },
  ],
  [
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 4,
    },
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 5,
    },
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 6,
    },
  ],
]

//获取目录列表
export const getDirectoryMenu = () => {
  return new Promise((resolve, reject) => {
    resolve(
      resultSuccess({
        data: directoryMenu,
      }),
    )
  })
}
//获取图片列表
export const getMockImgList = (id: number) => {
  return new Promise((resolve, reject) => {
    resolve(
      resultSuccess({
        data: imgMockList[id],
        count: imgMockList[id].length,
      }),
    )
  })
}

//添加分组
export const addMockDirectoryMenu = (name: string) => {
  return new Promise((resolve) => {
    directoryMenu.push({
      name,
      label: 2,
      count: 20,
      id: directoryMenu[directoryMenu.length - 1].id + 1,
    })
    resolve('')
  })
}
