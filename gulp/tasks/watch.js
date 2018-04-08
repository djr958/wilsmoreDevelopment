var gulp = require('gulp'),
    watch = require('gulp-watch'),                  // Watches for changes to files.
    browserSync = require('browser-sync').create(); // Allows refreshing of website when HTML, CSS is changed (and a load more!)

gulp.task('watch', function () {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.html', function () {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function () {
        gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', function () {
        gulp.start('scriptsRefresh');
    });

});

gulp.task('cssInject', ['styles'], function () {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function () {
    browserSync.reload()
});