var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');

gulp.task('clean', function(){
	return gulp.src('dist/')
	.pipe(clean());
});
gulp.task('jshint', function(){
	return gulp.src("js/**/*.js")
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('uglify', function(){
	return gulp.src("js/**/*.js")
	.pipe(uglify())
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('dist/js'));	
});

gulp.task('default', function(cb){
	return runSequence('clean', ['jshint', 'uglify'], cb);
});
