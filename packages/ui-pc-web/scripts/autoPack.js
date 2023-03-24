// 局部模式
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')

const files = fs
  .readdirSync(path.resolve(__dirname, '../packages/components'))
  .filter(
    (name) =>
      !['theme-default', 'index.ts', 'types.ts', 'package.json', 'version.ts', 'Base'].includes(
        name,
      ),
  )
// 解压的webhook
// const originUzipUrl = 'http://172.17.0.10:31000/ssh?projectName=fdj_test'

if (shell.exec('yarn build:theme').code !== 0) {
  // 执行npm run build 命令
  shell.echo('Error: get coding failed')
  shell.exit(1)
}

if (shell.exec('yarn build:package').code !== 0) {
  // 执行npm run build 命令
  shell.echo('Error: build failed')
  shell.exit(1)
}

files.map((item) => {
  shell.cp(
    path.resolve(__dirname, `../packages/components/${item}/README.md`),
    path.resolve(__dirname, `../lib/${item}/README.md`),
  )
})

// // 测试环境 http://csbk.jldl168.com/  对应csapi
// const options = {
//     // host: '172.17.0.10',
//     // port: '21',
//     // user: 'fdj_test_back',
//     // password: 'vocen@2020'
//     // proxy:{
//     //   host: '',
//     //   port: '',
//     // }
// }
//
// const FtpDeploy = require('ftp-deploy')
//
// const ftpDeploy = new FtpDeploy()
//
// const config = {
//     ...options,
//
//     // 上传压缩后文件
//     localRoot: `${__dirname}/zip`,
//     include: ['dist.zip'], // this would upload everything except dot files
//     remoteRoot: '/',
//
//     // include: ["*.php", "dist/*", ".*"],
//     // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
//     // exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
//     exclude: [],
//     // delete ALL existing files at destination before uploading, if true
//     deleteRemote: false,
//     // Passive mode is forced (EPSV command is not sent)
//     forcePasv: false
// }
//
// // use with callback
// ftpDeploy.deploy(config, (err, res) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('finished:', res)
//         console.log('uzip start')
//         http.get(originUzipUrl, function (res) {
//             res.on('data', (body) => {
//                 console.log('uzip done')
//                 process.exit()
//             })
//             res.on('end', () => {
//                 process.exit()
//             })
//         }).on('error', (e) => {
//             console.log(`获取数据失败: ${e.message}`)
//         })
//     }
// })
//
// ftpDeploy.on('uploading', data => {
//     console.log(`start up ${data.filename} ，fileSize ${data.totalFilesCount}`) // partial path with filename being uploaded
// })
// ftpDeploy.on('uploaded', data => {
//     console.log(data.filename + ' upload done') // same data as uploading event
// })
// ftpDeploy.on('log', data => {
//     console.log(data) // same data as uploading event
// })
// ftpDeploy.on('upload-error', data => {
//     console.log(data.err) // data will also include filename, relativePath, and other goodies
// })
