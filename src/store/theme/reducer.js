import types from './types'

const initState = {
    name: 'theme-red'
}

export default (state = initState, { type, value }) => {
    switch (type) {
        case types.CHANGE_NAME:
            return { name: value }

        default: return state
    }
}