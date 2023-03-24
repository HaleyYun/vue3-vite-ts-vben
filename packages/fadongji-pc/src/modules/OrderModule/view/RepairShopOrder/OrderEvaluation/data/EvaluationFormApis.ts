import adminHttp from '/@/utils/http/adminHttp'

// 获取集师傅信息
export const getEvaluationStatus = (val) => {
    return new Promise((resolve) => {
        adminHttp.CUSTOMER.companyInfoSelectPage({
            platformCode: 'skilledWorker',
            realName: val,
            pageSize: 999999,
        }).then((res) => {
            resolve(
                res.data.records.map((item) => ({
                    value: item.companyId,
                    label: item.realName + item.userName,
                })),
            )
        }).catch(() => {
            resolve([])
        })
    })
}