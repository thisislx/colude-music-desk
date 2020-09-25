const path = require('path')

const aliasConfig = [
    ['assets'],     /* 第一项为全局名字：第二项src下的目录(默认为第一项的值) */
    ['hooks'],
    ['components'],
    ['containers'],
    ['tools'],
    ['store'],
    ['http'],
    ['base-ui'],
    ['config'],                                                                                                                 
]

module.exports = {
    publicPath: '/',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        alias: aliasConfig.map(item => [
            item,
            path.resolve(__dirname, '../src', item[1] ? item[1] : item[0])
        ]).reduce((prev, cur) => Object.assign(prev, { [cur[0]]: cur[1] }), {})
    }
}