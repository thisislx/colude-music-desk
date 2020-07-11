import types from './types'
import { fromJS } from 'immutable'

const initState = {
    playing: false,
    data: {},
    currentUrl: '',
    comments: {
        /* page: data */
    },
    briefHotComments: [],
    relateMv: [],
    barrage: {}
}

const initState_imm = fromJS(initState)

export default (state = initState_imm, { type, value }) => {
    switch (type) {
        case types.TOGGLE_PLAYING:
            return state.set('playing', value === undefined ? !state.get('playing') : value)

        case types.CHANGE_DATA:
            return state.set('data', value)

        case types.CHANGE_CURRENT_URL:
            return state.set('currentUrl', value)

        case types.UPDATE_COMMENTS:
            return state.setIn(['comments', value[0]], value[1])

        case types.CHANGE_BRIEF_HOT_COMMENTS:
            return state.set('briefHotComments', value)

        case types.CHANGE_RELAET_MV:
            return state.set('relateMv', value)

        case types.CHANGE_BARRAGE:
            return state.set('barrage', value)

        case types.INIT:
            return state
                .set('comments', initState_imm.get('comments'))

        default: return state
    }
}