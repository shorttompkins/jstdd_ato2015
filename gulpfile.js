/* jshint node:true */
'use strict';

var gulp = require('gulp'),
    karma = require('gulp-karma');

gulp.task('default', function() {
  gulp.src(['node_modules/jquery/dist/jquery.js','src/js/**/*.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
