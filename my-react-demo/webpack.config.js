var webpack = require('webpack');
var path = require('path');
var src = 'source';
var dist = './dist';
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// console.log(path.resolve(src, 'index.js'), './source/index.js');
console.log(path.resolve(__dirname, dist));
module.exports = {
  // entry: './js/entry.js',
  // entry: {
  //   // 名字可以含路径，以用来将打包后的文件放入不同的路径
  //   'js/index': [
  //       path.resolve(src, 'index.js') // Your appʼs entry point
  //   ],
  //   'js/detail': [
  //       path.resolve(src, 'detail/detail.jsx') // Your appʼs entry point
  //   ],
  // },
  // webpack 2 支持 entry 是一个函数了。且这个函数可以返回一个 promise
  // 当 promise resolved之时，才会得到真正的 entry 
  entry () {
    return new Promise((resolve, reject) => {
      return resolve({
        'js/index': [
            path.resolve(src, 'index.js') // Your appʼs entry point
        ],
        'js/detail': [
            path.resolve(src, 'detail/detail.jsx') // Your appʼs entry point
        ]
      })
    })
  },
  output: {
    path: path.resolve(__dirname, dist),
    filename: '[name].js',
    publicPath: ''
  },
  module: {
    // loaders: [
    //   { 
    //     test: /\.css$/,
    //     // 如果写成这种，则.css文件不会被提取为独立文件
    //     // loader: 'style!css',
    //     // ExtractTextPlugin.extract 的第一个参数是指定不提取的loader
    //     loader: ExtractTextPlugin.extract('style', ['css'])
    // },
    //   { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader', {
    //         // 不知有什么用
    //         publicPath: './'
    //     }) },
    //   { test: /\.jsx?$/, loaders: ['react-hot', 'babel?' + JSON.stringify({
    //     presets: ['es2015', 'react', 'stage-0']
    //   })], exclude: /node_modules/ }
    // ]
    // webpack2 使用 rules 代替了 loaders，但还是兼容 loaders 
    rules: [
      {
        test: /\.css$/,
        // use: [ExtractTextPlugin.extract('style', ['css'])],
        // loader = 上面这句的简写
        // loader: ExtractTextPlugin.extract('style', ['css'])
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader', publicPath: './'})
      },
      { 
        test: /\.scss$/, loader: ExtractTextPlugin.extract({
          fallback: 'style-loader', 
          use: ['style-loader', 'css-loader', 'sass-loader']
        }) 
      },
      { 
        test: /\.jsx?$/, 
        // 这么写也是兼容的
        // loaders: ['react-hot-loader', 'babel-loader?' + JSON.stringify({
        //   presets: ['es2015', 'react', 'stage-0']
        // })], 
        // webpack2 不推荐使用 loaders ，请使用 use 代替
        use: [
          'react-hot-loader', 
          {
            loader: 'babel-loader',
            options: {
              // 如果这里设置了 preset 却没有安装对应的 preset，则会报
              // A common cause of this error is the presence of a configuration options object without the corresponding preset name
              presets: ['es2015', 'react', 'stage-0']
            }
          }
        ], 
        exclude: /node_modules/ 
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
    // webpack1
    // new ExtractTextPlugin("css/[name].css", {
    //     // allChunks: true
    // }),
    // webpack2
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.NoErrorsPlugin()
  ]
};