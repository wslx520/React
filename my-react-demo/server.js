var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
// console.log(__dirname + '/dist/');
new WebpackDevServer(webpack(config), {
  publicPath: '',
  // publicPath: path.resolve(__dirname, 'dist'),
  // contentBase 即服务器根目录。比如有引用非webpack打包产生的文件，则会以此目录为根目录进行相关路径的定位
  contentBase: './dist',
  hot: true,
  historyApiFallback: true
}).listen(3000, '0.0.0.0', function (err, result) {
  // 0.0.0.0 可以适配 localhost, 127.0.0.1, 172.16.1.* 等多种情况
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
