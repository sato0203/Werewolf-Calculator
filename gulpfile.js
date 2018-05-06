const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const mocha = require("gulp-mocha");
const webserver = require('gulp-webserver');
const plumber = require("gulp-plumber");

gulp.task("react-compile", () => {
  return gulp.src(["./src/**/*.ts",".src/**/.tsx"])
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest("dist"))
});

gulp.task('watch', function() {
    return gulp.watch(["./src/**/*.ts","./src/**/*.tsx"], ['react-compile'])
  });
  
gulp.task('webserver', function() {
    return gulp.src('./')
        .pipe(webserver({
            host: '127.0.0.1',
            livereload: true
        })
    );
});

gulp.task('test',function(){
    gulp.src("./src/test/**/*.ts",{read:false})
    .pipe(plumber())
    .pipe(mocha({
        require:["espower-typescript/guess"]
    }))
});

gulp.task('default',['react-compile'])
gulp.task('develop', ['react-compile','watch','webserver']);