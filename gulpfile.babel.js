import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync'
import beep from 'beepbeep'

/**
 * Auto load all gulp plugins and set the scope
 */
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', 'run-sequence', 'del'], scope: ['devDependencies']});

/**
 * Create dev server
 */
const server = browserSync.create()

require('./gulp/bridge.js')(gulp, [
  'clean',
  'fonts',
  'html',
  'images',
  'server',
  'sprite',
  'styles',
  'watch',
  'webpack'
], $, server)

/**
 * Default Task
 */
gulp.task('default', done => {
  $.runSequence('server', 'watch', () => {
    $.util.log($.util.colors.green.bold('START SERVER'))

    done()
  })
})

//gulp.task('default', done => runSequence('server', 'watch', done))

/**
 * Dist folder build without cleaning.
 *
 * Note: Webpack is handled by the dev middleware. We don't need to run the task now.
 */
gulp.task('build', done => {
  $.runSequence('sprite', ['styles', 'images', 'html', 'fonts'], () => {
    $.util.log($.util.colors.green.bold('ASSET BUILD COMPLETE'))

    done()
  })
})

/**
 * Clean dist folder build
 */
gulp.task('dist', done => {
  $.runSequence('clean', 'build', 'webpack', () => {
    $.util.log($.util.colors.green.bold('DISTRIBUTION BUILD COMPLETE'));

    beep(2)

    done()
  })
})
