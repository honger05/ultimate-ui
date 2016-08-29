var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./webpack.npm.base')

var path = require('path')
var pkg = require(path.join(__dirname, '../package.json'))

config.output.filename = '[name].js'
config.output.chunkFilename = '[id].[chunkhash].js'

var SOURCE_MAP = false

config.devtool = SOURCE_MAP ? 'source-map' : false

config.vue.loaders = {
  js: 'babel',
  css: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css'])),
  less: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'less'])),
  scss: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'sass'])),
  stylus: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'stylus']))
}

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.BannerPlugin('Banner', {
    entryOnly: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin('nui.css')
])

module.exports = config

function generateExtractLoaders(loaders) {
  return loaders.map(loader => {
    return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
  }).join('!')
}
