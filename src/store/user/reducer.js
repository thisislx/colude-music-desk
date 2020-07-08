import types from './types'
import { fromJS } from 'immutable'

export const initState = {
    isLogin: false,
    userId: -1,
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

        case types.CHANGE_MY_DETAIL:
            return state.set('detail', value)

        case types.CHANGE_LOGIN_STATE:
            return state
                .set('userId', value)
                .set('isLogin', true)

        case types.CHANGA_TOAST:
            return state.set('toast', value)

        case types.CHANGE_SIGN_IN_STATE:
            return state.merge('detail', fromJS({ mobileSign: true, pcSign: true }))

        case types.CHANGET_OTHER_USER:
            return state.set('otherUser', value)

        case types.INIT:
            return initState_imm

        default: return state
    }
} 