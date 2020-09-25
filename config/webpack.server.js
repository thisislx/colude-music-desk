const paths = require('./webpack.path')
module.exports = {
    port: 1234,
    open: false,
    publicPath: paths.publicPath,
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    proxy: {
        '/api': {
            target: 'http://localhost:7890',
            changeOrigin: true,
            pathRewrite: { '^/api': '/' }
        }
    }
}