var gulp = require('gulp');
var scss = require('gulp-sass');
var cssmin = require('gulp-clean-css');
var server = require('gulp-webserver');


//编译scss
gulp.task('scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(cssmin())
        .pipe(gulp.dest('./src/css'))
})

//监听
gulp.task('watch', function() {
    return gulp.watch('./src/scss/index.scss', gulp.series('scss'))
})

//起服务
gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 8083,
            livereload: true, //自动刷新
            open: true, //自动打来浏览器
            middleware: function(req, res, next) {
                res.end('12')
            }
        }))
})

gulp.task('dev', gulp.series('scss', 'server', 'watch'))