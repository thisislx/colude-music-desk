import types from './types'
import immutable, { fromJS } from 'immutable'
import { initState } from './reducer'

const creator = {
    getLyric(id) {
        return {
            type: types.SAGA_LYRIC,
            value: id
        }
    },

    clearAllComments() {
        return {
            type: types.CLEAR_ALL_COMMENTS
        }
    },
    /* 
        @params(offset) 偏移量  offset - 1 * limit 开始
        @params(limit)  每页数量
    */
    getComments(id, offset = 0, limit = 50) {
        return {
            type: types.SAGA_COMMENTS,
            value: [
                id,
                offset,
                limit
            ]
        }
    },

    makeComment(id, content) {
        return {
            type: types.SAGA_MAKE_COMMENT,
            value: [id, content]
        }
    },

    replyComment(id, content, commentId, limit) {
        return {
            type: types.SAGA_REPLY_COMMENT,
            value: [id, content, commentId, limit]
        }
    },

    likeComment(id, commentId, offset) {
        return {
            type: types.SAGA_LIKE_COMMENT,
            value: [id, commentId, offset]
        }
    },

    cancelLikeComment(id, commentId, offset) {
        return {
            type: types.SAGA_CANCLE_LIKE_COMMENT,
            value: [id, commentId, offset]
        }
    }
}

export const assist = {
    clearAllComments: creator.clearAllComments,

    changeCurrentLyric(lyric) {
        return {
            type: types.CHANGE_CURRENT_LYRIC,
            value: immutable.isMap(lyric) ? lyric : fromJS(lyric)
        }
    },
    addLyricCaches(id, lyric) {
        return {
            type: types.ADD_LYRIC_CACHES,
            value: [id, fromJS(lyric)]
        }
    },
    updateComments(pageCount, arr) {
        return {
            type: types.UPDATE_COMMENTS,
            value: [pageCount, fromJS(arr)]
        }
    },
    changeBriefHotComments(arr) {
        return {
            type: types.CHANGE_BRIEF_HOT_COMMENTS,
            value: fromJS(arr)
        }
    },

    toggleCommentLike(offset, commentId, bool) {
        return {
            type: types.TOGGLE_COMMENT_LIKE,
            value: [offset, commentId, bool]
        }
    }
}

export default creator