import { combineReducers } from 'redux-immutable'

import { reducer as music } from './music'
import { reducer as user } from './user'
import { reducer as theme } from './theme'
import { reducer as songMenu } from './song-menu'
import { reducer as song } from './song'
import { reducer as global } from './global'
import { reducer as search } from './search'
import { reducer as banner } from './banner'
import { reducer as mv } from './mv'
import { reducer as layout } from './layout'

export default combineReducers({
    banner,
    global,
    music,
    user,
    theme,
    songMenu,
    song,
    search,
    mv,
    layout,
})
