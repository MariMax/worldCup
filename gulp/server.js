'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

function browserSyncInit(baseDir, files, browser, baseFile) {
  browser = browser === undefined ? 'default' : browser;
  baseFile = baseFile===undefined ? '/index.html':baseFile

  var routes = {};
  if(baseDir === 'src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1)) {
    routes = {
      // Should be '/bower_components': '../bower_components'
      // Waiting for https://github.com/shakyShane/browser-sync/issues/308
      '/bower_components': 'bower_components',
    };
  }

  routes['/mocks'] ='mocks';

  browserSync.instance = browserSync.init(files, {
    startPath: '/index.html',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser
  });

}

gulp.task('serve', ['build'], function () {
  browserSyncInit([
    'src'
  ], [
    'src/assets/images/**/*',
    'src/*.html',
    'src/app/**/*.html',
    'src/**/*.css'
  ]);
});