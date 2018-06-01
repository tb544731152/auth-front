
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