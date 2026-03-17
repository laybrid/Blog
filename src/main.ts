import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/tailwind.css'
import 'highlight.js/styles/atom-one-dark.css'
import './assets/css/index.css'

createApp(App).use(router).mount('#app')
