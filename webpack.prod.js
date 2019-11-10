const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.js');
const merge = require('webpack-merge');

module.exports = merge(common,{
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(['mobile']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true,
            cache: true,
            extractComments: true,
            terserOptions: {
                ecma: 5,
                ie8: false,
                safari10: true,
                compress: true,
                warnings: true,
            },
        })],
    }
});