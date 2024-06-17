import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// import.meta.url 用于获取当前模块的URL
// fileURLToPath 将 URL 对象转换为文件路径
// dirname 获取文件路径的目录名
const __dirname = dirname(fileURLToPath(import.meta.url))

// 获取整个 icon 项目的根路径
// 因为这里打包会生成一个 dist 目录，所以需要再往上一级
export const rootPath = resolve(__dirname, '../../../')
// 获取 resources 目录的路径
export const resourcesPath = resolve(rootPath, './resources')
// 获取 packages 目录的路径
export const packagesPath = resolve(rootPath, './packages')
// 获取 packages/vue 目录的路径
export const vuePath = resolve(packagesPath, './vue')
// 获取 prettierc 文件路径
export const prettircPath = resolve(rootPath, './.prettierrc')
