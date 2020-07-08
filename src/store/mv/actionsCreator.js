import types from './types'
import { fromJS } from 'immutable'

const
    creator = {
        init() {
            return {
                type: types.INIT
            }
        },
        changeBarrage(value) {
            return {
                type: types.CHANGE_BARRAGE,
                value: fromJS(value)
            }
        },
        changeData(data) {
            return {
                type: types.CHANGE_DATA,
                value: fromJS(data)
            }
        },
    },
    sagas = {
        getData(mvid) {
            return {
                type: types.SAGA_GET_DATA,
                value: mvid
            }
        },
        getUrl(mvid) {
            return {
                type: types.SAGA_GET_URL,
                value: mvid
            }
        },
        getComment(mvid, offset, limit) {
            return {
                type: types.SAGA_GET_COMMENT,
                value: [mvid, offset, limit]
            }
        },
        getRelateMv(mvid) {
            return {
                type: types.SAGA_GET_RELATE_MV,
                value: mvid,
            }
        },
    }

export const assist = {
    init: creator.init,
    changeData: creator.changeData,

    changeCurrentUrl(url) {
        return {
            type: types.CHANGE_CURRENT_URL,
            value: url,
        }
    },
    changeRelateMv(list) {
        return {
            type: types.CHANGE_RELAET_MV,
            value: fromJS(list)
        }
    },
    updateComment(page, data) {
        return {
            type: types.UPDATE_COMMENTS,
            value: [page, fromJS(data)]
        }
    },
    changeBriefHotComments(list) {
        return {
            type: types.CHANGE_BRIEF_HOT_COMMENTS,
            value: fromJS(list)
        }
    },
}

export default { ...sagas, ...creator }