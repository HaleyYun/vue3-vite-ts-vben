const { src, dest, series, parallel, task } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const del = require('del');
const path = require('path');
const cssmin = require('gulp-cssmin');
// 打包配置
const config = {
  input: path.resolve(__dirname, './theme-default/'),
  output: path.resolve(__dirname, './lib/theme-default'),
};

// 复制组件
const copyComponent = () =>
  src([path.resolve(__dirname, `./components/**/*`)]).pipe(
    dest(path.resolve(__dirname, `./lib/components`)),
  );

// 复制package.json
const copyPackage = () =>
  src([`./packageTemp.json`]).pipe(rename('package.json')).pipe(dest(`./lib/`));

//复制scss
src([`./theme-default/base.scss`]).pipe(dest(`./lib/theme-default/`));
src([`./theme-default/var.scss`]).pipe(dest(`./lib/theme-default/`));
src([`./theme-default/mixins.scss`]).pipe(dest(`./lib/theme-default/`));
src([`./README.md`]).pipe(dest(`./lib/`));

// 复制package.json
const copyEntrance = () => src([`./index.js`]).pipe(dest(`./lib/`));

// 删除之前css打包文件
const clean = (done) => {
  del(['./lib/**']);
  done();
};
// 编译 scss
const compile = () =>
  //, "variable"
  src([
    './theme-default/*.scss',
    `!./theme-default/base.scss`,
    `!./theme-default/mixins.scss`,
    `!./theme-default/var.scss`,
  ])
    .pipe(sass())
    // .pipe(
    //   autoprefixer({
    //     overrideBrowserslist: ["last 2 versions"]
    //   })
    // )
    .pipe(cssmin())
    .pipe(dest(config.output));

// 导出配置项
exports.config = config;
exports.clean = clean;
exports.copyPackage = copyPackage;
exports.copyComponent = copyComponent;
exports.copyEntrance = copyEntrance;
exports.build = series(clean, parallel(compile, copyComponent, copyPackage, copyEntrance));
