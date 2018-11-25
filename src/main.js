import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from '@/components/Login'
import Authentication from '@/components/Authentication'
import FitnessData from '@/components/FitnessData'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { 
    path: '/',
    component: Login
  },
  { 
    path: '/authenticated',
    name: 'authenticated',
    component: Authentication
  },
  { 
    path: '/fitnessdata', 
    name: 'fitnessdata',
    component: FitnessData
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
