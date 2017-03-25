/**
 * Render html files and copy into dist on build.
 */
module.exports = (gulp, $, server) => {
  gulp.task('html', () => {
    return gulp.src('src/**/*.html')
      .pipe($.plumber())
      .pipe($.fileInclude({
        prefix: '@@',
        basepath: 'src'
      }))
      .pipe(gulp.dest('dist'))
      .pipe(server.stream({reload: true}))
  })
}
