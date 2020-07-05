import types from './types'
import { fromJS } from 'immutable'

export default {
    changeLeftBarWidth(width) {
        return {
            type: types.CHANGE_LEFT_BAR_WIDTH,
            value: width + 'px'
        }
    },
    changeLeftBarRef(ref) {
        return {
            type: types.CHANGE_LEFT_BAR_REF,
            value: fromJS(ref)
        }
    },
    changeSongPlaylistShow(bool) {
        return {
            type: types.CHANGE_SONG_PLAYLIST_SHOW,
            value: bool,
        }
    },
    changeSongPlaylistRef(ref) {
        return {
            type: types.CHANGE_SONG_PLAYLIST_REF,
            value: fromJS(ref)
        }
    }
}
