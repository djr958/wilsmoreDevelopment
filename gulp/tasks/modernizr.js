var gulp        = require('gulp'),
    modernizr   = require('gulp-modernizr');        /* Checks browsers for all sorts of things, SVG, flexbox, opacity etc. The infomation will be added to the HTML tag (eg <HTML class="SVG">), so can be interrogated by js etc.*/

/*
    By virtue of the source files, modernizr determines what things to check for and 
    generates a small js file that does the work.
*/
gulp.task('modernizr', function() {
    return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
          .pipe(modernizr({
              'options': [
                  'setClasses'
              ]
          }))
          .pipe(gulp.dest('./app/temp/scripts/'));
});