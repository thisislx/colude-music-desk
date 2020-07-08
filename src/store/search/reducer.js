import types from './types'
import { fromJS } from 'immutable'
import Ls from 'tools/LocalStorage'
import { _historyMaxLength } from './config'
const _ls = new Ls('search')

const initState = {
    words: '',
    searchHot: [],
    searchSuggest: {/* type: [] */ },
    result: {   /* 搜索结果 */
        /* type: {  0: {}, config } */
    },
    history: _ls.get('history') || [],
}

const initState_imm = fromJS(initState)

export default (state = initState_imm, { type, value }) => {
    switch (type) {
        case types.CHANGE_WORDS:
            return initState_imm.set('words', value)

        case types.GET_SEARCH_HOT:
            return state.set('searchHot', value)

        case types.GET_SEARCH_SUGGEST:
            return state.set('searchSuggest', value)

        case types.UPDATE_RESULT:
            return state.setIn(['result', value[0], value[1]], value[2])

        case types.ADD_HISTROY: {
            let history = state.get('history').toJS()
            if (history.length > _historyMaxLength) history.shift()
            history.unshift(value)
            history = [...new Set(history)]
            _ls.set(history, 'history')
            return state.set('history', fromJS(history))
        }

        default: return state
    }
} 