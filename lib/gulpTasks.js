'use strict';

// Load deps
var gulp        = require('gulp');
var concat      = require('gulp-concat');
var tar         = require('gulp-tar');
var gzip        = require('gulp-gzip');
var cleanCSS    = require('gulp-clean-css');
var uuid        = require('node-uuid');
var rename      = require("gulp-rename");
var ttf2woff    = require('gulp-ttf2woff');
var git         = require('git-rev');
var finish      = require('gulp-finish');
var yaml        = require('gulp-yaml');
var watch       = require('gulp-watch');
var browserSync = require('browser-sync');
var useref      = require('gulp-useref');

// AWS
var awsConfig = {
  accessKeyId: "foo",
  secretAccessKey: "bar"
};

// s3
var s3 = require('gulp-s3-upload')(awsConfig);

//
var gulpTasks = function(task, distDir, callback) {

  //
  gulp.task('build-html', function() {
    return gulp.src([
      'client/index.html',
      'client/favicon.ico'
    ]).pipe(useref())
      .pipe(gulp.dest(distDir))
  });

  //
  gulp.task('build-fonts', function() {
    return gulp.src(['fonts/*'])
      // .pipe(ttf2woff())
      .pipe(gulp.dest(distDir + '/fonts'));
  });

  // Build
  gulp.task('build', [ 'build-html', 'build-fonts' ], function() {});

  // Zip
  gulp.task('zip', [ 'build' ], function() {
    return gulp.src(distDir + '/**/*')
      .pipe(tar('package.tar'))
      .pipe(gzip())
      .pipe(gulp.dest(distDir));
  });

  // Make a release of the view-client, zip, and put in s3
  gulp.task('release', [ 'zip' ], function() {
    var releaseID = uuid.v4();
    return gulp.src(distDir + '/**/*')
      .pipe(s3({
        Bucket: 'foo-bucket-name',
        ACL: 'public-read',
        keyTransform(relativeFilename) {
          var filename = releaseID + '/' + relativeFilename
          return filename;
        }
      }))
      .on('end', function() {
        callback(releaseID)
      });
  });

  // Server, watches all files in app
  gulp.task('server', ['build'], function () {
    browserSync({
      open: false,
      server: {
        baseDir: 'dist'
      }
    });

    watch('client/**/*', function(done) {
      gulp.start('build', browserSync.reload);
    });
  });

  //
  gulp.start(task);
}

exports = module.exports = gulpTasks;
