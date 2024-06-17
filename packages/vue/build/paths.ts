import { resolve } from 'path'
import { vuePath } from '@capybara-ui/icons-utils'

export const vueSrcPath = resolve(vuePath, './src')
export const vueComponentsPath = resolve(vueSrcPath, './components')
export const vueOutputPath = resolve(vuePath, './dist')
