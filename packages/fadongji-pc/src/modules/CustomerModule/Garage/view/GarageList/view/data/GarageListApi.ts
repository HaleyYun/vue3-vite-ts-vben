import adminHttp from '/@/utils/http/adminHttp'

export const CascaderDataApi = () => {
  return new Promise((resolve) => {
    adminHttp
      .sixHotAreaTree()
      .then((res) => {
        resolve(res.data)
      })
      .catch(() => {
        resolve([])
      })
  })
}
