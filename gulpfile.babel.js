"use strict";
/**
 * Created by Jan on 6.8.2016.
 */

import _gulp from 'gulp';
import gulpHelp from 'gulp-help';
import eslint from 'gulp-eslint';
//const babel = require('gulp-babel');
//const webpack = require('webpack');
//const WebpackDevserver = require('webpack-dev-server');

const gulp = gulpHelp(_gulp);

const config = {
  src: 'source/**/*.jsx'
};

//const config = {
//  webpackConfig: "./webpack.config.js"
//};

//gulp.task('webpack-dev-server', () => {
//    const compiler = webpack({
//        entry: "./app.js",
//        output: {
//            path: "./",
//            filename: "bundle.js"
//        }
//    });
//
//    new WebpackDevserver(compiler, {
//        port: 9000
//    }).listen(8080, "localhost", (err) => {
//        if(err) throw new gutil.PluginError("webpack-dev-server", err);
//        // Server listening
//        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
//    })
//});

gulp.task('default', ['webpack-dev-server'], () => {
    return gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist'))
});

gulp.task('lint', 'run eslint on all the source files', () => {
  // Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(config.src)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint({ fix: true }))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});