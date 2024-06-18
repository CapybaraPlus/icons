import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Forward } from '@capybara-plus/icons-vue'
// import Icons from '@capybara-plus/icons-vue'

createApp(App).component('Forward', Forward).mount('#app')
