import browserSync from 'browser-sync'
import bump from 'gulp-bump'
import combineMQ from 'gulp-combine-mq'
import cssnano from 'gulp-cssnano'
import del from 'del'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import imagemin from 'gulp-imagemin'
import include from 'gulp-file-include'
import plumber from 'gulp-plumber'
import { resolve } from 'path'
import runSequence from 'run-sequence'
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import sourcemaps from 'gulp-sourcemaps'
import spritesmith from 'gulp.spritesmith'
import watch from 'gulp-watch'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config.babel'

const isProduction = process.env.NODE_ENV === 'production'
const server = browserSync.create()

/**
 * The development server.
 */
gulp.task('server', ['build'], done => {
  const bundler = webpack(webpackConfig)

  server.init({
    notify: false,
    logLevel: 'none',
    server: {
      baseDir: resolve(__dirname, 'dist'),
      middleware: [
        webpackDevMiddleware(bundler, webpackConfig.devServer),
        webpackHotMiddleware(bundler)
      ]
    }
  }, done)
})

/**
 * Webpack build stream.
 */
gulp.task('webpack', () => {
  return gulp.src(resolve(__dirname, 'src/js/app.js'))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(resolve(__dirname, 'dist/js')))
})

/**
 * Compile scss files into css files.
 */
gulp.task('styles', () => {
  return gulp.src(resolve(__dirname, 'src/scss/**/*.scss'))
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(gulpIf(isProduction, sourcemaps.init()))
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(combineMQ())
    .pipe(gulpIf(isProduction, cssnano()))
    .pipe(gulpIf(isProduction, sourcemaps.write('./')))
    .pipe(gulp.dest(resolve(__dirname, 'dist/css')))
    .pipe(server.stream())
})

/**
 * Render html files and copy into dist on build.
 */
gulp.task('html', () => {
  return gulp.src(resolve(__dirname, 'src/**/*.html'))
    .pipe(plumber())
    .pipe(include({
      prefix: '@@',
      basepath: resolve(__dirname, 'src')
    }))
    .pipe(gulp.dest(resolve(__dirname, 'dist')))
    .pipe(server.stream({ reload: true }))
})

/**
 * Minify and copy our images into dist on build.
 */
gulp.task('images', () => {
  return gulp.src([
      resolve(__dirname, 'src/img/**'),
      `!${resolve(__dirname, 'src/img/sprites{,/**}')}`
    ])
    .pipe(plumber())
    .pipe(gulpIf(isProduction, imagemin()))
    .pipe(gulp.dest(resolve(__dirname, 'dist/img')))
    .pipe(server.stream())
})

/**
 * Creates a spritesheet from our img/sprites folder.
 */
gulp.task('sprite', () => {
  return gulp.src(resolve(__dirname, 'src/img/sprites/**/*'))
    .pipe(plumber())
    .pipe(spritesmith({
      imgName: 'img/sprite.png',
      cssName: 'scss/_sprite.scss'
    }))
    .pipe(gulp.dest(resolve(__dirname, 'src')))
    .pipe(server.stream())
})

/**
 * Copy font files into dist on build.
 */
gulp.task('fonts', () => {
  return gulp.src([
      resolve(__dirname, 'src/fonts/**/*.{woff,woff2,eot,ttf,otf,svg}'),
      resolve(__dirname, 'node_modules/font-awesome/fonts/**/*.{woff,woff2,eot,ttf,otf,svg}')
    ])
    .pipe(plumber())
    .pipe(gulp.dest(resolve(__dirname, 'dist/fonts')))
    .pipe(server.stream())
})

/**
 * Clean our dist folder before building.
 */
gulp.task('clean', () => del([resolve(__dirname, 'dist')], {
  force: true
}))

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
gulp.task('watch', () => {
  watch(resolve(__dirname, 'src/scss/**/*.scss'), () => gulp.start('styles'))
  watch(resolve(__dirname, 'src/**/*.html'), () => gulp.start('html'))
  watch(resolve(__dirname, 'src/img/**'), () => gulp.start('images'))
  watch(resolve(__dirname, 'src/img/sprites/**/*'), () => gulp.start('sprite'))
  watch([
    resolve(__dirname, 'src/fonts/**/*.{woff,woff2,eot,ttf,otf,svg}'),
    resolve(__dirname, 'node_modules/font-awesome/fonts/**/*.{woff,woff2,eot,ttf,otf,svg}')
  ], () => gulp.start('fonts'))
})

/**
 * Bumps the semver patch up by 1
 */
gulp.task('patch', () => {
  return gulp.src(resolve(__dirname, 'package.json'))
    .pipe(bump({ type: 'patch' }))
    .pipe(gulp.dest(resolve(__dirname)))
})

/**
 * Bumps the semver minor up by 1
 */
gulp.task('minor', () => {
  return gulp.src(resolve(__dirname, 'package.json'))
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest(resolve(__dirname)))
})

/**
 * Bumps the semver major up by 1
 */
gulp.task('major', () => {
  return gulp.src(resolve(__dirname, 'package.json'))
    .pipe(bump({ type: 'major' }))
    .pipe(gulp.dest(resolve(__dirname)))
})

/**
 * Dist folder build without cleaning.
 *
 * Note: Webpack is handled by the dev middleware. We don't need to run the task now.
 */
gulp.task('build', done => runSequence('sprite', ['styles', 'images', 'html', 'fonts'], done))

/**
 * Clean dist folder build
 */
gulp.task('dist', done => runSequence('clean', 'build', 'webpack', done))

/**
 * Default Task
 */
gulp.task('default', done => runSequence('server', 'watch', done))
