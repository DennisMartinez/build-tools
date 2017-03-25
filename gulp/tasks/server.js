import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack.config.babel'

/**
 * The development server.
 */
module.exports = (gulp, $, server) => {
  gulp.task('server', ['build'], done => {
    const bundler = webpack(webpackConfig)

    server.init({
      notify: false,
      logLevel: 'none',
      server: {
        baseDir: 'dist',
        middleware: [
          webpackDevMiddleware(bundler, webpackConfig.devServer),
          webpackHotMiddleware(bundler)
        ]
      }
    }, done)
  })
}
