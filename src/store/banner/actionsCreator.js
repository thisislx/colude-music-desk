import types from './types'
import { fromJS } from 'immutable'

export const assist = {
    changeBanners(list) {
        return {
            type: types.CHANGE_SONG_BANNERS,
            value: fromJS(list)
        }
    }
}

export default {
    getBanners() {
        return {
            type: types.SAGA_SONG_BANNERS
        }
    }
}