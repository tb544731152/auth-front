
1.安装node

2.更新 npm   
npm install npm@latest -g

3.管理本地安装 npm 包的最好方式就是创建 package.json 文件。
npm init

4.安装模块
有的源下载不下来 可以使用淘宝源
npm install -g cnpm --registry=https://registry.npm.taobao.org

npm install browserify
npm install gulp
npm install run-sequence
npm install watchify
npm install -g bower //下载第三方依赖    
bower install  angular 
bower install  lodash
npm install gulp-uglify  //对js进行压缩
cnpm install vinyl-source-stream 
cnpm install vinyl-buffer  
cnpm install gulp-minify-css //clean-css
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

npm install -g browser-sync //BrowserSync就是搭建一个nodeJs服务器，监听指定文件，文件改动后，能够自动刷新所有设备的页面。开发时再也不用手动刷新页面啦

//express 基于 Node.js 平台，快速、开放、极简的 web 开发框架。

cnpm install express --save

cnpm install --save-dev http-proxy-middleware

5.引入模块
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


6.Express 配置 app.js   //实现后端接口交互，ajax跨域问题
var express = require('express')
var proxy = require('http-proxy-middleware')
var app = express()

app.use('/api', proxy({
  target: 'http://127.0.0.1:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}))
app.use(express.static('dist'))

app.get('*', function (req, res) {
  res.sendfile('./dist/index.html')
})

app.listen(3333, function () {
  console.log('连接成功')
})


index.html 有ajax请求实例

7.项目执行命令
前端开发----执行如下命令就可以
gulp clean  //清除原有文件夹文件
gulp        //动态监控

node app.js //后台启动你们可以自行百度

上线后执行
gulp concat-js    //对比生成 js 更换md5文件 .json
gulp concat-css     //对比生成 css 更换md5文件 .json
gulp rev   //执行更换  解决页面样式缓存问题

里面存在一个问题，copy-css 和js 多拷贝的一份在dist下 使用的时候需要注意
