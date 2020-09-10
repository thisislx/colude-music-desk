import { put, takeEvery, select } from 'redux-saga/effects'
import types from './types'
import actionsCreator, { assist } from './actionsCreator'
import { fromJS } from 'immutable'
import { actionsCreator as videoAc } from '../video'
import { Song } from 'http'
import { _randomIndex, _modesLen, _modes } from './reducer'
import { randomArr } from 'tools'
import { splitSongsId, addSourceProerty, unifySongsProperty } from 'tools/media'

const song = new Song()

export default function* () {
    yield takeEvery(types.SAGA_LIST, changeList)
    yield takeEvery(types.SAGA_ADD_SONGS, addSongs)
    yield takeEvery(types.SAGA_CHANGE_MODE, changeMode)
    yield takeEvery(types.TOGGLE_PLAYING, togglePlaying)
}

function* togglePlaying({ value }) {
    const bool = value !== undefined
        ? value
        : yield select(state => state.getIn(['video', 'playing']))
    if (bool) yield put(videoAc.togglePlaying(false))
}
function* changeList({ value: { list, index = 0 } }) {
    const modeIndex = yield select(state => state.getIn(['music', 'mode', 'index']))

    let newPlaylist = list
    if (modeIndex === _randomIndex) {
        newPlaylist = changeRandomList_(list, [index])
        index = 0
    }
    yield put(assist.changeList(list))
    yield put(assist.changePlaylist(newPlaylist))
    yield put(actionsCreator.changeIndex(index))
}
function* addSongs({ value: [ids, source] }) {
    const
        music = yield select(state => state.get('music')),
        currentIndex = music.get('index'),
        list = music.get('list'),
        randomList = music.get('randomList'),
        isRandom = music.getIn(['mode', 'index']) === _randomIndex

    let newList = null, newRandomList = null

    /* 只添加一首歌*/
    if (ids.length === 1) {
        const hasIndex = music.get('playlist').findIndex(song => song.get('id') === +ids[0])
        if (~hasIndex && currentIndex === hasIndex)      /* 添加歌曲是当前的歌曲 */
            return yield (assist.togglePlaying(true))
        if (~hasIndex) {                                /* 存在播放列表 */
            yield put(assist.changeIndex(hasIndex))
            yield (assist.togglePlaying(true))
            return
        }
        const { songs } = yield song.getSongs(ids)
        unifySongsProperty(addSourceProerty(songs, source))         // 标准化
        const songs_imm = fromJS(songs[0])
        newList = list.unshift(songs_imm)
        newRandomList = randomList.unshift(songs_imm)
    } else {
        const
            idsPromiseArr = splitSongsId(ids).map(arr => song.getSongs(arr)),
            idMap = new Map(/* id: song */)             /* 去重 */
        const { songs } = yield Promise.all(idsPromiseArr)
        unifySongsProperty(addSourceProerty(songs, source))         // 标准化

        for (const song of songs) if (!idMap.has(song.id)) {
            idMap.set(song.id, song)
        }
        for (const song of list) if (!idMap.has(song.get('id'))) {
            idMap.set(song.get('id'), song)
        }
        newList = [...idMap.values()]
        newRandomList = randomArr(newList, [0])
    }


    yield put(assist.addSongs({
        list: newList,
        playlist: isRandom ? newRandomList : newList,
        randomList: newRandomList,
    }))
    yield put(assist.changeIndex(0))
    yield put(assist.togglePlaying(true))
}
function* changeMode() {
    const
        music = yield select(state => state.get('music')),
        // currentSongId = music.getIn(['currentSong', 'id']),
        oldModeIndex = music.getIn(['mode', 'index']),
        newModeIndex = oldModeIndex + 1 === _modesLen ? 0 : oldModeIndex + 1,
        isRandom = newModeIndex === _randomIndex

    yield put(assist.changeMode(_modes[newModeIndex]))

    /* 从随机播放到不随机， 从不随机到随机 */
    if (oldModeIndex === _randomIndex || isRandom) {
        const newPlaylist = isRandom ? music.get('randomList') : music.get('list')
        yield put(assist.changePlaylist(newPlaylist))
    }
}


/* 下划线表示不被takeEvery()捕捉 */
function* changeRandomList_(list, heads) {
    const arr = randomArr(list, heads)
    yield put(assist.changeRandomList(arr))
    return arr
}
