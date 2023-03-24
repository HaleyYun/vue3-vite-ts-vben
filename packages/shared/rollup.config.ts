import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import { babel } from '@rollup/plugin-babel'

const pkg = require('./package.json')

const libraryName = 'index'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.main, name: 'VoCenShared', format: 'umd', sourcemap: true},
    { file: pkg.module, format: 'es', sourcemap: true},
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // 代码压缩
    terser(),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    babel ( {  babelHelpers : 'bundled'  } ),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/plugins/tree/master/packages/node-resolve
    nodeResolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
