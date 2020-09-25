const
    merge = require('webpack-merge'),
    commonConfig = require('./webpack.common'),
    consts = require('./webpack.const'),
    TerserPlugin = require('terser-webpack-plugin'),
    CleanPlugin = require('clean-webpack-plugin').CleanWebpackPlugin,
    MiniCssExtranctPlugin = require('mini-css-extract-plugin'),
    OptimizationCssPlugin = require('optimize-css-assets-webpack-plugin'),
    paths = require('./webpack.path')

process.env.NODE_ENV = consts.PROD

const config = {
    output: {
        filename: 'js/[name]_[contenthash].js',
        chunkFilename: 'js/[name]_async_[contenthash].js',
    },
    mode: consts.PROD,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                include: /assets/,
                use: [MiniCssExtranctPlugin.loader]
            },
            {
                test: /\.less$/,
                exclude: /node_modules|assets/,
                use: [MiniCssExtranctPlugin.loader]
            }, {
                test: /\.css$/,
                include: /node_modules/,
                use: [MiniCssExtranctPlugin.loader]
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtranctPlugin.loader]
            }
        ]
    },
    plugins: [
        new MiniCssExtranctPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[name]_async.css'
        }),
        new CleanPlugin(),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
            }),
            new OptimizationCssPlugin({
                cssProcessor: require('cssnano'),
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,     // 异步加载组件个数
            maxInitialRequests: 3,   // 每个入口最大分割成3的文件
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
}

module.exports = merge(config, commonConfig)