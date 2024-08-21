import { App } from 'vue'
import * as icons from './'

export default (app: App) => {
  for (const [key, component] of Object.entries(icons)) {
    app.component(key, component)
  }
}

export { icons }
