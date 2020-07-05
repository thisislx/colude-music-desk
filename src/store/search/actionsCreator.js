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

        getSearch(words, type, offset, limit = 50) {
            return {
                type: types.SAGA_GET_SEARCH,
                value: [words, type, offset, limit]
            }
        },
    },
    creator = {
        cleanResult() {
            return {
                type: types.CLEAN_RESULT
            }
        }
    }


export const assist = {
    cleanResult: creator.cleanResult,

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
    }
}

export default { ...creator, ...sagas }