const isProduction = process.env.NODE_ENV === 'production'

/**
 * Compile scss files into css files.
 */
module.exports = (gulp, $, server) => {
  gulp.task('styles', () => {
    return gulp.src('src/scss/**/*.scss')
      .pipe($.plumber())
      .pipe($.sassGlob())
      .pipe($.if(isProduction, $.sourcemaps.init()))
      .pipe($.sass({
        includePaths: ['node_modules']
      }).on('error', $.sass.logError))
      .pipe($.combineMq())
      .pipe($.if(isProduction, $.cssnano()))
      .pipe($.if(isProduction, $.sourcemaps.write('./')))
      .pipe(gulp.dest('dist/css'))
      .pipe(server.stream())
  })
}
