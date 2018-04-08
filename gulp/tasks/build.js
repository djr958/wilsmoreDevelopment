var gulp        = require('gulp'),
    imagemin    = require('gulp-imagemin'),         // Minimises images. 
    del         = require('del'),                   // Deletes files and folders. 
    usemin      = require('gulp-usemin'),           // Parses a file, finds the css and js file references. 
    rev         = require('gulp-rev'),              // Handles the build revisions. 
    cssnano     = require('gulp-cssnano'),          // Compresses the css files. 
    uglify      = require('gulp-uglify');           // Compresses the js files. 
    browserSync = require('browser-sync').create(); // Allows refreshing of website when HTML, CSS is changed (and a load more!)

gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "dist"
        }
    });

});

/*
    Deletes the dist folder so we get a clean build each time.
*/
gulp.task('deleteDistFolder', function() {
    return del('./dist');
});

/*
    Copies other files of importance (eg wordpress files if writing a wordpress website). Other
    than HTML, js, css and image files as these are catered for in other tasks.
    Shouldn't begin until the 'deleteDistFolder' has completed and removed everything.
*/
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**', 
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./dist'));
});

/*
    Compresses the image files and copy them to the dist folder.
    Shouldn't begin until the 'deleteDistFolder' has completed and removed everything as well
    as triggering a rebuild of the icon sprite.
*/
gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function() {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./dist/assets/images'));
});

/*
    The usemin plugin takes it's instructions from comments in the HTML file, for 
    example, '<!-- build:css /assets/styles/styles.css -->' and similar for js files.
    It compresses and revisions the bundled up css and js files and copies them 
    to the dist folder.
    Shouldn't begin until the 'deleteDistFolder' has completed and removed everything as well
    as the 'styles' task that generates a fresh copy of our css file, and the 'scripts' task that
    will generate a fresh copy of our js file (in styles.css and scripts.css respectively).
*/
gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function() {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function(){return rev()}, function(){return uglify()}]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);