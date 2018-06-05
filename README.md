
1.安装node 自行安装

2. 更新 npm        npm install npm@latest -g

3.管理本地安装 npm 包的最好方式就是创建 package.json 文件。
一个 package.json 文件可以有以下几点作用：
作为一个描述文件，描述了你的项目依赖哪些包
允许我们使用 “语义化版本规则”（后面介绍）指明你项目依赖包的版本
让你的构建更好地与其他开发者分享，便于重复使用
package.json 如何创建
使用 npm init 即可在当前目录创建一个 package.json 文件：
如果嫌回答这一大堆问题麻烦，可以直接输入 npm init --yes 跳过回答问题步骤，直接生成默认值的 package.json 文件


4.安装模块
npm install browserify
npm install gulp
npm install run-sequence
npm install watchify

npm install -g bower 下载第三方依赖    

bower install  angular 

bower install  lodash
5.安装 gulp-uglify 对js进行压缩
npm install gulp-uglify
使用可上官网 https://www.npmjs.com/package/gulp-uglify

使用参考：
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
 
gulp.task('compress', function (cb) {
  pump([
        gulp.src('lib/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});
6.安装依赖 
cnpm install vinyl-source-stream 
cnpm install vinyl-buffer  
此处切换成淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org


7.css clean
cnpm install gulp-minify-css


8.
cnpm install  gulp-htmlmin
cnpm install  jshint
cnpm install  gulp-jshint
cnpm install  gulp-concat
cnpm install gulp-rev
cnpm install gulp-rev-collector
cnpm install gulp-remove-html
cnpm install gulp-remove-empty-lines
cnpm install gulp-replace
cnpm install  del


var htmlmin = require('gulp-htmlmin');//html压缩组件
var jshint = require('gulp-jshint');//js语法检查
var concat = require('gulp-concat');//多个文件合并为一个
var minifyCss = require('gulp-minify-css');//压缩CSS为一行；
var uglify = require('gulp-uglify');//js文件压缩
var del = require('del');//文件删除
var rev = require('gulp-rev');//对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');//路径替换
var gulpRemoveHtml = require('gulp-remove-html');//标签清除，参考：https://www.npmjs.com/package/gulp-remove-html
var removeEmptyLines = require('gulp-remove-empty-lines');//清除空白行，参考：https://www.npmjs.com/package/gulp-remove-empty-lines
var replace = require('gulp-replace');//文件名替换，参考：https://www.npmjs.com/package/gulp-replace

9..

BrowserSync
“Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。更重要的是 Browsersync可以同时在PC、平板、手机等设备下进项调试。您可以想象一下：“假设您的桌子上有pc、ipad、iphone、android等设备，同时打开了您需要调试的页面，当您使用browsersync后，您的任何一次代码保存，以上的设备都会同时显示您的改动”。无论您是前端还是后端工程师，使用它将提高您30%的工作效率。”

简单的说，BrowserSync就是搭建一个nodeJs服务器，监听指定文件，文件改动后，能够自动刷新所有设备的页面。开发时再也不用手动刷新页面啦，yeah~。


然后通过npm全局安装browserSync。
npm install -g browser-sync
browser-sync --version


恭喜你，安装成功啦。

输入一下命令就可以启动服务器啦，默认端口号为3000，如果默认端口号被占用，browserSync会寻找其他可用的端口号。当然，也可以通过--port指定端口号、

browser-sync start --server


10
请各位看下 为啥不能自动刷新页面
