var gulp = require('gulp'),
    webpack = require('webpack');       /* Bundles js files (etc) so can see functions across js files. */

gulp.task('scripts', ['modernizr'], function (callback) {
    webpack(require('../../webpack.config.js'), function (err, stats) {
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});