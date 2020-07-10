import types from './types'
import Ls from 'tools/LocalStorage'
const _ls = new Ls('theme')

const initState = {
    name: _ls.get('name') || 'theme-red'
}

export default (state = initState, { type, value }) => {
    switch (type) {
        case types.CHANGE_NAME:
            _ls.set(value, 'name')
            return { name: value }

        default: return state
    }
}