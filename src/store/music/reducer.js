import types from './types'
import immutable, { fromJS } from 'immutable'
import LocalStorage from 'tools/LocalStorage'


const
    ls = new LocalStorage('music'),
    modes = [
        { name: '顺序播放', icon: '&#xe71d;', index: 0 },
        { name: '随机播放', icon: '&#xe66b;', index: 1 },
        { name: '单曲循环', icon: '&#xe607;', index: 2 },
    ],
    modesLen = modes.length

export const
    randomIndex = 1,
    loopIndex = 2,
    initState = {
        index: -1,      /* 播放索引 */
        playing: false,
        mode: modes[0],
        loading: false,
        buffer: 0,              /* 缓冲 取值(0 - 1) */
        percent: 0,            /* 0 - 1 */
        volume: .5,            /* 0 - 1 */
        currentSong: {},       /* 当前播放歌曲  改变条件： index改变， playlist改变 */
        list: [],              /* 歌曲列表 */
        playlist: [],          /* 实际播放列表 */
        randomList: [],        /* 随机播放列表*/
        cannotPlayList: [],    /* 存储id */
    }

const
    initState_imm = (fromJS(ls.get()) || fromJS(initState)).merge({
        playing: false,
        cannotPlayList: immutable.List(),
    }),
    modes_imm = fromJS(modes)

export default (state = initState_imm, { type, value }) => {
    switch (type) {
        case types.CHANGE_IDNEX: {
            const newState = state
                .set('index', value)
                .set('playing', true)
                .set('percent', 0)
                .set('buffer', 0)
                .set('currentSong', state.getIn(['playlist', value]) || initState_imm.get('currentSong'))
            ls.set(newState)
            return newState
        }

        case types.CHANGE_PLAYLIST: {
            const newState = state
                .set('playlist', value)
                .set('currentSong', value.get(state.get('index')))
            ls.set(newState)
            return newState
        }

        case types.CHANGE_MODE: {
            const
                oldModeIndex = state.getIn(['mode', 'index']),
                currentSongId = state.getIn(['currentSong', 'id']),
                newModeIndex = oldModeIndex + 1 === modesLen ? 0 : oldModeIndex + 1,
                isRandom = newModeIndex === randomIndex,
                newPlaylist = isRandom ? state.get('randomList') : state.get('list'),
                newState = state.merge({
                    playlist: newPlaylist,
                    mode: modes_imm.get(newModeIndex),
                    /* 随机播放的切换 */
                    index: (oldModeIndex === randomIndex || newModeIndex === randomIndex)
                        ? newPlaylist.findIndex(val => val.get('id') === currentSongId)
                        : state.get('index'),
                })

            ls.set(newState)
            return newState
        }

        case types.CHANGE_BUFFER:
            return state.set('buffer', value)

        case types.TOGGLE_PLAYING:
            return state.set('playing', value === undefined ? !state.get('playing') : value)

        case types.TOGGLE_LOADING:
            return state.set('loading', value)

        case types.CHANGE_PERCENT:
            return state.set('percent', value)

        case types.CHANGE_VOLUME: {
            const newState = state.set('volume', value)
            ls.set(newState)
            return newState
        }

        case types.CHANGE_LIST: {
            const newState = state.set('list', value)
            ls.set(newState)
            return newState
        }

        case types.ADD_SONGS: {
            const newState = state.merge(value)
            ls.set(newState)
            return newState
        }

        case types.CHANGE_RANDOM_LIST: {
            const newState = state.set('randomList', value)
            ls.set(newState)
            return newState
        }

        case types.NEXT_SONG: {
            const
                index = state.get('index'),
                length = state.get('playlist').size,
                newIndex = index + 1 >= length ? 0 : index + 1,
                newState = state
                    .set('percent', 0)
                    .set('index', newIndex)
                    .set('currentSong', state.getIn(['playlist', newIndex]))
            ls.set(newState)
            return newState
        }

        case types.PREVIOUS_SONG: {
            const
                index = state.get('index'),
                length = state.get('playlist').size,
                newIndex = index + 1 === length ? 0 : index - 1,
                newState = state
                    .set('percent', 0)
                    .set('index', newIndex)
                    .set('currentSong', state.getIn(['playlist', newIndex]))
            ls.set(newState)
            return newState
        }

        case types.ADD_CANNOT_PLAT_LISTC: {
            const
                id = state.getIn(['currentSong', 'id']),
                cannotPlayList = state.get('cannotPlayList')

            return state.set('cannotPlayList', cannotPlayList.includes(id)
                ? cannotPlayList
                : cannotPlayList.push(id)
            )
        }

        default: return state
    }
} 