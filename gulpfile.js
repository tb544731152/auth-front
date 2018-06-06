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
var browsersync = require('browser-sync').create();   // 静态服务器
var reload = browsersync.reload;


var buildBasePath = 'src/';//构建输出的目录
var outPath="dist/";
//执行前最好执行 gulp clean   在执行 gulp
//执行完成后 执行 gulp concat-js gulp concat-css    gulp rev
gulp.task('default',['serve'])

gulp.task('dev', function() {
    // [] 中任务是并行的，其他按照先后顺序执行
    sequence('uglify-js','minify-css','copyimg','html');
})

gulp.task('serve', function() {
    browsersync.init({
        port: 8080,
        server: {
            baseDir: ['./assert'],
            open: 'external',// 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
            injectChanges: true // 注入CSS改变
        }
    });
    //js监控
    gulp.watch('assert/js/**/*.js', ['uglify-js']).on('change', reload);;
    //监控css
    gulp.watch('assert/css/**/*.css',['minify-css']).on('change', reload);
    //监控图片
    gulp.watch('assert/images/*',['copyimg']).on('change', reload);
    //html监控
    gulp.watch('assert/*.html', ['html']).on('change', reload);
});
// 语法检查
gulp.task('jshint', function () {
    gulp.src('assert/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//cssmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('concat-css', function() {                        //- 创建一个名为 concat 的 task  
     gulp.src(buildBasePath+'/css/**/*.css')
    .pipe(rev())                              //- 文件名加MD5后缀
    .pipe(gulp.dest(outPath+'/css'))                //- 输出文件本地
    .pipe(rev.manifest())                     //- 生成一个rev-manifest.json
    .pipe(gulp.dest('./rev/css/'));                  //- 将 rev-manifest.json 保存到 rev 目录内
});
//jsmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('concat-js', function() {                        //- 创建一个名为 concat 的 task  
    gulp.src(buildBasePath+'/js/**/*.js')
   .pipe(rev())                              //- 文件名加MD5后缀
   .pipe(gulp.dest(outPath+"/js"))                //- 输出文件本地
   .pipe(rev.manifest())                     //- 生成一个rev-manifest.json
   .pipe(gulp.dest('./rev/js/'));                  //- 将 rev-manifest.json 保存到 rev 目录内
});
//压缩js
gulp.task('uglify-js',function(){
    gulp.src(['assert/js/*.js'])
    .pipe(uglify())
    .on('error', function (err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest(buildBasePath+'/js/'))
    .pipe(gulp.dest(outPath+'/js/'));
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
    .pipe(gulp.dest(outPath+'/css/'));
})
//监控css
gulp.task('minify-css-watch',function(){
    gulp.watch('assert/css/**/*.css',['minify-css'])
})
//拷贝图片
gulp.task('copyimg',  function() {
    //如果下面执行了md5资源文件img，那么这步可以省略
    gulp.src(['assert/images/**/*.png','assert/images/**/*.jpg'])
        .pipe(gulp.dest(buildBasePath+'images'))
        .pipe(gulp.dest(outPath+'images'));
});
//监控图片
gulp.task('copyimg-watch',function(){
    gulp.watch('assert/images/*',['copyimg'])
})
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
        .pipe(gulp.dest(buildBasePath))
        .pipe(gulp.dest(outPath));
});
//html监控
gulp.task('html-update', function () {
    gulp.watch('assert/*.html', ['html']);
});
//使用rev替换成md5文件名，这里包括html和css的资源文件也一起
gulp.task('rev', function() {
    //html，针对js,css,img
    gulp.src(['rev/**/*.json', outPath+'**/*.html'])
        .pipe(revCollector({replaceReved:true }))
        .pipe(gulp.dest(outPath));
});
gulp.task('revimg', function() {
    //css，主要是针对img替换
    gulp.src(['rev/**/rev-img-manifest.json', buildBasePath+'css/*.css'])
        .pipe(revCollector({replaceReved:true }))
        .pipe(gulp.dest(buildBasePath+'css'));
});
//删除Build文件
gulp.task('clean', function () {
    del([
        buildBasePath+'**/*',
        outPath+'**/*',
    ]);
})