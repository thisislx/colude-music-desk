const
    merge = require('webpack-merge'),
    commonConfig = require('./webpack.common'),
    consts = require('./webpack.const'),
    webpack = require('webpack'),
    server = require('./webpack.server'),
    paths = require('./webpack.path')

process.env.NODE_ENV = consts.DEV

const config = {
    mode: consts.DEV,
    devtool: 'cheap-module-source-map',
    devServer: server,
    entry: ['react-hot-loader/patch', paths.entry],
    output: {
        publicPath: paths.publicPath,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name]_async.js',
        libraryTarget: 'var',
        library: '[name]_library'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                include: /assets/,
                use: ['style-loader'],
            }, {
                test: /\.less$/,
                exclude: /node_modules|assets/,
                use: ['style-loader']
            }, {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader']
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge.smart(config, commonConfig)