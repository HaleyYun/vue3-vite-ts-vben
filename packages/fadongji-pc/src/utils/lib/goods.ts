//笛卡儿积组合
export const descartes = (list) => {
  if(list.lenth<1)return;
  //parent上一级索引;count指针计数
  const point = {}
  const result = []
  let pIndex = null
  let tempCount = 0
  let temp = []
  //根据参数列生成指针对象
  for (var index in list) {
    if (typeof list[index] === 'object') {
      point[index] = { parent: pIndex, count: 0 }
      pIndex = index
    }
  }
  console.log({
    point
  })
  //单维度数据结构直接返回
  if (pIndex == null) {
    return list
  }
  //动态生成笛卡尔积
  while (true) {
    for (var index in list) {
      tempCount = point[index]['count']
      temp.push(list[index][tempCount])
    }
    //压入结果数组
    result.push(temp)
    temp = []
    //检查指针最大值问题
    while (true) {
      if (point[index]['count'] + 1 >= list[index].length) {
        point[index]['count'] = 0
        pIndex = point[index]['parent']
        if (pIndex == null) {
          return result
        }
        //赋值parent进行再次检查
        index = pIndex
      } else {
        point[index]['count']++
        break
      }
    }
  }
}
