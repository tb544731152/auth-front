var gulp =require('gulp');
var browserify =require('browserify');
var sequence =require('run-sequence');
var watchify = require('watchify');
var fs =require('fs');
gulp.task('default',function(){
    sequence('mainjs','vendorjs');
});
gulp.task('mainjs',function(){
    var b =browserify({
        entries: ['assert/js/world_index.js'],
        cache:{},
        packageCache:{},
        plugin:[watchify]

    });
    var bundle =function(){
        b.bundle().pipe(fs.createWriteStream('js/main.js'));
    }
    bundle();
    b.on('update',bundle);
})
gulp.task('vendorjs',function(){
    var b =browserify().require('./bower_components/jquery/jquery.js',{
        expose: 'jquery' 
    }).bundle().pipe(fs.createWriteStream('js/main.js'))
})
