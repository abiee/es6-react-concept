
/* jshint node:true */
'use strict';

var karma = require('karma').server;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Lint Javascript
gulp.task('jshint', function () {
  return gulp.src([
      'app/scripts/**/*.js',
      'test/**/*.js',
      '!app/scripts/config.js',
      '!app/scripts/vendor/**/*.js'
  ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Compile JSX components
gulp.task('jsx', function() {
  return gulp.src('app/scripts/**/*.jsx')
    .pipe($.cached('jsx')) //Process only changed files
    .pipe($.react({es6module: true}))
    .pipe(gulp.dest('.tmp/scripts'));
});

// Optimize images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src([
    'app/{,styles/}fonts/**/*',
    'jspm_packages/github/twbs/bootstrap@*/fonts/**/*'
  ])
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
  return gulp.src('app/styles/main.css')
    .pipe($.sourcemaps.init())
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({ stream: true }));
});

// Scan your HTML for assets & optimize them
gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({ searchPath: ['.tmp', 'app', '.'] });

  return gulp.src('app/*.html')
    .pipe($.htmlReplace({ js: ['scripts/app.js' ] }))
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({ conditionals: true, loose: true })))
    .pipe(gulp.dest('dist'));
});

// Clean output directory and cached images
gulp.task('clean', function (callback) {
  var del = require('del');
  del(['.tmp', 'dist'], function () {
    $.cache.clearAll(callback);
  });
});

// Copy assets to distribution path
gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

// Transpile ES6 source files into JavaScript
gulp.task('transpile:app', function() {
  return gulp.src(['app/scripts/**/*.{js,jsx}'])
    .pipe($.babel())
    .pipe(gulp.dest('.tmp/scripts'));
});

// Bundle javascripts
gulp.task('bundle:app', function() {
  return gulp.src('')
    .pipe($.shell('jspm bundle-sfx .tmp/scripts/app dist/scripts/app.js --minify --skip-source-maps'));
});

// Run karma for development, will watch and reload
gulp.task('tdd', function(callback) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, callback);
});

// Run tests and report for ci
gulp.task('test', function(callback) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS2'],
    reporters: ['dots', 'junit'],
    junitReporter: {
      outputFile: '.tmp/test-results.xml',
    }
  }, callback);
});

// Run development server environmnet
gulp.task('serve', ['styles', 'jsx'], function () {
  browserSync({
    notify: false,
    port: 9000,
    ui: {
      port: 9001
    },
    server: {
      baseDir: ['app', '.tmp'],
      routes: {
        '/config.js': 'config.js',
        '/jspm_packages': 'jspm_packages'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/scripts/**/*.js',
    '.tmp/components/**/*.js',
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.css', ['styles']);
  gulp.watch('app/scripts/**/*.jsx', ['jsx']);
});

// Run web server on distribution files
gulp.task('serve:dist', function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

// Transpile, bundle and minify app files
gulp.task('build:app', function(callback) {
  var runSequence = require('run-sequence');
  runSequence('transpile:app',
              'bundle:app',
              callback);
});

// Build the project for distribution
gulp.task('build', ['jshint', 'build:app', 'html', 'images', 'fonts', 'extras'], function () {
  var size = $.size({title: 'build', gzip: true });
  return gulp.src('dist/**/*')
    .pipe(size)
    .pipe($.notify({
      onLast: true,
      title: 'Build complete',
      message: function() {
        return 'Total scripts size (gzip) ' + size.prettySize;
      }
    }));
});

// Clean all and build from scratch
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
