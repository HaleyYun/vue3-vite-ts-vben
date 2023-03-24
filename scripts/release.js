const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const args = require('minimist')(process.argv.slice(2))
const semver = require('semver')

const currentVersion = require('../package.json').version
const { prompt } = require('enquirer')
const execa = require('execa')

const preId =
  args.preid || (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0])
const isDryRun = args.dry
const skipTests = args.skipTests
const skipBuild = args.skipBuild
const inc = (i) => semver.inc(currentVersion, i, preId)
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })
// const packages = fs
//     .readdirSync(path.resolve(__dirname, '../packages'))
//     .filter(p => !p.endsWith('.ts') && !p.startsWith('.'))

//为了更多的配置项 可配置  所以摒弃他原来的读取数组
let packages = getPackList()

const getPkgRoot = (pkg) => path.resolve(__dirname, '../' + pkg.projectFolder)

const versionIncrements = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []),
]

const step = (msg) => console.log(chalk.cyan(msg))

async function main() {
  //回去版本号
  // let targetVersion = args._[0]
  let targetVersion = null

  //如果没有版本号  选择版本号 等
  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements.map((i) => `${i} (${inc(i)})`).concat(['custom']),
    })

    if (release === 'custom') {
      targetVersion = (
        await prompt({
          type: 'input',
          name: 'version',
          message: 'Input custom version',
          initial: currentVersion,
        })
      ).version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }

  //判断版本号 是否输入正确
  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }
  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  })

  if (!yes) {
    return
  }

  // 更新所有包版本和相互依赖关系
  step('\nUpdating cross dependencies...')
  updateVersions(targetVersion)

  //循环npm  publish

  step('\n npm publish')
  npmPublish(packages)

  // 构建所有带有类型的包
  step('\nBuilding all packages...')
  if (!skipBuild && !isDryRun) {
    // await run('pnpm', ['run', 'build', '--', '--release'])
    // await run('pnpm', ['run', 'build'])
    // // test generated dts files
    // step('\nVerifying type declarations...')
    // await run('pnpm', ['run', 'test-dts-only'])
  } else {
    console.log(`(skipped)`)
  }
}

function updateVersions(version) {
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), version)
  // 2. update all packages
  packages.forEach((p) => updatePackage(getPkgRoot(p), version))
}
function updatePackage(pkgRoot, version) {
  console.log(pkgRoot, 'pkgRootpkgRootpkgRoot')
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  // updateDeps(pkg, 'dependencies', version)
  // updateDeps(pkg, 'peerDependencies', version)
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

// function updateDeps(pkg, depType, version) {
//     const deps = pkg[depType]
//     if (!deps) return
//     Object.keys(deps).forEach(dep => {
//         if (
//             dep === 'vue' ||
//             (dep.startsWith('@vue') && packages.includes(dep.replace(/^@vue\//, '')))
//         ) {
//             console.log(
//                 chalk.yellow(`${pkg.name} -> ${depType} -> ${dep}@${version}`)
//             )
//             deps[dep] = version
//         }
//     })
// }

//获取package 列表
function getPackList() {
  let pageList = []
  if (args._[0]) {
    pageList = require('../monorepo.config.json').packages.filter(
      (item) => item.packageName === args._[0],
    )
  } else {
    pageList = require('../monorepo.config.json').packages
  }

  return pageList
}

//循环发布
function npmPublish(packages) {
  let pageList = []
  if (args._[0]) {
    pageList = require('../monorepo.config.json').packages.filter(
      (item) => item.packageName === args._[0],
    )
  } else {
    pageList = packages.filter((item) => item.isBuild)
  }

  pageList.forEach((item) => {
    publishNumPackageFunc(item)
  })
}

async function publishNumPackageFunc(item) {
  await run(`npm`, ['publish', getPkgRoot(item)])
}

main().catch((err) => {
  console.log(err)
})
