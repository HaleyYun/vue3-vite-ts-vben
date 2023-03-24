// const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  transpileDependencies: ['@vocen/uview-ui', 'uview-ui'],

  // chainWebpack: (config) => {
  //   // 使用 esbuild 编译 js 文件
  //   const rule = config.module.rule('js');
  //
  //   // 清理自带的 babel-loader
  //   // rule.uses.clear();
  //
  //   // 添加 esbuild-loader
  //   rule
  //     .use('esbuild-loader')
  //     .loader('esbuild-loader')
  //     // .options({
  //     //   loader: 'ts', // 如果使用了 ts, 或者 vue 的 class 装饰器，则需要加上这个 option 配置， 否则会报错： ERROR: Unexpected "@"
  //     //   target: 'es2015',
  //     //   tsconfigRaw: require('./tsconfig.json')
  //     // })
  //
  //   // 删除底层 terser, 换用 esbuild-minimize-plugin
  //   config.optimization.minimizers.delete('terser');
  //
  //   // 使用 esbuild 优化 css 压缩
  //   config.optimization
  //     .minimizer('esbuild')
  //     .use(ESBuildMinifyPlugin, [{ minify: true, css: true }]);
  // },
}

