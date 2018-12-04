var gulp = require("gulp");

// can't find module 'gulp-xxxx'
// npm install xxx --save-dev
// gulp : 

var less = require("gulp-less");
var cleancss = require("gulp-clean-css");
var htmlmin = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var fileinclude = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');
var babel = require("gulp-babel");
var bs = require("browser-sync").create();

gulp.task("lessc", function(){
    gulp.src("src/less/*.less")
        .pipe( less() )
        .pipe( autoprefixer({
            browsers: ['last 2 versions']
        }) )
        .pipe( gulp.dest("dist/css") )
        .pipe( cleancss() )
        .pipe( rename({
            suffix: ".min"
        }) )
        .pipe( gulp.dest("dist/css") )
        .pipe( bs.reload({
            stream: true
        }) );
});

gulp.task("images", function(){
    gulp.src("src/images/*.{png,jpg,gif}")
        .pipe( cache(imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            // progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            // interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            // multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        })) )
        .pipe( gulp.dest("dist/images") );
});

gulp.task("scripts", function(){
    gulp.src("src/js/*.js")
        // .pipe( babel({
        //     presets: ['es2015']
        // }) )
        .pipe( uglify() )
        .pipe( gulp.dest("dist/js") );
});

gulp.task("html", function(){
    gulp.src(["src/**/*.html", "!src/temp/*"])
        .pipe( fileinclude({
            basepath: "src/temp"
        }) )
        .pipe( htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }) )
        .pipe(gulp.dest("dist"));
});

gulp.task("serve", function(){
    bs.init({
        server: {
            baseDir: 'dist'
        },
        startPath: "index.html"
    })
});

gulp.task("refresh", function(){
    bs.reload();
});

gulp.task("watch", function(){
    gulp.watch("src/**/*.html", ["html", "refresh"]);
    gulp.watch("src/less/*.less", ["lessc"]);
    gulp.watch("src/js/*.js", ["scripts", "refresh"]);
    gulp.watch("src/images/*", ["images", "refresh"]);
});

gulp.task("default", ["html", "lessc", "scripts", "images"], function(){
    gulp.run("serve", "watch");
});



