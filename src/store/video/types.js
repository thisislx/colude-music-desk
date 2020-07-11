const
    creator = {
        INIT: 'video/init',
        CHANGE_BARRAGE: 'video/change_barrage',
        TOGGLE_PLAYING: 'video/toggle_playing',
    },
    sagas = {
        SAGA_GET_DATA: 'video/saga_get_data',
        SAGA_GET_URL: 'video/saga_get_url',
        SAGA_GET_COMMENT: 'video/saga_get_comment',
        SAGA_GET_RELATE_MV: 'video/saga_get_relate_mv',
    },
    assist = {
        CHANGE_DATA: 'video/change_data',
        CHANGE_CURRENT_URL: 'video/change_current_url',
        UPDATE_COMMENTS: 'video/update_comments',
        CHANGE_BRIEF_HOT_COMMENTS: 'video/change_brief_hot_comments',
        CHANGE_RELAET_MV: 'video/change_relate_mv'
    }

export default { ...creator, ...sagas, ...assist }