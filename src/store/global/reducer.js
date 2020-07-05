import types from './types'
import { fromJS } from 'immutable'

export const initState = {
    loading: {
        is: false,
        text: '',
    },
    toast: {
        is: false,
        icon: '',    //'true' 'err'  ''
        text: ''
    },
    confirm: {
        is: false,
        text: '',
        cb: null,
    },
}

export default (state = fromJS(initState), { type, value } = {}) => {
    switch (type) {
        case types.TOGGLE_LOADING:
            return state.set('loading', value)

        case types.CHANGE_TOAST:
            return state.set('toast', value)

        case types.SHOW_CONFIRM:
            return state.set('confirm', value)

        case types.CHANGE_LEFT_BAR_WIDTH:
            return state.setIn(['layout', 'leftBarWidth'], value)

        case types.CHANGE_LEFT_BAR_REF:
            return state.set('leftBarRef', value)

        default: return state
    }
}

