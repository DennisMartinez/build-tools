/**
 * Clean our dist folder before building.
 */
module.exports = (gulp, $) => {
  gulp.task('clean', () => {
    $.del(['dist'], {
      force: true
    })
    .then(paths => {
      $.util.log($.util.colors.green.bold(`Deleted files and folders: ${paths.join('\n')}`))
    })
  })
}
