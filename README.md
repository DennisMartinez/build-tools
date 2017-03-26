# Build Tools
A starter kit using webpack 2 and gulp.

Note: The examples in this kit are using jQuery but are not concrete to the project.

## TODO:
1. Create a command to remove the boilerplate code.
2. Create a command to quickly scaffold the app (with different presets).

### Features
A list of features in this kit.

* Build Tools
  * Gulp ([gulp](http://gulpjs.com/))
    * Everything except javascript is handled with Gulp.
  * Webpack 2 ([webpack](https://webpack.js.org/))
    * Everything javascript related is handle with Webpack 2.
* Environment
  * BrowserSync ([browser-sync](https://www.npmjs.com/package/browser-sync))
    * Webpack Dev Middleware ([webpack-dev-middleware](https://www.npmjs.com/search?q=webpack-dev-middleware))
    * Webpack Hot Middleware ([webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware))
  * Docker (TODO) ([docker](https://www.docker.com/))
* Style Support
  * Sass/Scss ([gulp-sass](https://www.npmjs.com/package/gulp-sass))
  * Minification ([gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano))
  * Media Query Packer ([gulp-combine-mq](https://www.npmjs.com/package/gulp-combine-mq))
  * Globbing ([gulp-sass-glob](https://www.npmjs.com/package/gulp-sass-glob))
  * Sprites (Sprite Scss File) ([gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith))
  * Sourcemaps ([gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps))
* Script Support (Webpack 2)
  * ES2015+
  * Asynchronous Modules ([Code Splitting](https://webpack.js.org/guides/code-splitting-import/))
  * Tree Shaking ([Tree Shaking](https://webpack.js.org/guides/tree-shaking/#components/sidebar/sidebar.jsx))
  * Uglify (Production) ([uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin))
    * This comes with Webpack 2 ([Minification](https://webpack.js.org/guides/production-build/#minification))
  * Sourcemaps (devtool)
    * ([source-maps](https://webpack.js.org/guides/production-build/#source-maps))
    * ([devtool](https://webpack.js.org/configuration/devtool/))
  * Linting ([eslint](https://www.npmjs.com/package/eslint))
    * Webpack Loader ([eslint-loader](https://www.npmjs.com/package/eslint-loader))
    * Eslint Standard rules ([eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard))
    * Eslint Ignore Files ([Ignoring Files and Directories](http://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories))
  * Hot Module Replacement ([NEED SOURCE](#))
  * Common Chunks ([CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/))
  * Define Global Constants ([define-plugin](https://webpack.js.org/plugins/define-plugin/))
  * Stream (Dist) ([webpack-stream](https://www.npmjs.com/package/webpack-stream))
* Image Support
  * Minification ([gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin))
  * Sprites (Sprite Image File) ([gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith))
* Html Support
  * Includes ([gulp-file-include](https://www.npmjs.com/package/gulp-file-include))
* Font Support
  * Supported but no tooling, only copies from one folder to another.
* Unit Test Support
  * TODO: [Ava](https://www.npmjs.com/package/ava), Maybe?
* Utility Support
  * Semver Bumping ([gulp-bump](https://www.npmjs.com/package/gulp-bump))
  * Conditional Pipe Control ([gulp-if](https://www.npmjs.com/package/gulp-if))
  * Pipe Cleaner ([gulp-plumber](https://www.npmjs.com/package/gulp-plumber))
  * Sequential or Parallel Tasks ([run-sequence](https://www.npmjs.com/package/run-sequence))
  * Deleting Files ([del](https://www.npmjs.com/package/del))
  * Consistent Code Formatting Rules ([editorconfig](http://editorconfig.org/))

### Commands
TODO

### Gettings Started
TODO

#### Environments
TODO: https://www.docker.com/
docker network create bs
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -a -q)
docker volume rm $(docker volume ls -qf dangling=true)

#### Linting
TODO

#### API
TODO

### Unit test
TODO

### Benchmarking
TODO: Benchmark.js with graphs / platforms to show performance and any degradation over time.
