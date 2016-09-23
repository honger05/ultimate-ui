var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, 'aun-dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'aun-dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false
  },
  dev: {
    port: 3000,
    proxyTable: {}
  }
}
