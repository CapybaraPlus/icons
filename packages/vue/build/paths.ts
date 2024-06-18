import { resolve } from 'path'
import { vuePath } from '@capybara-plus/icons-utils'

export const vueSrcPath = resolve(vuePath, './src')
export const vueComponentsPath = resolve(vueSrcPath, './components')
export const vueOutputPath = resolve(vuePath, './dist')
export const vueIndexPath = resolve(vueSrcPath, './index.ts')
