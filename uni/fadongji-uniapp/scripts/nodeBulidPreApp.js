// 发布test环境

// 局部模式
const shell = require('shelljs')
const path = require('path')
// 复制文件

if (shell.exec('git pull').code !== 0) {
  // 执行npm run build 命令
  shell.echo('Error: get coding failed')
  shell.exit(1)
}

shell.cp(
  path.resolve(__dirname, `../src/common/envPreview.js`),
  path.resolve(__dirname, `../src/common/env.js`),
)

if (shell.exec('yarn install').code !== 0) {
  // 执行npm run build 命令
  shell.echo('Error: get coding failed')
  shell.exit(1)
}
if (shell.exec('yarn build:app-plus').code !== 0) {
  // 执行npm run build 命令
  shell.echo('Error: get coding failed')
  shell.exit(1)
}
