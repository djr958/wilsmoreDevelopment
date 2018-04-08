var gulp = require('gulp'),
    postcss = require('gulp-postcss'),              // Parses css and produces a prod-ready css file.
    autoprefixer = require('autoprefixer'),         // Parses css and adds vendor prefixes.
    cssvars = require('postcss-simple-vars'),       // Allows the use of variables in css file.
    nested = require('postcss-nested'),             // Allows nested css.
    cssImport = require('postcss-import'),          // Allows importing of css files into other css files.
    mixins = require('postcss-mixins'),             // Reusable code to make handling device sizes easier.
    hexrgba = require('postcss-hexrgba');           // Allows use of rgba($mainBlue, .3) rather than rgba(47, 85, 114, .3) in css.

gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
        .on('error', function (errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
});
