const assist = {
    CHANGE_MY_MENU: 'songMenu/change_my_menu',
    CHANGE_OTHER_USER_MENU: 'songMenu/change_other_user_menu',
    CHANGE_RECOMMEND_MENU: 'songMenu/change_recommend_menu',
    CHANGE_CURRENT_MENU: 'songMenu/change_current_menu',
    GET_CURRENT_MENU: 'songMenu/get_current_menu',
    UPDATE_CLASS_MENU: 'songMenu/update_class_menu',
    ADD_CACHE_MENUS: 'songMenu/add_cache_menus',
}

const sagas = {
    SAGA_MY_MENU: 'songMenu/saga_my_menu',
    SAGA_OTHER_USRT_MENU: 'songMenu/saga_other_user_menu',
    SAGA_RECOMMEND_MENU: 'songMenu/saga_recommend_menu',
    SAGA_RECOMMEND_SONGS: 'songMenu/saga_recommend_songs',
    SAGA_CLASS_MENU: 'songMenu/saga_class_menu',
    SAGA_CURRENT_MENU: 'songMenu/saga_current_menu',
}

export default Object.assign({
    CLEAN_MY_MENU: 'songMenu/clean_my_menu',
}, sagas, assist)