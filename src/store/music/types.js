const assist = {
    // UPDATE_URLS: 'music/update_urls',
    CHANGE_LIST: 'music/change_list',
    CHANGE_PLAYLIST: 'music/change_playlist',
    CHANGE_RANDOM_LIST: 'music/change_random_list',
    ADD_SONGS: 'music/add_songs',
}

const sagas = {
    // SAGA_URL: 'music/saga_url',
    SAGA_LIST: 'music/saga_list',
    SAGA_LYRIC: 'music/sage_lyric',
    SAGA_ADD_SONGS: 'music/saga_add_songs',
}

export default Object.assign({
    TOGGLE_PLAYING: 'music/toggle_playing',
    TOGGLE_LOADING: 'music/toggle_loading',
    ADD_CANNOT_PLAT_LISTC: 'music/add_cannot_play_list',
    CHANGE_IDNEX: 'music/change_index',
    CHANGE_PERCENT: 'music/change_percent',
    CHANGE_VOLUME: 'music/change_volume',
    CHANGE_MODE: 'music/change_mode',
    CHANGE_BUFFER: 'music/change_buffer',
    NEXT_SONG: 'music/next_song',
    PREVIOUS_SONG: 'music/previous_song',
    INVALID_SONG: 'music/invalid_song',
}, sagas, assist)

