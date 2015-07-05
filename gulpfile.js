var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');
var child_process = require('child_process');
var api_process = null;
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');

var PATHS = {
    src: {
      css: 'src/**/*.css',
      js: 'src/**/*.ts',
      html: 'src/**/*.html'
    },
    lib: [
      'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/systemjs/dist/system-csp-production.src.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/angular2/node_modules/zone.js/dist/zone.js',
      'node_modules/angular2/node_modules/zone.js/dist/long-stack-trace-zone.js'
    ]
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('bower', function() {
  gulp.src('bower_components/**/*')
    .pipe(gulp.dest('dist/bower_components'));

  return gulp.src('src/index.html')
    .pipe(inject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    return gulp.src(PATHS.src.js)
        .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(plumber())
        .pipe(traceur({
            modules: 'instantiate',
            moduleName: true,
            annotations: true,
            types: true,
            memberVariables: true
        }))
        .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  return gulp.src(PATHS.src.css)
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest('dist'));
});

gulp.task('libs', ['angular2'], function () {
    var size = require('gulp-size');
    return gulp.src(PATHS.lib)
      .pipe(size({showFiles: true, gzip: true}))
      .pipe(gulp.dest('dist/lib'));
});

gulp.task('angular2', function () {

  var buildConfig = {
    defaultJSExtensions: true,
    paths: {
      "angular2/*": "node_modules/angular2/es6/prod/*.js",
      "rx": "node_modules/angular2/node_modules/rx/dist/rx.js"
    },
    meta: {
      // auto-detection fails to detect properly
      'rx': {
        format: 'cjs' //https://github.com/systemjs/builder/issues/123
      }
    }
  };

  var Builder = require('systemjs-builder');
  var builder = new Builder(buildConfig);

  builder.build('angular2/router', 'dist/lib/router.js', {});
  builder.build('angular2/http', 'dist/lib/http.js', {});
  return builder.build('angular2/angular2', 'dist/lib/angular2.js', {});
});

gulp.task('play', ['default', 'api'], function () {
  var browserSync = require('browser-sync');
  var historyApiFallback = require('connect-history-api-fallback');

  browserSync.init(null, {
    server: {
      port: 9000,
      baseDir: __dirname + '/dist/',
      middleware: [historyApiFallback({
        //logger: console.log.bind(console)
      })]
    },
    files: [
      // full-page refresh on file changes
      //__dirname + '/dist/components/**/*',
      //__dirname + '/dist/*.{html,js}'
    ]
  });

  gulp.watch(PATHS.src.css, ['css'], browserSync.reload);
  gulp.watch(PATHS.src.html, ['html', 'bower'], browserSync.reload);
  gulp.watch(PATHS.src.js, ['js'], browserSync.reload);
  gulp.watch('api/**/*', ['api'], browserSync.reload);
});

gulp.task('api', function () {
  if (api_process) { api_process.kill('SIGHUP') }
  api_process = child_process.exec('./node_modules/dyson/bin/dyson.js api');
});

gulp.task('default', ['js', 'css', 'html', 'bower', 'libs']);
