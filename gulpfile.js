var gulp =require('gulp');
var htmlmin = require('gulp-htmlmin');//html压缩组件
var jshint = require('gulp-jshint');//js语法检查
var concat = require('gulp-concat');//多个文件合并为一个

var del = require('del');//文件删除
var gutil = require('gulp-util');
var rev = require('gulp-rev');//对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');//路径替换
var gulpRemoveHtml = require('gulp-remove-html');//标签清除，参考：
var removeEmptyLines = require('gulp-remove-empty-lines');//清除空白行，参考：https://www.npmjs.com/package/gulp-remove-empty-lines
var replace = require('gulp-replace');//文件名替换，参考：https://www.npmjs.com/package/gulp-replace
var concat = require('gulp-concat');    
var browserify =require('browserify');
var sequence =require('run-sequence');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gif=require('gulp-if');
var cleanCss =require('gulp-clean-css');
var fs =require('fs');
var isProduction = process.env.NODE_ENV  === 'prod';

var buildBasePath = 'src/';//构建输出的目录
var outPath="dist";
gulp.task('default',function(){
    //sequence('uglify-js','js-update','minify-css','minify-css-watch','copyimg','copyimg-watch','html','html-update');
    sequence('copy-img','copy-html','concat-js','concat-css','rev-css','rev-js');
})
// 语法检查
gulp.task('jshint', function () {
    gulp.src('assert/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 拷贝
gulp.task('copy-html',function(){
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
});
//拷贝图片
gulp.task('copy-img',  function() {
    //如果下面执行了md5资源文件img，那么这步可以省略
    gulp.src([buildBasePath+'images/**/*.png',buildBasePath+'images/**/*.jpg'])
        .pipe(gulp.dest(outPath+'/images'));
});
gulp.task('concat-css', function() {                        //- 创建一个名为 concat 的 task  
     gulp.src(buildBasePath+'/css/**/*.css')
    .pipe(rev())                              //- 文件名加MD5后缀
    .pipe(gulp.dest(outPath+'/css'))                //- 输出文件本地
    .pipe(rev.manifest())                     //- 生成一个rev-manifest.json
    .pipe(gulp.dest('./rev/css/'));                  //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('concat-js', function() {                        //- 创建一个名为 concat 的 task  
    gulp.src(buildBasePath+'/js/**/*.js')
   .pipe(rev())                              //- 文件名加MD5后缀
   .pipe(gulp.dest(outPath+"/js"))                //- 输出文件本地
   .pipe(rev.manifest())                     //- 生成一个rev-manifest.json
   .pipe(gulp.dest('./rev/js/'));                  //- 将 rev-manifest.json 保存到 rev 目录内
});
gulp.task('rev-css', function() {
    gulp.src(['./rev/css/*.json', './dist/*.html'])//- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    .pipe(revCollector())//- 执行文件内css名的替换
    .pipe(gulp.dest(outPath)); //- 替换后的文件输出的目录
});
gulp.task('rev-js', function() {
    gulp.src(['./rev/js/*.json', './dist/*.html'])//- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    .pipe(revCollector())//- 执行文件内css名的替换
    .pipe(gulp.dest(outPath)); //- 替换后的文件输出的目录
});
//压缩js
gulp.task('uglify-js',function(){
    gulp.src(['assert/js/*.js'])
    .pipe(uglify())
    .on('error', function (err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest(buildBasePath+'/js/'))
})
//js监控
gulp.task('js-update', function () {
    gulp.watch('assert/js/**/*.js', ['uglify-js']);
});
//缩小css
gulp.task('minify-css',function(){
    gulp.src('assert/css/**/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest(buildBasePath+'/css/'))
})
//监控css
gulp.task('minify-css-watch',function(){
    gulp.watch('assert/css/**/*.css',['minify-css'])
})
//拷贝图片
gulp.task('copyimg',  function() {
    //如果下面执行了md5资源文件img，那么这步可以省略
    gulp.src(['assert/images/**/*.png','assert/images/**/*.jpg'])
        .pipe(gulp.dest(buildBasePath+'images'));
});
//监控图片
gulp.task('copyimg-watch',function(){
    gulp.watch('assert/images/*',['copyimg'])
})
//jsmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('minifyjsmd5', function() {
    gulp.src('js/**/*.js')
        .pipe(concat('build.min.js'))//压缩后的js
        .pipe(uglify())//压缩js到一行
        .pipe(rev())//文件名加MD5后缀
        .pipe(gulp.dest(buildBasePath+'js'))//输出到js目录
        .pipe(rev.manifest('rev-js-manifest.json'))////生成一个rev-manifest.json
        .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
});
//cssmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('minifycssmd5', function (){
    gulp.src('css/**/*.css')
        .pipe(concat('build.min.css'))//压缩后的css
        .pipe(minifyCss())//压缩css到一样
        .pipe(rev())//文件名加MD5后缀
        .pipe(gulp.dest(buildBasePath+'css'))//输出到css目录
        .pipe(rev.manifest('rev-css-manifest.json'))//生成一个rev-manifest.json
        .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
});


//html压缩
gulp.task('html',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: false,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('assert/**/*.html')
        .pipe(gulpRemoveHtml())//清除特定标签
        .pipe(removeEmptyLines({removeComments: true}))//清除空白行
        .pipe(htmlmin(options))
        .pipe(gulp.dest(buildBasePath));
});
//html监控
gulp.task('html-update', function () {
    gulp.watch('assert/*.html', ['html']);
});
//生产使用，替换文件名，common.js替换为build.min.js
gulp.task('replacejs', function(){
    gulp.src([buildBasePath+'*.html'])
        .pipe(replace('common.js', 'build.min.js'))
        .pipe(gulp.dest(buildBasePath));
});
//生产使用，替换文件名，common.css替换为build.min.css
gulp.task('replacecss', function(){
    gulp.src([buildBasePath+'*.html'])
        .pipe(replace('common.css', 'build.min.css'))
        .pipe(gulp.dest(buildBasePath));
});
//开发使用，替换文件名，common.js替换为build.js
gulp.task('replacejsdev', function(){
    gulp.src([buildBasePath+'*.html'])
        .pipe(replace('common.js', 'build.js'))
        .pipe(gulp.dest(buildBasePath));
});
//开发使用，替换文件名，common.css替换为build.css
gulp.task('replacecssdev', function(){
    gulp.src([buildBasePath+'*.html'])
        .pipe(replace('common.css', 'build.css'))
        .pipe(gulp.dest(buildBasePath));
});

//使用rev替换成md5文件名，这里包括html和css的资源文件也一起
gulp.task('rev', function() {
    //html，针对js,css,img
    gulp.src(['rev/**/*.json', buildBasePath+'**/*.html'])
        .pipe(revCollector({replaceReved:true }))
        .pipe(gulp.dest(buildBasePath));
});
gulp.task('revimg', function() {
    //css，主要是针对img替换
    gulp.src(['rev/**/rev-img-manifest.json', buildBasePath+'css/*.css'])
        .pipe(revCollector({replaceReved:true }))
        .pipe(gulp.dest(buildBasePath+'css'));
});



//imgmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('minifyimgmd5', function (){
    gulp.src(['img/**/*.jpg','img/**/*.png'])
        .pipe(rev())//文件名加MD5后缀
        .pipe(gulp.dest(buildBasePath+'img'))//输出到css目录
        .pipe(rev.manifest('rev-img-manifest.json'))//生成一个rev-manifest.json
        .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
});

//删除Build文件
gulp.task('clean', function () {
    del([
        buildBasePath+'**/*',
    ]);
})