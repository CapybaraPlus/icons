import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Success } from '@capybara-ui/icons-vue'
import Icons from '@capybara-ui/icons-vue'

createApp(App).use(Icons).use(Success).mount('#app')
