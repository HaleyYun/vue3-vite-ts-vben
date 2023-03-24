import adminHttp from '/@/utils/http/adminHttp'
export const classificationEvent = () => {
  return new Promise((resolve) => {
    adminHttp.CONTENTMENT.contentCategoryCondition()
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
///contentHelpCategoryCondition
export const classEvent = () => {
  return new Promise((resolve) => {
    adminHttp.CONTENTMENT.contentHelpCategoryCondition({ pageSize: 999999 })
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
