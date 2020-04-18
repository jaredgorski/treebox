var gulp = require('gulp');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var strip = require('gulp-strip-comments');

gulp.task('build', function(done) {
  gulp.src(__dirname + '/lib/**/*.js')
    .pipe(replace(/\/\* NOBROWSER_START \*\/[\s\S]*?\/\* NOBROWSER_END \*\//g, ' '))
    .pipe(replace(/class TreeBox/g, 'export default class TreeBox'))
    .pipe(strip())
    .pipe(replace(/module\.exports(.*)/g, ''))
    .pipe(replace(/var {?[\s\S]*}? = require\((.*)\);/g, ''))
    .pipe(replace(/(\r|\n)/g, ' '))
    .pipe(replace(/  /g, ' '))
    .pipe(replace(/  /g, ' '))
    .pipe(replace(/  /g, ' '))
    .pipe(replace(/  /g, ' '))
    .pipe(replace(/  /g, ' '))
    .pipe(concat('index.browser.js'))
    .pipe(gulp.dest(__dirname + '/dist/'))
  done();
});

gulp.task('default', gulp.parallel('build'));
