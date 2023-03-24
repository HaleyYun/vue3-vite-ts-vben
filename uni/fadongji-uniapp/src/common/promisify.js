/**
 * promise化接口
 * @param {Function} functionName api
 * @param {Function} params 结构
 * @returns {Promise<unknown>}
 * @constructor
 */
const Promisify = (functionName, params) => {
  return new Promise((resolve, reject) => {
    uni[functionName]({
      success: (res) => resolve(res),
      fail: (res) => reject(res),
      ...params, // 把解构放在后面，可以覆盖success
    })
  })
}
export default Promisify
