'use strict';

var gulp = require("gulp");
var del = require("del");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var ghPages = require('gulp-gh-pages');

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "assets/*.html",
    "assets/fonts/*.{woff,woff2}"
    ], {base: "./assets/"})
    .pipe(gulp.dest("build"));
});

gulp.task("style", function () {
  return gulp.src("assets/css/style.css")
    .pipe(postcss([ autoprefixer() ]))
    .pipe(minify())
    /*.pipe(rename("style.min.css"))*/
    .pipe(gulp.dest("build/css"))
});

gulp.task("images", function () {
  return gulp.src("assets/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
      ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("default", gulp.series(
  "clean", "copy",
  gulp.parallel("style", "images"))
);
