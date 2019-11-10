const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index-bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|less)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use:  [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader?name=./fonts/[name].[ext]'
                    }
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]

};