'use strict';

global.$ = {
    gulp: require('gulp'),
    del: require('del'),
    gp: require('gulp-load-plugins')(),
    strip: require('gulp-strip-comments'),

    path: {
        tasks: require('./gulp/config/tasks.js')
    }
}

$.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    $.gulp.parallel('html', 'scss', 'js'),
    $.gulp.parallel('watch')
));
