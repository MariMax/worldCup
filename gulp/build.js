'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulpNgConfig = require('gulp-ng-config');
var argv = require('yargs').argv;


var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'gulpNgConfig']
});

gulp.task('scripts', function() {
    return gulp.src('src/app/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size());
});

gulp.task('setConfig',['removeConfig'], function(){
  gulp.src(argv.dev === 1 ? 'devConfig.json' : 'distConfig.json')
    .pipe(gulpNgConfig('configModule'))
    .pipe(gulp.dest('src/app/config'))
});

gulp.task('removeConfig', function(done){
  $.del(['src/app/config'], done);
});

gulp.task('partials', function() {
    return gulp.src('src/app/**/*.html')
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.ngHtml2js({
            moduleName: 'worldCup',
            prefix: 'app/'
        }))
        .pipe(gulp.dest('.tmp'))
        .pipe($.size());
});

gulp.task('html', ['injects', 'scripts', 'partials'], function() {
    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src('src/*.html')
        .pipe($.inject(gulp.src('.tmp/**/*.js'), {
            read: false,
            starttag: '<!-- inject:partials -->',
            addRootSlash: false,
            addPrefix: '../'
        }))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify({
            preserveComments: $.uglifySaveLicense
        }))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

        // .pipe($.cache($.imagemin({
        //     optimizationLevel: 3,
        //     progressive: true,
        //     interlaced: true
        // })))
gulp.task('images', function() {
    return gulp.src('src/assets/images/**/*')
        .pipe(gulp.dest('dist/assets/images'))
        .pipe($.size());
});

gulp.task('fonts', function() {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('misc', function() {
    return gulp.src('src/**/*.ico')
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('clean', function(done) {
    $.del(['.tmp', 'dist', 'bower_components'], done);
});

gulp.task('build', ['bower'], function(done) {
    runSequence(['setConfig', 'html', 'images', 'fonts', 'misc'], done);
});
