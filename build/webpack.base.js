const path = require('path');
const resolve = (filePath) => path.resolve(__dirname, path.resolve(filePath));
const dev = require('./webpack.dev'); // 开发环境配置
const prod = require('./webpack.pro'); // 生产环境配置
//webpack合并模块
const merge = require('webpack-merge');

// 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = (env) => {
  let isDev = env.development;
  const base = {
    entry: {
      main: path.resolve(__dirname, '../src/main.js'),
      index: path.resolve(__dirname, '../src/index.js')
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, '../dist')
    },
    module: {
      // loader写法 ： ‘字符串’ [多个loader] {配置传递参数}
      rules: [
        {
          test: /\.css/, use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader, {//林肯方式引入css文件
              loader: 'css-loader',
              options: {//在 .css文件导入 其他的css类型文件，需要指定其他的loader解析
                importLoaders: 2// 后面的一个loader先处理
              }
            }, 'sass-loader', 'postcss-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          }, 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.styl$/,
          use: ['style-loader', 'css-loader', 'stylus-loader']
        },

        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')({
                browsers: ['last 2 version', '>1%', 'ios 7']
              })
            ]
          }
        },
        // 图片和音频、视频、字体图标处理
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'file-loader', // 默认是拷贝文件的功能
          options: { // 配置
            name: '[name].[hash:5].[ext]', // 以源文件名字及格式输出
            outputPath: 'img/' // 输出到img文件夹下
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            options: { // 配置
              name: '[name].[ext]', // 以源文件名字及格式输出
              outputPath: 'images/', // 输出到images文件夹下
              limit: 1024000 // 超过10kb打包为图片
            }
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000000,
            name: '[name].[hash:5].[ext]', // 以源文件名字及格式输出
            outputPath: 'img/' // 输出到img文件夹下
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.resolve(__dirname, 'fonts/[name].[hash:7].[ext]')
          }
        }
      ].filter(Boolean)
    },
    plugins: [

      // 不是开发的情况下才进行样式文件的抽离
      // 最后的filter：当为开发的时候为false，会过滤不吧false写入当前的配置文件
      !isDev && new MiniCssExtractPlugin({// 开发的模式不进行抽离样式文件
        filename: 'css/[name].css'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html',
        /*
        * true 默认值，script标签位于html文件的 body 底部
        * body script标签位于html文件的 body 底部
        * head script标签位于html文件的 head中
        * false 不插入生成的js文件，这个几乎不会用到的
        * */
        inject: 'head',

        // 使用minify会对生成的html文件进行压缩。默认是false。
        minify: !isDev && {//生产环境进行的操作
          removeAttributeQuotes: true,//取掉双引号
          collapseWhitespace: true// html压缩为一行
        },
        /*
        * chunks
        * chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
        * */
        chunks: ['index', 'main']
        /*
        * chunksSortMode
        *
        * script的顺序，默认四个选项： none auto dependency {function}
        * 'dependency' 不用说，按照不同文件的依赖关系来排序。
        * 'auto' 默认值，插件的内置的排序方式，具体顺序....
        * 'none' 无序？
        * */
      })

    ].filter(Boolean)
  };

  if (isDev) {// 开发环境
    return merge(base, dev);
  } else { // 生产环境
    return merge(base, prod);
  }
};

