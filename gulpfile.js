var gulp = require("gulp");
//var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");

//gulp.task("sass", function () {
//  return gulp.src("./sass/**/*.scss")
//    .pipe(sass())
//    .pipe(gulp.dest("css"));
//});

gulp.task("style", function () {
  return gulp.src("css/style.css")
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
});
