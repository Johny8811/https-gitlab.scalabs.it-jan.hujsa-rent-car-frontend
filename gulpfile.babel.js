"use strict";
/**
 * Created by Jan on 6.8.2016.
 */

import _gulp from 'gulp';
import gulpHelp from 'gulp-help';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import webpack from 'webpack';
import WebpackDevserver from 'webpack-dev-server';
import webpackConfig from './webpack.config';

const gulp = gulpHelp(_gulp);

process.env.DEVELOPMENT_SERVER = 8080;

const config = {
  src: 'source/**/*.jsx'
};

gulp.task('webpack-dev-server', "start webpack develoment server on port 8080", () => {
  const compiler = webpack(webpackConfig);

  new WebpackDevserver(compiler,{
    historyApiFallback: true
  })
    .listen(process.env.DEVELOPMENT_SERVER, (err) => {
      if(err) console.log(err);
      // Server listening
      console.log(`Server listen on port ${process.env.DEVELOPMENT_SERVER}`);
  })
});

gulp.task('build-app', 'building the application', () => {
  webpack(webpackConfig, (err, stats) => {
    if (err) gutil.log("webpack", err);
    gutil.log(stats);
  });
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