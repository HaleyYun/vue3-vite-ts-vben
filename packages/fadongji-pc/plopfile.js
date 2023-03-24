// plopfile.js
const moduleGenerator = require('./plop-templates/modules/prompt')

// 执行prompt脚本信息进行生成文件或目录
module.exports = function (plop) {
  plop.setGenerator('module', moduleGenerator)
}
