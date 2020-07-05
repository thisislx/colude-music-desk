import types from './types'
import { fromJS } from 'immutable'

export const initState = {
    header: {
        height: '3.2rem',
    },
    leftBar: {
        ref: Object.prototype,
        width: '12rem',
    },
    footer: {
        height: '3.2rem',
    },
    songPlaylist: {
        show: false,
        ref: Object.prototype,
    }
}

export default (state = fromJS(initState), { type, value } = {}) => {
    switch (type) {
        case types.CHANGE_LEFT_BAR_WIDTH:
            return state.setIn(['leftBar', 'width'], value)

        case types.CHANGE_LEFT_BAR_REF:
            return state.setIn(['leftBar', 'ref'], value)

        case types.CHANGE_SONG_PLAYLIST_SHOW:
            return state.setIn(['songPlaylist', 'show'],
                value === undefined
                    ? !state.getIn(['songPlaylist', 'show'])
                    : value
            )
        case types.CHANGE_SONG_PLAYLIST_REF:
            return state.setIn(['songPlaylist', 'ref'], value)
            
        default: return state
    }
}

