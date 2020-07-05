const sagaTypes = {
    SAGA_SEARCH_HOT: 'search/saga_search_hot',
    SAGA_SEARCH_SUGGEST: 'search/saga_search_suggest',
    SAGA_GET_SEARCH: 'search/saga_get_search'
}

export default Object.assign({
    GET_SEARCH_HOT: 'search/get_search_hot',
    GET_SEARCH_SUGGEST: 'search/get_search_suggest',
    UPDATE_RESULT: 'search/update_result',
    CLEAN_RESULT: 'search/clean_result',
    ADD_HISTROY: 'search/add_history',
}, sagaTypes)