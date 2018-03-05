'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    rename = require('gulp-rename'),
    cache = require('gulp-cache'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp
        .src('dev/sass/**/*.sass')
        .pipe(sass({
            includePaths: [
            ]
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('css'))
        .pipe(cleanCSS({level: 2}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));
});

gulp.task('scripts', function () {
    return gulp.src('dev/js/**/*.js')
        .pipe(gulp.dest('js'))
        .pipe(
            minify({
                ext: {
                    min: '.min.js'
                },
                noSource: true
            })
        )
        .pipe(gulp.dest('js'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
});


gulp.task('watch', ['sass', 'scripts'], function () {
    gulp.watch('css/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['scripts']);
});
gulp.task('default', ['watch']);
