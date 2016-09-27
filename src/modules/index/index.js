import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './routers'
import aop from './aop.js'

Vue.use(VueRouter)

let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
})

routerMap(router)

aop(router)

let app = Vue.extend({})

router.start(app, '#app')

