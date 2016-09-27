export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: require('./case/index.vue')
    },
    '/case/flex': {
      name: 'flex',
      component: function (resolve) {
        require(['./case/flex.vue'], resolve)
      }
    }
  })
}

