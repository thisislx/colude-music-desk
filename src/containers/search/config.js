import { lazy } from 'react'
import _paths from 'config/paths'

const
    Song = lazy(() => import(/* webpackChunkName: 'search-song' */'./song')),
    User = lazy(() => import(/* webpackChunkName: 'search-user' */ './user')),
    Video = lazy(() => import(/* webpackChunkName: 'search-video' */ './video'))

export const
    _layout = ['left', 'top', 'bottom'],
    _requestLimit = 50,
    _defaultType = 1,
    _typesConfig = {
        1: {
            name: '单曲',
            unit: '首',
            Component: Song,
            methods: ['addSongs']
        },
        10: {
            name: '专辑',
            unit: '张',
            methods: [''],
        },
        100: {
            name: '歌手',
            utni: '个',
            methods: [],
        },
        1000: {
            name: '歌单',
            unit: '张',
            methods: [],
        },
        1002: {
            name: '用户',
            unit: '位',
            methods: ['enterUser'],
            Component: User,
        },
        // 1004: {
        //     name: 'MV',
        //     methods: [],
        // },
        // 1006: {
        //     name: '歌词',
        //     methods: [],
        // },
        // 1009: {
        //     name: '电台',
        //     methods: [],
        // },
        1014: {
            name: '视频',
            methods: ['enterMv'],
            Component: Video
        },
    },
    _typeKeys = Object.keys(_typesConfig),
    createSource_ = (words, type) => ({
        name: '搜索页',
        id: `${_paths.search}${words}?type=${type}`
    })