const path = require('path');
//const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
//const WebpackCustom = require('./webpack-custom');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const folderPath = path.resolve(__dirname, './src/');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',               // your main app entry
        'service-worker': './src/service-worker.js' // service worker entry
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: [
            path.resolve(__dirname, 'public'), // manifest + icons
            path.resolve(__dirname, 'dist')    // bundles
        ],
        /*
        devMiddleware: {
            writeToDisk: true
        }
        */
        hot: false,
        liveReload: false,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/static/index.html',
            inject: false,
            hash: true,
            filename: 'index.html',
            HTML_PATH: folderPath
        }),
        new ExtraWatchWebpackPlugin({
            dirs: [ folderPath ]
        }),
        //new WebpackCustom()
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html)$/,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'), // source folder
                    to: path.resolve(__dirname, 'dist'),     // destination folder
                    globOptions: {
                        ignore: [ '**/.DS_Store' ],             // optional: ignore system files
                    },
                    noErrorOnMissing: true,                 // optional
                },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [ new TerserPlugin({
            terserOptions: {
                // pure_funcs: [ 'performance.mark', 'performance.measure' ]
            }
        }) ],
    },
};
