/**
 * Copy font files into dist on build.
 */
module.exports = (gulp, $, server) => {
  gulp.task('fonts', () => {
    return gulp.src([
        'src/fonts/**/*.{woff,woff2,eot,ttf,otf,svg}',
        'node_modules/font-awesome/fonts/**/*.{woff,woff2,eot,ttf,otf,svg}'
      ])
      .pipe($.plumber())
      .pipe(gulp.dest('dist/fonts'))
      .pipe(server.stream())
  })
}
