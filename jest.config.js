module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  // setupFilesAfterEnv: ['./scripts/setupJestEnv.ts'],
  globals: {
    __DEV__: true,
    __TEST__: true,
    __VERSION__: require('./package.json').version,
    __BROWSER__: false,
    __GLOBAL__: false,
    __ESM_BUNDLER__: true,
    __ESM_BROWSER__: false,
    __NODE_JS__: true,
    __SSR__: true,
    __FEATURE_OPTIONS_API__: true,
    __FEATURE_SUSPENSE__: true,
    __FEATURE_PROD_DEVTOOLS__: false,
    __COMPAT__: true,
    'ts-jest': {
      tsconfig: {
        target: 'esnext',
        sourceMap: true,
      },
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.vue?$': '@vue/vue3-jest',
  },
  transformIgnorePatterns: ['<rootDir>/tests/__mocks__/', '/node_modules/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: getCollectCoverageFrom(),
  coveragePathIgnorePatterns: ['^.+\\.d\\.ts$'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    // '@vue/consolidate': '@vue/consolidate',
    // '@vue/compat': '<rootDir>/packages/vue-compat/src',
    // '^@vue/(.*?)$': '<rootDir>/packages/$1/src',
    // 'vue/compiler-sfc': '<rootDir>/packages/compiler-sfc/src',
    // 'vue/server-renderer': '<rootDir>/packages/server-renderer/src',
    // vue: '<rootDir>/packages/vue/src'
  },
  rootDir: __dirname,
  testMatch: ['<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)'],
  testPathIgnorePatterns: process.env.SKIP_E2E
    ? // ignore example-tmp tests on netlify builds since they don't contribute
      // to coverage and can cause netlify builds to fail
      ['/node_modules/', '/examples/__tests__']
    : ['/node_modules/'],
}

function getCollectCoverageFrom() {
  let collectCover = ['packages/**/*.{js,ts,vue}']
  if (Number(process.argv[process.argv.length - 1].indexOf('packages/ui-pc-web')) !== -1) {
    collectCover = [`${process.argv[process.argv.length - 1]}/packages/**/*.{js,ts,vue}`]
  } else if (Number(process.argv[process.argv.length - 1].indexOf('packages')) !== -1) {
    collectCover = [`${process.argv[process.argv.length - 1]}/**/*.{js,ts,vue}`]
  }
  return collectCover
}
