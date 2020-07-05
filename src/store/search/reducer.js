import types from './types'
import { fromJS } from 'immutable'

const initState = {
    searchHot: [],
    searchSuggest: {/* type: [] */ },
    result: {   /* 搜索结果 */
        /* type: {  0: {}, config } */
    }
}
const initState_imm = fromJS(initState)

export default (state = initState_imm, { type, value }) => {
    switch (type) {
        case types.GET_SEARCH_HOT:
            return state.set('searchHot', value)

        case types.GET_SEARCH_SUGGEST:
            return state.set('searchSuggest', value)

        case types.UPDATE_RESULT:
            return state.setIn(['result', value[0], value[1]], value[2])

        case types.CLEAN_RESULT:
            return state.set('result', initState_imm.get('result'))

        default: return state
    }
} 