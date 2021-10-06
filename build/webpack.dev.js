const path = require('path');
module.exports = {//开发环境
  mode: 'development',
  devServer: {
    port: 4500,
    hot: true,
    compress: true,//gzip可以提升速度
    contentBase: path.resolve(__dirname, '..dist')//启动服务的目录
  }
};
