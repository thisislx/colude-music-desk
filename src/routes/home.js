import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import _paths, { _homePaths } from 'config/paths'

const
    Playlist = lazy(() => import(/* webpackChunkName: 'playlist' */ '../containers/playlist')),
    Search = lazy(() => import(/* webpackChunkName: 'search' */ '../containers/search')),
    User = lazy(() => import(/* webpackChunkName: 'user' */ '../containers/user')),
    Player = lazy(() => import(/* webpackChunkName: 'player' */ '../containers/player')),
    MvPlayer = lazy(() => import(/* webpackChunkName: 'mv-player' */ '../containers/mv-player'))

export default [
    {
        path: `${_paths.playlist}:id`,
        component: Playlist,
    }, {
        path: _paths.player,
        component: Player
    }, {
        path: `${_paths.mvPlayer}:id`,
        component: MvPlayer,
    }, {
        path: `${_paths.search}:words`,
        component: Search
    }, {
        path: `${_paths.user}:id`,
        component: User
    }, {
        render() { return <> </> },
    },
]
