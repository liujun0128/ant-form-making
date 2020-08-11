import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './core/lazy_use'

import '@/styles/icon.css'
import '@/styles/index.css'

import lt from 'lazyit-tools'
import 'lazyit-tools/lib/lazyit-tools.css'


Vue.config.productionTip = false
Vue.use(lt)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
