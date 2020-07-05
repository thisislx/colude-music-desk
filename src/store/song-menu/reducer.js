import types from './types'
import { fromJS } from 'immutable'

export const initState = {
    myMenu: {
        mine: [],
        collect: [],
    },
    otherUserMenu: {},   // 用户歌单
    cacheMenus: {          // 缓存歌单的详情，并非用户歌单
        /* id: {obj} */
    },
    recommendMenu: [],     // 推荐歌单
    currentMenu: {         // 当前歌单
        songs: [],
        creator: {},       // 每日推荐没有
    },
    classMenu: {/* tab: {} */ },
}
const initState_imm = fromJS(initState)

export default (state = initState_imm, { type, value }) => {
    switch (type) {
        case types.CHANGE_MY_MENU:
            return state.set('myMenu', value)

        case types.CHANGE_OTHER_USER_MENU:
            return state.set('otherUserMenu', value)

        case types.UPDATE_CLASS_MENU:
            return state.setIn(['classMenu', value[0]], value[1])

        case types.CHANGE_CURRENT_MENU:
            return state.set('currentMenu', value)

        case types.CHANGE_RECOMMEND_MENU:
            return state.set('recommendMenu', value)

        case types.ADD_CACHE_MENUS:
            return state.setIn(['cacheMenus', value[0]], value[1])

        case types.CLEAN_MY_MENU:
            return state.set('myMenu', initState_imm.get('myMenu'))

        default: return state
    }
} 