const isProduction = process.env.NODE_ENV === 'production'

/**
 * Minify and copy our images into dist on build.
 */
module.exports = (gulp, $, server) => {
  gulp.task('images', () => {
    return gulp.src([
        'src/img/**',
        '!src/img/sprites{,/**}'
      ])
      .pipe($.plumber())
      .pipe($.if(isProduction, $.imagemin()))
      .pipe(gulp.dest('dist/img'))
      .pipe(server.stream())
  })
}
