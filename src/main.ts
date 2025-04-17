import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/tailwind.css'
import 'github-markdown-css'
import './assets/css/markdown.css'
createApp(App).use(router).mount('#app')
