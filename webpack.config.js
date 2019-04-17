const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        app: './react/index.js',
    },
    devtool: 'source-map', //source-map for prod
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './react/index.html',
            filename: './index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};