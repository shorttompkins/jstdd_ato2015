/* jshint node:true */
'use strict';

var gulp = require('gulp'),
    karma = require('gulp-karma');

gulp.task('test', function() {
  return gulp.src(['src/js/**/*.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('default', function() {
  gulp.src(['src/js/**/*.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
