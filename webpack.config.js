const webpack = require('webpack')
const path = require('path')

const environment = process.env['NODE_ENV'] || 'development'
const target = process.env['TARGET'] || 'http://localhost:8000/'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src', 'frontend', 'index.html'),
  filename: 'index.html',
  inject: 'body'
})

const paths = {
  ENTRY: path.join(__dirname, 'src', 'frontend', 'index.js'),
  OUTPUT_FILENAME: 'bundle.js',
  OUTPUT: path.join(__dirname, 'dist', 'frontend'),
  APP: path.join(__dirname, 'src', 'frontend')
}

const config = {
  entry: [
    paths.ENTRY
  ],

  mode: environment,

  resolve: {
    alias: {
      'marionette': 'backbone.marionette',
      'underscore': 'lodash'
    },
    extensions: ['.js'],
    modules: ['src/frontend', 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include: paths.APP,
        exclude: [/node_modules/, path.join(__dirname, 'dist'), paths.OUTPUT],
        use: ['babel-loader', 'standard-loader']
      },

      { test: /\.html/, include: path.join(paths.APP, 'templates'), loader: 'underscore-template-loader' },
      { test: /\.less$/i, use: ['style-loader', 'css-loader', 'less-loader'] }
    ]
  },

  output: {
    filename: paths.OUTPUT_FILENAME,
    path: paths.OUTPUT,
    chunkFilename: '[id].js'
  },

  devtool: 'source-map',

  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8081,
    proxy: {
      '/api': {
        target: target,
        secure: false
      }
    }
  },

  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        babel: {
          babelrc: true
        }
      }
    })
  ]
}

module.exports = config
