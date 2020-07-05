import types from './types'
import { fromJS } from 'immutable'

export const initState = {
    isLogin: false,
    userId: -1,
    toast: {
        text: ''
    },
    detail: {      /* 我的信息 */
        profile: { /*更多详细信息*/ }
    },
    otherUser: {

    },
}
const initState_imm = fromJS(initState)

export default (state = initState_imm, { type, value }) => {
    switch (type) {
        case types.GET_IS_LOGIN:
            return state.set('isLogin', value)

        case types.GET_DETAIL:
            return state.set('detail', value)

        case types.CHANGE_USER_ID:
            return state.set('userId', value)

        case types.CHANGA_TOAST:
            return state.set('toast', value)

        case types.CHANGE_SIGN_IN_STATE:
            return state.mergeIn(['detail'], fromJS({ mobileSign: true, pcSign: true }))

        case types.CHANGET_OTHER_USER:
            return state.set('otherUser', value)

        default: return state
    }
} 