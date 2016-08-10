"use strict";
/**
 * Created by Jan on 6.8.2016.
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack');
const WebpackDevserver = require('webpack-dev-server');

const config = {
  webpackConfig: "./webpack.config.js"
};

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