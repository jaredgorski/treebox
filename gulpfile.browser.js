const gulp = require('gulp');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const strip = require('gulp-strip-comments');
const terser = require('gulp-terser');

gulp.task('build', function(done) {
  gulp.src(__dirname + '/lib/**/*.js')
    .pipe(replace(/\/\* NOBROWSER_START \*\/[\s\S]*?\/\* NOBROWSER_END \*\//g, ' '))
    .pipe(replace(/class TreeBox/g, 'export default class TreeBox'))
    .pipe(strip())
    .pipe(replace(/module\.exports(.*)/g, ''))
    .pipe(terser())
    .pipe(concat('index.browser.js'))
    .pipe(gulp.dest(__dirname + '/dist/'))
  done();
});

gulp.task('default', gulp.parallel('build'));
