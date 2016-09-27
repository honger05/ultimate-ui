var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var conf = {
  entry: {},
  module: {
    loaders: utils.styleLoaders()
  },
  // eval-source-map is faster for development
  devtool: '#cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      DEBUG: true
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["common", "pub"],
      minChunks: Infinity
    })
  ]
}

utils.entry.forEach(function(item) {
  conf.entry[item] = 'src/modules/'+ item +'/'+ item +'.js'

  conf.plugins.push(new HtmlWebpackPlugin({
    scope: item,
    filename: item + '.html',
    template: 'src/modules/'+ item +'/' + item + '.html',
    inject: 'body',
    chunks: [ item, 'common', 'pub' ],
		chunksSortMode: function (a, b) {
      var index = {'pub': 3, 'common': 2}
      index[item] = 1
      var ai = index[a.origins[0].name]
      var bi = index[b.origins[0].name]
      return ai && bi ? bi - ai : -1
    }
  }))
})

// add hot-reload related code to entry chunks
Object.keys(conf.entry).forEach(function (name) {
  conf.entry[name] = ['./build/dev-client'].concat(conf.entry[name])
})

module.exports = merge(baseWebpackConfig, conf)
