'use strict';

var gulp = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var ghPages = require('gulp-gh-pages');

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "src/*.html",
    "src/fonts/*.{woff,woff2}"
    ], {base: "./src/"})
    .pipe(gulp.dest("build"));
});

gulp.task("style", function () {
  return gulp.src("src/css/style.css")
    .pipe(postcss([ autoprefixer() ]))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
});

gulp.task("build", function (done) {
  run("clean", "copy", "style", done);
});
