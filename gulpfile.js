// Load deps
var gulp = require('gulp');
var lib = require('./lib');

// Build the application into a dir
gulp.task('build', function() {
  lib.gulpTasks('build', 'dist', function(data) {
    console.log(data);
  });
});

// Serve the application from the build dir
gulp.task('server', function() {
  lib.gulpTasks('server', 'dist', function(data) {
    console.log(data);
  });
});

// Build, zip, and upload the application to s3
gulp.task('release', function() {
  lib.gulpTasks('release', 'dist', function(data) {
    console.log(data);
  });
});
