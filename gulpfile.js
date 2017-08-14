var gulp = require('gulp');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var minifyCSS = require('gulp-minify-css');

gulp.task('scripts', function() {
    gulp.src([
      './public/assets/javascripts/vendor/jquery.js',
      './public/assets/javascripts/vendor/typeahead.js',
      './public/assets/javascripts/vendor/angular.js',
      './public/assets/javascripts/vendor/animate.js',
      './public/assets/javascripts/vendor/upload.js',
      './public/assets/javascripts/vendor/angular-route.js',
      './public/assets/javascripts/vendor/analytics.js',
      './public/assets/javascripts/vendor/analytics-google.js',
      './public/assets/javascripts/vendor/viewhead.js',
      './public/assets/javascripts/app.js',
      './public/assets/javascripts/routes.js',
      './public/assets/javascripts/factories/**/*.js',
      './public/assets/javascripts/controllers/**/*.js',
      './public/assets/javascripts/directives/**/*.js',
      './public/assets/javascripts/filters/**/*.js',
      './public/assets/javascripts/directives/**/*.js',
      './public/assets/javascripts/vendor/handlebars.js',
      './public/assets/javascripts/vendor/g-analytics.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/assets/dist'));
});

gulp.task('styles', function() {
    gulp.src('./public/assets/stylesheets/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/assets/dist'));
});

gulp.watch('./public/assets/javascripts/**/*.js', ['scripts']);

gulp.watch('./public/assets/stylesheets/**/*.css', ['styles']);
