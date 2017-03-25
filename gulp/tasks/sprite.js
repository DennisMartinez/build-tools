/**
 * Creates a spritesheet from our img/sprites folder.
 */
module.exports = (gulp, $, server) => {
  gulp.task('sprite', () => {
    return gulp.src('src/img/sprites/**/*')
      .pipe($.plumber())
      .pipe($.spritesmith({
        imgName: 'img/sprite.png',
        cssName: 'scss/_sprite.scss'
      }))
      .pipe(gulp.dest('src'))
      .pipe(server.stream())
  })
}
