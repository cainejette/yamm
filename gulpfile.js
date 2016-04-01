var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec

gulp.task('default', ['clean', 'copy', 'babelify', 'dev'], () => {
  
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

gulp.task('dev', ['clean', 'copy', 'babelify'], () => {
  nodemon({
    script: 'dist/server.js',
    ignore: ['dist'],
    tasks: ['clean', 'copy', 'babelify']
  });
})

gulp.task('prod', ['clean', 'copy', 'babelify'], () => {

})