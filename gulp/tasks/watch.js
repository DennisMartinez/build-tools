/**
 * Watch for file changes. gulp.watch wasn't picking up image changes
 * so switched over to gulp-watch.
 *
 * Note:
 *   If we start having issues with multiple file changes at once,
 *   gulp-batch (https://github.com/floatdrop/gulp-batch) will help
 *   solve those issues. For now I'm leaving out.
 *
 *   See for more info: https://github.com/gulpjs/gulp/issues/80
 */
module.exports = (gulp, $) => {
  gulp.task('watch', () => {
    $.watch('src/scss/**/*.scss', () => gulp.start('styles'))
    $.watch('src/**/*.html', () => gulp.start('html'))
    $.watch('src/img/**', () => gulp.start('images'))
    $.watch('src/img/sprites/**/*', () => gulp.start('sprite'))
    $.watch([
      'src/fonts/**/*.{woff,woff2,eot,ttf,otf,svg}',
      'node_modules/font-awesome/fonts/**/*.{woff,woff2,eot,ttf,otf,svg}'
    ], () => gulp.start('fonts'))
  })
}
