const
    sagas = {
        SAGA_LYRIC: 'song/saga_lyric',
        SAGA_COMMENTS: 'song/saga_comments',
        SAGA_MAKE_COMMENT: 'song/saga_make_comment',
        SAGA_REPLY_COMMENT: 'song/saga_reply_comment',
        SAGA_LIKE_COMMENT: 'song/saga_like_comment',
        SAGA_CANCLE_LIKE_COMMENT: 'song/saga_cancel_like_comment'
    },
    assist = {
        CHANGE_CURRENT_LYRIC: 'song/change_current_lyric',
        ADD_LYRIC_CACHES: 'song/add_lyric_caches',
        UPDATE_COMMENTS: 'song/update_comments',
        CLEAR_ALL_COMMENTS: 'song/clear_all_comments',
        CHANGE_BRIEF_HOT_COMMENTS: 'song/change_brief_hot_comments',
        TOGGLE_COMMENT_LIKE: 'song/toggle_comment_like',
    }

export default Object.assign({

}, sagas, assist)