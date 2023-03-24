const fs = require('fs')

// 判断输入的名称是否是空值
exports.notEmpty = (module_name) => {
  return (v) => {
    if (!v || v.trim === '') {
      return `${module_name} is required`
    } else {
      return true
    }
  }
}

// 获取指定路径下的文件目录
exports.getFolder = (path) => {
  let components = []
  const files = fs.readdirSync(path)
  files.forEach(function (item) {
    let stat = fs.lstatSync(path + '/' + item)
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(path + '/' + item)
      components.push.apply(components, getFolder(path + '/' + item))
    }
  })
  return components
}
