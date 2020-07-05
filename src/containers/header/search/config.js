import _paths from 'config/paths'

export const
    _typeConfig = {
        keys: ['songs', 'artists', 'albums', 'mvs',],

        songs: {/* 对应上面的keys */
            name: '歌曲',
            type: 1
        },
        artists: {
            name: '歌手',
            type: 100,
            source: {
                name: '搜索栏'
            },
        },
        albums: {
            name: '专辑',
            type: 10,
            source: {
                name: '搜索栏'
            },
        },
        mvs: {
            name: 'mv',
            type: 1004,
            source: {
                name: '搜索栏'
            },
        },
    },
    _hotLightConfig = 3,
    createSourece_ = (name = '搜索栏') => ({
        name
    }),
    createResultPath_ = (words, type) => `${_paths.search}${words}?type=${type}`
