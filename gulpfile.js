var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['clean', 'copy', 'babelify', 'start'], () => {
  
});

gulp.task('copy', ['clean'], () => {
  return gulp.src(['src/**/*.html' ,'src/**/*.css'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('babelify', ['clean'], () => {
  return gulp.src('src/**/*.js')
    .pipe(babel( { presets: ['es2015'] }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', () => {
  return gulp.src('dist/', { read: false })
    .pipe(clean());
});

gulp.task('start', ['clean', 'copy', 'babelify'], () => {
  nodemon({
    script: 'dist/server.js',
    ignore: ['dist'],
    tasks: ['clean', 'copy', 'babelify']
  });
})