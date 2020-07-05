import types from './types'
import { fromJS } from 'immutable'

const sagas = {
    // getUrl(id) {
    //     return {
    //         type: types.SAGA_URL,
    //         value: id
    //     }
    // },

    changeList(list) {
        return {
            type: types.SAGA_LIST,
            value: list
        }
    },

    addSongs(ids, source = { name: '其它' }) {
        return {
            type: types.SAGA_ADD_SONGS,
            value: [Array.isArray(ids) ? ids : [ids], source]
        }
    },
}

const creator = {
    addCannotPlayList() {
        return {
            type: types.ADD_CANNOT_PLAT_LISTC
        }
    },

    changeIndex(index) {
        return {
            type: types.CHANGE_IDNEX,
            value: index,
        }
    },

    changePercent(percent) {
        return {
            type: types.CHANGE_PERCENT,
            value: percent
        }
    },

    changeVolume(value) {
        return {
            type: types.CHANGE_VOLUME,
            value,
        }
    },

    togglePlaying(bool) {
        return {
            type: types.TOGGLE_PLAYING,
            value: bool
        }
    },

    toggleLoading(bool) {
        return {
            type: types.TOGGLE_LOADING,
            value: bool,
        }
    },

    changeMode() {
        return {
            type: types.CHANGE_MODE
        }
    },
    nextSong() {
        return {
            type: types.NEXT_SONG
        }
    },
    previousSong() {
        return {
            type: types.PREVIOUS_SONG
        }
    },
    changeBuffer(value) {
        return {
            type: types.CHANGE_BUFFER,
            value,
        }
    }
}

export const assist = {
    togglePlaying: creator.togglePlaying,
    changeIndex: creator.changeIndex,

    updateUrls(id, url) {
        return {
            type: types.UPDATE_URLS,
            value: [id, url]
        }
    },
    changeList(list) {
        return {
            type: types.CHANGE_LIST,
            value: fromJS(list)
        }
    },
    changePlaylist(list_imm) {
        return {
            type: types.CHANGE_PLAYLIST,
            value: list_imm
        }
    },
    changeRandomList(list) {
        return {
            type: types.CHANGE_RANDOM_LIST,
            value: fromJS(list)
        }
    },
    invalidSong(id) {
        return {
            type: types.INVALID_SONG,
            value: id
        }
    },

    addSongs(obj) {
        return {
            type: types.ADD_SONGS,
            value: fromJS(obj)
        }
    }
}

export default Object.assign(creator, sagas)

