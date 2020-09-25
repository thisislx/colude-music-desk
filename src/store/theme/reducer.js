import types from './types'
import Ls from 'tools/LocalStorage'
import themeConfig from '../../config/theme'
const _ls = new Ls('theme')

const initState = {
    name: _ls.get('name') || themeConfig[2][1]
}

export default (state = initState, { type, value }) => {
    switch (type) {
        case types.CHANGE_NAME:
            _ls.set(value, 'name')
            return { name: value }

        default: return state
    }
}