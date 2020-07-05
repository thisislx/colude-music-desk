import types from './types'
import { fromJS } from 'immutable'

export const initState = {
    songBanners: []
}

const initState_imm = fromJS(initState)
export default (state = initState_imm, { type, value }) => {
    switch (type) {
        case types.CHANGE_SONG_BANNERS:
            return state.set('songBanners', value)

        default: return state
    }
} 