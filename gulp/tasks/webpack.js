import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import webpackConfig from '../../webpack.config.babel'

/**
 * Webpack build stream.
 */
module.exports = gulp => {
  gulp.task('webpack', () => {
    return gulp.src('src/js/app.js')
      .pipe(webpackStream(webpackConfig, webpack))
      .pipe(gulp.dest('dist/js'))
  })
}
