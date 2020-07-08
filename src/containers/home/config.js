import { lazy } from 'react'
import _paths from 'config/paths'
// import Recommend from './recommend'
const
    LastMusic = lazy(() => import(/* webpackChunkName: 'home-last-music' */'./last-music')),
    Menu = lazy(() => import(/* webpackChunkName: 'home-menu' */'./menu')),
    Radio = lazy(() => import(/* webpackChunkName: 'home-radio' */'./radio')),
    Rank = lazy(() => import(/* webpackChunkName: 'home-rank' */'./rank')),
    Recommend = lazy(() => import(/* webpackChunkName: 'home-recomment' */'./recommend')),
    Singer = lazy(() => import(/* webpackChunkName: 'home-singer' */'./singer'))

export const
    _navConfig = [
        {
            name: '个性推荐',
            Component: Recommend
        }, {
            name: '歌单',
            Component: Menu
        }, {
            name: '主播电台',
            Component: Radio
        }, {
            name: '排行榜',
            Component: Rank
        }, {
            name: '歌手',
            Component: Singer
        }, {
            name: '最新音乐',
            Component: LastMusic
        }
    ]