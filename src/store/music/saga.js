import { put, takeEvery, select } from 'redux-saga/effects'
import types from './types'
import { assist } from './actionsCreator'
import { fromJS } from 'immutable'
import { Song } from 'http'
import { randomIndex } from './reducer'
import { randomArr } from 'tools'
import { splitSongsId, addSourceProerty, unifySongsProperty } from 'tools/media'
const song = new Song()

export default function* () {
    // yield takeEvery(types.SAGA_URL, getUrl)
    yield takeEvery(types.SAGA_LIST, changeList)
    yield takeEvery(types.SAGA_ADD_SONGS, addSongs)
}
// function* getUrl({ value: id }) {
//     const { data: [{ url = null }] } = yield song.getUrl(id)
//     yield put(assist.updateUrls(id, url))
// }
function* changeList({ value: list }) {
    yield new Promise(resolve => setTimeout(resolve, 100))    /* 推迟执行，为了拿到最新的index */
    yield put(assist.changeList(list))
    const
        music = yield select(state => state.get('music')),
        modeIndex = music.getIn(['mode', 'index']),
        list_imm = music.get('list'),
        index = music.get('index')

    yield* changeRandomList_(list, [index])
    const newPlaylist = modeIndex === randomIndex
        ? yield select(state => state.getIn(['music', 'randomList']))
        : list_imm
    yield put(assist.changePlaylist(newPlaylist))
}

function* addSongs({ value: [ids, source] }) {
    const
        music = yield select(state => state.get('music')),
        currentIndex = music.get('index'),
        list = music.get('list'),
        randomList = music.get('randomList'),
        isRandom = music.getIn(['mode', 'index']) === randomIndex

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


/* 下划线表示不被takeEvery()捕捉 */
function* changeRandomList_(list, heads) {
    const arr = randomArr(list, heads)
    yield put(assist.changeRandomList(arr))
    return arr
}


