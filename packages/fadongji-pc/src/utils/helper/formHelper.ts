/**
 * 过滤简单对象的无效属性
 * @param obj 简单值组件的对象
 * @param expects 例外
 * @param clears 清除的对象
 * @returns {{}}
 */
export const clearObjectUnalbeAttr = (
  obj,
  expects = ['0', 0],
  clears = [null, undefined, '', 'null', 'undefined'],
) => {
  const ret = {}
  for (const k in obj) {
    if (typeof obj[k] === 'object') {
      if (!Array.isArray(obj[k])) {
        ret[k] = clearObjectUnalbeAttr(obj[k], expects, clears)
      } else {
        ret[k] = obj[k]
      }
      continue
    }
    if (expects.includes(obj[k]) || !clears.includes(obj[k])) {
      ret[k] = obj[k]
    }
  }
  return ret
}
