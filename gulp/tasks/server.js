import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack.config.babel'

/**
 * The development server.
 */
module.exports = (gulp, $, server, proxyServer) => {
  gulp.task('server', ['build'], done => {
    const bundler = webpack(webpackConfig)

    server.init({
      notify: false,
      logLevel: 'none',
      open: false,
      port: 4000,
      server: {
        baseDir: 'dist',
        middleware: [
          webpackDevMiddleware(bundler, webpackConfig.devServer),
          webpackHotMiddleware(bundler)
        ]
      },
      ui: {
        port: 4001
      }
    }, done)

    proxyServer.init({
      port: 5000,
      proxy: 'localhost:4000',
      ui: {
        port: 5001
      }
    })
  })
}
