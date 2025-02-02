// generate vue components
import consola from 'consola'
import chalk from 'chalk'
import { readFile, writeFile } from 'node:fs/promises'
import { emptyDir, ensureDir } from 'fs-extra'
import { resolve, basename } from 'node:path'
import { vueComponentsPath, vueSrcPath } from './paths'
import glob from 'fast-glob'
import { kabeCaseToPascalCase, formatCode } from '@capybara-plus/icons-utils'
import { findWorkspaceDir } from '@pnpm/find-workspace-dir'
import { findWorkspacePackages } from '@pnpm/find-workspace-packages'

/**
 * ------------------------------
 *         1.查找 svg 文件
 * ------------------------------
 */
consola.info(chalk.blue('preparing to generate vue components...'))
consola.info(chalk.yellow('getting svg files...'))
await ensureDir(vueComponentsPath) // 确保目录存在，如果不存在则创建
await emptyDir(vueComponentsPath) // 清空目录，确保删除的图标也不会留在目录中
const files = await getSvgFiles()

// 获取 svg 文件
async function getSvgFiles() {
  const workspaceDirs = await findWorkspaceDir(process.cwd())
  const pkgs = await findWorkspacePackages(workspaceDirs!)
  const pkg = pkgs.find(
    (pkg) => pkg.manifest.name === '@capybara-plus/icons-resources',
  )
  return glob('*.svg', { cwd: pkg!.dir, absolute: true })
}

consola.info(chalk.green('get svg files successfully!'))

/**
 * ------------------------------
 *         2.生成 vue 文件
 * ------------------------------
 */
consola.info(chalk.yellow('generating vue components...'))
await Promise.all(files.map((file) => generateVueComponents(file)))

// 生成 vue 组件
// file: svg 文件路径
async function generateVueComponents(filePath: string) {
  let svgContent = await readFile(filePath, 'utf-8')
  svgContent = svgContent.replace(/<\?xml[^>]*\?>/g, '') // 消除 xml 声明
  svgContent = svgContent.replace(/id="[^"]*"/, '')
  const { fileName, componentName } = getFileAndComponentName(filePath)
  svgContent = svgContent.replace(/<svg/, `<svg class="ra-icon--${fileName}"`) // 生成类名
  const vueContent = `
<template>
${svgContent}
</template>

<script setup lang="ts">
defineOptions({
  name: '${componentName}',
})
</script>
  `
  formatCode(vueContent, 'vue')
  await writeFile(
    resolve(vueComponentsPath, `${fileName}.vue`),
    vueContent,
    'utf-8',
  )
}

// 根据文件路径生成文件名与组件名
function getFileAndComponentName(filePath: string) {
  const fileBaseName = basename(filePath) // 获取文件名
  const fileName = fileBaseName.replace('.svg', '')
  const componentName = kabeCaseToPascalCase(fileName)

  return {
    fileName,
    componentName,
  }
}

consola.info(chalk.green('generate vue components successfully!'))

/**
 * ------------------------------
 *    3.生成 icon 组件的入口文件
 * ------------------------------
 */

consola.info(chalk.yellow('generating icon entry file...'))
await generateEntryFile(files)

// 生成入口文件
// filesPath：svg 文件路径数组
async function generateEntryFile(filesPath: string[]) {
  const entryContent = filesPath
    .map((filePath) => {
      const { fileName, componentName } = getFileAndComponentName(filePath)
      return `export { default as ${componentName} } from './components/${fileName}.vue'`
    })
    .join('\n')

  await writeFile(resolve(vueSrcPath, 'index.ts'), entryContent, 'utf-8')
}

consola.info(chalk.green('generate icon entry file successfully!'))
