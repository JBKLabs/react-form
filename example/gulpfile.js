const gulp = require('gulp');

const libSrc = () => gulp.src('../src/**/*', { base: '../src' })
  .pipe(gulp.dest('./node_modules/react-native-form/src'));

const libPkg = () => gulp.src('../package.json', { base: '../' })
  .pipe(gulp.dest('./node_modules/react-native-form'));

const watch = () => gulp.watch(['../src/**/*', '../package.json'], gulp.series(libSrc, libPkg));

exports.default = gulp.series(libSrc, libPkg, watch);