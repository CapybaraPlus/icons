// generate vue components
import consola from 'consola'
import chalk from 'chalk'
import { readFile, writeFile } from 'node:fs/promises'
import { emptyDir, ensureDir } from 'fs-extra'
import { resolve, basename } from 'node:path'
import { vueComponentsPath } from './paths'
import { resourcesPath } from '@capybara-ui/icons-utils'
import glob from 'fast-glob'
import { kabeCaseToPascalCase, formatCode } from '@capybara-ui/icons-utils'

/**
 * ------------------------------
 *         1.查找 svg 文件
 * ------------------------------
 */
consola.info(chalk.blue('preparing to generate vue components...'))
await ensureDir(vueComponentsPath) // 确保目录存在，如果不存在则创建
await emptyDir(vueComponentsPath) // 清空目录
const files = await getSvgFiles()

// 获取 svg 文件
async function getSvgFiles() {
  return glob('*.svg', { cwd: resourcesPath, absolute: true })
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
  const svgContent = await readFile(filePath, 'utf-8')
  const { fileName, componentName } = getFileAndComponentName(filePath)
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
      return `export { default as ${componentName} } from './${fileName}.vue'`
    })
    .join('\n')

  await writeFile(resolve(vueComponentsPath, 'index.ts'), entryContent, 'utf-8')
}

consola.info(chalk.green('generate icon entry file successfully!'))
