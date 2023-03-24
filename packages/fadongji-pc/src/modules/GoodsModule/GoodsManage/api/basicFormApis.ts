import adminHttp from '/@/utils/http/adminHttp'
// /v1/goods/category/list
export const getColumnsOptiosFunc = () => {
  return new Promise((resolve) => {
    adminHttp
      .goodsCategoryList({ pageSize: 999999 })
      .then((res) => {
        resolve(
          res.data.records.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

export const getCategoryOptiosFunc = () => {
  return new Promise((resolve) => {
    adminHttp
      .goodsCategoryList({ pageSize: 999999 })
      .then((res) => {
        //id: '124582557818945540', name: '空调系统', parentId: '0', hierarchy: '1', sort: 6
        resolve(
          res.data.records.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}
