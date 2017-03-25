import { resolve } from 'path'
import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

const env = process.env.NODE_ENV || 'development'

/**
 * Base Configuration.
 */
const config = {
  devtool: 'cheap-eval-source-map',
  entry: {
    app: [
      resolve(__dirname, 'src/js/app.js')
    ],
    vendor: [
      'jquery',
      'slick-carousel'
    ]
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist/js'),
    publicPath: '/js/'
  },
  devServer: {
    publicPath: '/js/',
    stats: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      '__DEV__': process.env.NODE_ENV === 'development',
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
}

/**
 * Build only configuration.
 */
if (env !== 'production') {
  if (config.entry && config.entry.app && Array.isArray(config.entry.app)) {
    config.entry.app.unshift(
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&quiet=true&reload=true'
    )
  }

  config.plugins = (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin()
  ])
}

/**
 * Production only configuration.
 */
if (env === 'production') {
  config.devtool = 'cheap-source-map'
  
  config.plugins = (config.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new ProgressBarPlugin({
      clear: false
    })
  ])
}

export default config
