import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/tailwind.css'
import 'highlight.js/styles/github-dark.css'
import './assets/css/index.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App)
  .use(router)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')
