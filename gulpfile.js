'use strict';

var gulp = require('gulp');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssmin = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var browserSync = require("browser-sync").create();

gulp.task('clean', function () {
  return del(['*.html', 'css', 'img', 'fonts']);
});

gulp.task('copy', function () {
  return gulp.src('assets/fonts/*.{woff,woff2}', {base: './assets/'})
    .pipe(gulp.dest('./'));
});

gulp.task('image', function () {
  return gulp.src('assets/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
      ]))
    .pipe(gulp.dest('./img'));
});

gulp.task('html', function() {
  return gulp.src('assets/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});

gulp.task('style', function () {
  return gulp.src('assets/css/*.css')
    .pipe(concat('style.css'))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(cssmin())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./css'))
});

gulp.task('watch', function() {
  gulp.watch('assets/**/*.css', gulp.series('style'));
  gulp.watch('assets/*.html', gulp.series('html'));
  gulp.watch('assets/img/**/*.{png,jpg,svg}', gulp.series('image'));
  gulp.watch('assets/**/*.*', gulp.series('copy'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: '.'
  });
  browserSync.watch('./**/*.*').on('change', browserSync.reload);
});

gulp.task('build',
  gulp.series('clean',
  gulp.parallel('copy', 'image', 'html', 'style'))
);

gulp.task('default',
  gulp.series('build',
  gulp.parallel('watch', 'serve'))
);
