import adminHttp from '/@/utils/http/adminHttp'

export const classificationEvent = () => {
  return new Promise((resolve) => {
    adminHttp.CONTENT.contentCertificationCourseCategoryCondition({ platformCode: 'skilledWorker' })
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
export const classTechnologyEvent = () => {
  return new Promise((resolve) => {
    adminHttp.CONTENT.contentTechnicalCategoryCondition({ platformCode: 'garage' })
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
//查询集师傅等级
export const classTechnician = () => {
  return new Promise((resolve) => {
    adminHttp.INTEGRAL.integralUserLevelList({ platformCode: 'skilledWorker' })
      .then((res) => {
        resolve(
          res.data.map((item) => ({
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
