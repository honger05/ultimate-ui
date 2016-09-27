var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var conf = {
  entry: {},
  module: {
    loaders: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      DEBUG: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["common", "pub"],
      minChunks: Infinity
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
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
    // minify: {
    //   removeComments: true,
    //   collapseWhitespace: true,
    //   removeAttributeQuotes: true
    //   // more options:
    //   // https://github.com/kangax/html-minifier#options-quick-reference
    // }
  }))
})

module.exports = merge(baseWebpackConfig, conf)
