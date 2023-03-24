const { src, dest, series, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const del = require('del')

// 打包配置
const config = {
  input: '../packages/theme-default/',
  output: '../lib/theme-default',
}

// 复制字体
const copyfont = () =>
  src([`${config.input}fonts/*`, `!${config.input}fonts/*.css`]).pipe(
    dest(`${config.output}/fonts`),
  )

// 复制package.json
const copyPackage = () => src([`../packages/package.json`]).pipe(dest(`../lib/`))

// 压缩font 里的 CSS
const minifontCss = () =>
  src(`${config.input}fonts/*.css`)
    .pipe(cssmin())
    .pipe(dest(`${config.output}/fonts`))

// 删除之前css打包文件
const clean = (done) => {
  del(
    ['*.css', 'fonts'].map((name) => `${config.output}/${name}`),
    { force: true },
  )
  done()
}

// 编译 scss
const compile = () =>
  //, "variable"
  src([`${config.input}*.scss`, ...['base'].map((name) => `!${config.input}${name}.scss`)])
    .pipe(sass())
    // .pipe(
    //   autoprefixer({
    //     overrideBrowserslist: ["last 2 versions"]
    //   })
    // )
    .pipe(cssmin())
    .pipe(dest(config.output))

// 导出配置项
exports.config = config
exports.clean = clean
exports.copyfont = copyfont
exports.copyPackage = copyPackage
exports.minifontCss = minifontCss
exports.build = series(clean, parallel(compile, copyfont, copyPackage, minifontCss))
