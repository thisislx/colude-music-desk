import types from './types'
import { fromJS } from 'immutable'

/* 下面的大小指 默认大小 */
export const initState = {
    header: {
        height: '3.2rem',
    },
    leftBar: {
        ref: Object.prototype,
        width: '12rem',
    },
    footer: {
        height: '3.2rem',
    },
    rightBar: {
        width: '35rem',
        show: false,
        ref: Object.prototype,
    }
}

export default (state = fromJS(initState), { type, value } = {}) => {
    switch (type) {
        case types.CHANGE_LEFT_BAR_WIDTH:
            return state.setIn(['leftBar', 'width'], value)

        case types.CHANGE_LEFT_BAR_REF:
            return state.setIn(['leftBar', 'ref'], value)

        case types.CHANGE_RIGHT_BAR_SHOW:
            return state.setIn(['rightBar', 'show'],
                value === undefined
                    ? !state.getIn(['rightBar', 'show'])
                    : value
            )

        case types.CHANGE_RIGHT_BAR_REF:
            return state.setIn(['rightBar', 'ref'], value)

        default: return state
    }
}

