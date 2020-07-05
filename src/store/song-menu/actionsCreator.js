import types from './types'
import immutable, { fromJS } from 'immutable'
const creator = {
    cleanMyMenu() {
        return {
            type: types.CLEAN_MY_MENU,
        }
    },
    changeCurrentMenu(menu) {
        return {
            type: types.CHANGE_CURRENT_MENU,
            value: immutable.isMap(menu) ? menu : fromJS(menu)
        }
    },
}

const sagas = {
    getMyMenu(userId) {
        return {
            type: types.SAGA_MY_MENU,
            value: userId
        }
    },
    getOtherUserMenu(userId) {   /* 查看用户的歌单 */
        return {
            type: types.SAGA_OTHER_USRT_MENU,
            value: userId
        }
    },
    getRecommendMenu(isLogin) {    /* 推荐的歌单 */
        return {
            type: types.SAGA_RECOMMEND_MENU,
            value: isLogin
        }
    },
    getRecommendSongs(menu) {   /* 每日推荐 */
        return {
            type: types.SAGA_RECOMMEND_SONGS,
            value: fromJS(menu)
        }
    },

    getClassMenu(tag) {
        return {
            type: types.SAGA_CLASS_MENU,
            value: tag
        }
    },

    getCurrentMenu(id) {
        return {
            type: types.SAGA_CURRENT_MENU,
            value: id
        }
    }
}

export const assist = {
    changeMyMenu(data) {
        return {
            type: types.CHANGE_MY_MENU,
            value: fromJS(data)
        }
    },

    changeOtherUserMenu(data) {
        return {
            type: types.CHANGE_OTHER_USER_MENU,
            value: fromJS(data)
        }
    },

    /* @params(0) @type(arr) */
    updateClassMenu([tag, data]) {
        return {
            type: types.UPDATE_CLASS_MENU,
            value: [tag, fromJS(data)]
        }
    },

    changeRecommendMenu(menu) {
        return {
            type: types.CHANGE_RECOMMEND_MENU,
            value: fromJS(menu)
        }
    },

    changeCurrentMenu: creator.changeCurrentMenu,

    addCacheMenus(id, data) {
        return {
            type: types.ADD_CACHE_MENUS,
            value: [id, fromJS(data)]
        }
    }
}

export default Object.assign(creator, sagas)