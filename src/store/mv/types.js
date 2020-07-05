const
    creator = {
        INIT: 'mv/init',
        CHANGE_BARRAGE: 'mv/change_barrage',
    },
    sagas = {
        SAGA_GET_DATA: 'mv/saga_get_data',
        SAGA_GET_URL: 'mv/saga_get_url',
        SAGA_GET_COMMENT: 'mv/saga_get_comment',
        SAGA_GET_RELATE_MV: 'mv/saga_get_relate_mv',
    },
    assist = {
        CHANGE_DATA: 'mv/change_data',
        CHANGE_CURRENT_URL: 'mv/change_current_url',
        UPDATE_COMMENTS: 'mv/update_comments',
        CHANGE_BRIEF_HOT_COMMENTS: 'mv/change_brief_hot_comments',
        CHANGE_RELAET_MV: 'mv/change_relate_mv'
    }

export default { ...creator, ...sagas, ...assist }