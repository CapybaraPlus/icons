import { App, DefineComponent, Plugin } from 'vue'
import * as icons from './'

const Icons: any[] = []
// 为所有组件添加 install 方法
for (const [key, component] of Object.entries(icons)) {
  Icons.push(withInstall(key, component as any))
}
// 为组件添加 install 方法
function withInstall(name: string, component: DefineComponent) {
  component.install = (app: App) => {
    app.component(name, component)
  }
  return component
}
// 导出所有处理过后的组件
export { Icons }

// 全局统一注册
const install = (app: App) => {
  for (const [, component] of Object.entries(icons)) {
    app.use(component as unknown as Plugin)
  }
}
export default install
