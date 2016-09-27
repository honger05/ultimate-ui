export default function (router) {
  router.beforeEach(transition => {
    console.log('进入之前' + transition.to.path)
    transition.next()
  })

  router.afterEach(transition => {
    console.log('进入之后' + transition.to.path)
  })
}

