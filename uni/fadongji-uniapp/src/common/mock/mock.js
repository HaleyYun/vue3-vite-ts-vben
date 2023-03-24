function createMockData(tmpl, len = 10, addIndex = false, indexKey = 'id') {
  let i = 0
  const arr = []
  while (i < len) {
    if (addIndex) {
      if (typeof tmpl === 'object') {
        let merge = {}
        merge[indexKey] = i
        arr.push(Object.assign({}, tmpl, merge))
      } else {
        arr.push(tmpl)
      }
    } else {
      arr.push(tmpl)
    }
    i++
  }
  return arr
}

export default {
  createMockData
}
