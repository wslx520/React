var webpack = require('webpack');
var path = require('path');
var src = 'source';
var dist = '/dist';
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// console.log(path.resolve(src, 'index.js'), './source/index.js');
module.exports = {
  // entry: './js/entry.js',
  entry: {
    // 名字可以含路径，以用来将打包后的文件放入不同的路径
    'js/index': [
        path.resolve(src, 'index.js') // Your appʼs entry point
    ],
    'js/detail': [
        path.resolve(src, 'detail/detail.jsx') // Your appʼs entry point
    ],
  },
  output: {
    path: __dirname + dist,
    filename: '[name].js',
    publicPath: ''
  },
  module: {
    loaders: [
      { 
        test: /\.css$/,
        // 如果写成这种，则.css文件不会被提取为独立文件
        // loader: 'style!css',
        // ExtractTextPlugin.extract 的第一个参数是指定不提取的loader
        loader: ExtractTextPlugin.extract('style', ['css'])
    },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader', {
            // 不知有什么用
            publicPath: './'
        }) },
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel?' + JSON.stringify({
        presets: ['es2015', 'react', 'stage-0']
      })], exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My React App',
      filename: 'index.html',
      template: src + '/index.html',
      chunks: ['js/vendors', 'js/mainifest', 'js/index']
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: src + '/detail/detail.html',
      chunks: ['js/vendors', 'js/mainifest', 'js/detail']
    }),
    new webpack.optimize.CommonsChunkPlugin({
        // 要与entry中的名字匹配
      names: ['js/vendors', 'js/mainifest']
    }),
    new ExtractTextPlugin("css/[name].css", {
        // allChunks: true
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.NoErrorsPlugin()
  ]
};