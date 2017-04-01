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
  proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
      // 比如有接口服务器监听的是另一个端口，则可以在这儿代理一个出口，然后请求这个代理地址，就没有跨域问题了
      // 比如，代理前：ajax('http://localhost:3000/data')，代理后：ajax('/api/data')
      // 虽然接口服务器也可以通过设置跨域头解决跨域访问，但代理了还是可以减少url长度
  },
  historyApiFallback: true
}).listen(3000, '0.0.0.0', function (err, result) {
  // 0.0.0.0 可以适配 localhost, 127.0.0.1, 172.16.1.* 等多种情况
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
