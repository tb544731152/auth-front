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