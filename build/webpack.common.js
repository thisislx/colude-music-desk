const
    paths = require('./webpack.path'),
    Happypack = require('happypack'),
    HtmlPlugin = require('html-webpack-plugin'),
    WorkBoxPlugin = require('workbox-webpack-plugin')
SizePlugin = require('size-plugin')

const config = {
    entry: paths.entry,
    output: {
        publicPath: paths.publicPath,
        libraryTarget: 'var',
        library: '[name]_library'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less'],
        alias: paths.resolve.alias
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['happypack/loader?id=js'],
            }, {
                test: /\.less$/,
                include: /assets/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            import: true,
                            // localsConvention: 'dashesOnly'
                        }
                    },
                    'postcss-loader',
                    'less-loader',
                ],
            }, {
                test: /\.less$/,
                exclude: /node_modules|assets/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            import: true,
                            localsConvention: 'dashesOnly'
                        }
                    },
                    'postcss-loader',
                    'less-loader',
                ],
            }, {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    'css-loader'
                ],
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            import: true,
                        }
                    },
                    'postcss-loader',
                ],
            }, {
                test: /\.(?:jpg|png|gif|bmp|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: 'assets/imgs/[name].[ext]'
                    }
                }
            }, {
                test: /\.(?:ttf|eot|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new Happypack({
            id: 'js',
            //如何处理  用法和loader 的配置一样
            loaders: [
                'babel-loader?cacheDirectory=true',
            ],
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        new HtmlPlugin({
            template: './src/index.html',
            favicon: './favicon.ico',
        }),
        new SizePlugin(),
        new WorkBoxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        })
    ]
}


module.exports = config