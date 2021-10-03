const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const TerserJSPlugin = require('terser-webpack-plugin');//压缩js
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'production',

    // 优化项
    optimization: { //防止压缩方案
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin(),
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            // 清空匹配的路径
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist'), '**/*'],
        }),
    ],
};
