import { put, takeEvery, select } from 'redux-saga/effects'
import types from './types'
import { SongMenu, Song } from 'http'
import { assist } from './actionsCreator'
import { splitMenu } from './tool'
import { splitSongsId, unifySongsProperty, addSourceProerty } from 'tools/media'
import { _recommendSongId } from 'config/song-menu'

const
    LIST = 'playlists',
    DEFAULT_CLASS_CAT = '全部',
    songMenu = new SongMenu(),
    song = new Song()

export default function* () {
    yield takeEvery(types.SAGA_MY_MENU, getMyMenu)
    yield takeEvery(types.SAGA_OTHER_USRT_MENU, getOtherUserMenu)
    yield takeEvery(types.SAGA_RECOMMEND_MENU, getRecommendMenu)
    yield takeEvery(types.SAGA_RECOMMEND_SONGS, getRecommendSongs)
    yield takeEvery(types.SAGA_CLASS_MENU, getClassMenu)
    yield takeEvery(types.SAGA_CURRENT_MENU, getCurrentMenu)
}

function* getMyMenu({ value: userId }) {
    const
        { playlist } = yield songMenu.getUserMenu(userId),
        data = splitMenu(playlist, userId, true)
    yield put(assist.changeMyMenu(data))
}
function* getOtherUserMenu({ value: userId }) {
    const
        { playlist } = yield songMenu.getUserMenu(userId),
        data = splitMenu(playlist, userId)
    yield put(assist.changeOtherUserMenu(data))
}
function* getRecommendMenu({ value: isLogin }) {
    if (isLogin) {
        const { recommend } = yield songMenu.getRecommendMenu()
        yield put(assist.changeRecommendMenu(recommend))
    } else {
        const res = yield* getClassMenu(undefined, 20)
        yield put(assist.changeRecommendMenu(res[LIST]))
    }
}
function* getRecommendSongs() {
    const caches = yield select(state => state.getIn(['songMenu', 'cacheMenus']))
    if (caches.has(_recommendSongId)) {
        yield put(assist.changeCurrentMenu(caches.get(_recommendSongId)))
    } else {
        const
            { recommend: __recommend, data: { dailySongs } } = yield songMenu.getRecommendSongs(),
            recommend = __recommend || dailySongs
        unifySongsProperty(recommend)
        addSourceProerty(recommend, { id: _recommendSongId, name: '每日推荐' })
        const playlist = { songs: recommend, id: _recommendSongId }
        yield put(assist.changeCurrentMenu(playlist))
        yield put(assist.addCacheMenus(_recommendSongId, playlist))
    }
}
function* getClassMenu(tag = DEFAULT_CLASS_CAT, limit) {
    const
        oldMenu = yield select(state => state.getIn(['classMenu', tag, LIST])),
        /* cat limit before */
        config = { tag, limit };
    config.before = Array.isArray(oldMenu) ? oldMenu[oldMenu.length - 1].updateTime : undefined

    const res = yield songMenu.getClassMenu(config)
    res[LIST] = oldMenu ? [...oldMenu, ...res[LIST]] : res[LIST]
    yield put(assist.updateClassMenu([tag, res]))
    return res
}
function* getCurrentMenu({ value: id }) {
    const caches = yield select(state => state.getIn(['songMenu', 'cacheMenus']))
    if (caches.has(id)) {
        const playlist = caches.get(id)
        yield put(assist.changeCurrentMenu(playlist))
    } else {
        const
            { playlist } = yield songMenu.getMenuDetail(id),
            { trackIds } = playlist,
            batchIdsPromise = splitSongsId(trackIds).map(batch => song.getSongs(batch)),
            songs = yield Promise.all(batchIdsPromise)

        playlist.songs = songs.reduce((prev, cur) => [...prev, ...cur.songs], [])
        addSourceProerty(playlist.songs, { name: playlist.name, id: playlist.id })
        unifySongsProperty(playlist.songs)
        yield put(assist.changeCurrentMenu(playlist))
        yield put(assist.addCacheMenus(id, playlist))
    }
}