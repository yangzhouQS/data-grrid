const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    dataGrid: './demo/_main'
    // dataGrid: './src/main'
  },
  output: {
    filename: 'dataGrid.js',
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: false,
    /* minimizer: [
       new TerserPlugin({ extractComments: false }),
       new OptimizeCSSAssetsPlugin({
         cssProcessorOptions: {
           map: {
             inline: false
           }
         }
       })
     ]*/
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@': resolve('src/js')
    }
  },
  devServer: {
    // open: true,
    hot: true,
    host: 'localhost',
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      // /* {
      //    test: /\.(ts|js)x?$/,
      //    exclude: /(node_modules|bower_components)/,
      //    use: {
      //      loader: 'babel-loader'
      //    }
      //  },*/
      {
        test: /\.(sa|sc|c|pcss)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    }),
    new HtmlWebpackPlugin({
      template: resolve('./public/index.html'),
      filename: 'index.html'
    })
  ]
};
