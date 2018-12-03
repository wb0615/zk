var gulp = require('gulp');
var scss = require('gulp-sass');
var cssmin = require('gulp-clean-css');
var server = require('gulp-webserver');
// var babel=require('gulp-babel')
var uglify = require('gulp-uglify')
var url = require('url');


//编译scss  并且压缩css
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
            open: true, //自动打开浏览器
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return res.end()
                }
                var pathname = url.parse(req.url).pathname;
                console.log(pathname)
                pathname = pathname === '/' ? 'index.html' : pathname;
                if (pathname === '/data') {
                    res.end(JSON.stringify({ code: 0 }))
                }
                next();
            }
        }))
})

//合并js  并且压缩js
gulp.task('bUglify', function() {
    return gulp.src(['./src/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./src/js'))
})

//默认default
gulp.task('default', gulp.series('server', 'scss', 'bUglify', 'watch'))