import { lazy } from 'react'
import _paths from 'config/paths'

const
    Song = lazy(() => import(/* webpackChunkName: 'result-song' */'./song'))

export const
    _requestLimit = 50,
    _defaultType = 1,
    _typesConfig = {
        1: {
            name: '单曲',
            Component: Song,
            methods: ['addSongs']
        },
        10: {
            name: '专辑',
            methods: [],
        },
        100: {
            name: '歌手',
            methods: [],
        },
        1000: {
            name: '歌单',
            methods: [],
        },
        1002: {
            name: '用户',
            methods: [],
        },
        1004: {
            name: 'MV',
            methods: [],
        },
        1006: {
            name: '歌词',
            methods: [],
        },
        1009: {
            name: '电台',
            methods: [],
        },
        1014: {
            name: '视频',
            methods: [],
        },
    },
    createSource_ = (words, type) => ({
        name: '搜索页',
        id: `${_paths.search}${words}?type=${type}`
    })