const { src, dest, series } = require('gulp')
const concat = require('gulp-concat')

function concatFile() {
  const fileList = [
    './src/readme.md',                        // 工具类说明
    './src/validator/readme.md',              // 校验类
    './src/pattern/readme.md',                // 正则类
    './src/decimal/readme.md',                // 精度计算类
    './src/lodash/readme.md',                 // lodash工具类
    './src/ajax/readme.md',                // VoCenHttp 数据请求类
    './src/encrypt/readme.md',                // VoCenHttp 数据请求类
    './src/utils/readme.md',                // VoUtils工具类
    './src/utils/strings/readme.md',        // VoUtils工具类字符串类
    './src/utils/objects/readme.md',        // VoUtils工具类对象类
    './src/utils/functions/readme.md',      // VoUtils工具类函数类
    './src/utils/arrays/readme.md',         // VoUtils工具类数组类
    './src/utils/dates/readme.md',          // VoUtils工具类时间类
    './src/utils/webs/readme.md',           // VoUtils工具类web类
    './src/store/readme.md',           // Store类
  ]
  return src(fileList).pipe(concat('readMe.md')).pipe(dest('dist'))
}

// 测试
// './src/utils/svg/readme.md',           // VoUtils工具类svg类  已单独分包
exports.concatFile = concatFile
exports.default = series(concatFile)
