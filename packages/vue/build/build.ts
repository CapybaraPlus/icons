import { BuildOptions, build } from 'esbuild'
import { vuePath } from '@capybara-ui/icons-utils'
import { resolve } from 'path'
import unpluginVue from 'unplugin-vue/esbuild'
import consola from 'consola'
import chalk from 'chalk'
import { emptyDir } from 'fs-extra'

const outputPath = resolve(vuePath, './dist')

function buildESBuildOptions() {
  const options: BuildOptions = {
    entryPoints: [resolve(vuePath, './index.ts')], // 入口文件
    target: 'esnext', // 目标js版本
    platform: 'neutral', // 目标平台，这里表示任意平台
    bundle: true, // 是否打包到一个文件中
    minifySyntax: true, // 是否压缩代码
    format: 'esm', // 输出的模块格式，例如 esm、cjs、iife等
    plugins: [
      unpluginVue({
        isProduction: true, // 是否是生产环境
        sourceMap: false, // 是否生成 sourcemap 文件
        template: {
          compilerOptions: { hoistStatic: false }, // 指定编译器
        },
      }),
    ],
    outdir: outputPath, // 输出目录
  }
  return options
}

async function esbuild(minify: boolean = true) {
  await build({
    ...buildESBuildOptions(),
    entryNames: `[name]${minify ? '.min' : ''}`,
    minify,
  })
}

async function doBuild() {
  await Promise.all([esbuild(true), esbuild(false)])
}

consola.info(chalk.blue('preparing to build'))
consola.info(chalk.yellow('cleaning dist...'))
await emptyDir(outputPath)
consola.info(chalk.green('clean dist successfully!'))

consola.info(chalk.yellow('building...'))
await doBuild()
consola.info(chalk.green('build successfully!'))