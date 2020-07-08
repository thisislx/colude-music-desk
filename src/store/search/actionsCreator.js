import types from './types'
import { fromJS } from 'immutable'

const
    sagas = {
        getSearchHot() {
            return {
                type: types.SAGA_SEARCH_HOT
            }
        },

        getSearchSuggest(keywords) {
            return {
                type: types.SAGA_SEARCH_SUGGEST,
                value: keywords,
            }
        },

        getSearch(type, offset, limit = 50) {
            return {
                type: types.SAGA_GET_SEARCH,
                value: [type, offset, limit]
            }
        },
    },
    creator = {
        changeWords(words) {
            return {
                type: types.CHANGE_WORDS,
                value: words
            }
        }
    }


export const assist = {
    getSearchHot(arr) {
        return {
            type: types.GET_SEARCH_HOT,
            value: fromJS(arr)
        }
    },
    getSearchSuggest(result) {
        return {
            type: types.GET_SEARCH_SUGGEST,
            value: fromJS(result)
        }
    },
    updateResult(type, offset, list) {
        return {
            type: types.UPDATE_RESULT,
            value: [type, offset, fromJS(list)]
        }
    },
    addHistory(words) {
        return {
            type: types.ADD_HISTROY,
            value: words
        }
    }
}

export default { ...creator, ...sagas }