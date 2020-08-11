import Vue from 'vue'
import VueRouter from 'vue-router'
import Designer from '@/views/designer/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Designer',
    component: Designer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
