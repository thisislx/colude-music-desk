import types from './types'
import immutable, { fromJS } from 'immutable'
import { initState } from './reducer'

const
    creator = {
        init() {
            return {
                type: types.INIT,
            }
        }
    },
    sagas = {
        getIsLogin() {
            return {
                type: types.SAGA_IS_LOGIN
            }
        },
        cellphoneLogin(phone, password) {
            return {
                type: types.SAGA_CELLPHONE_LOGIN,
                value: {
                    phone,
                    password
                }
            }
        },
        emailLogin(email, password) {
            return {
                type: types.SAGA_EMAIL_LOGIN,
                value: {
                    email,
                    password
                }
            }
        },
        logout() {
            return {
                type: types.SAGA_LOGOUT
            }
        },
        signIn() {
            return {
                type: types.SAGA_SIGN_IN
            }
        },
        getMyDetail(uid) {     
            return {
                type: types.SAGA_GET_MY_DETAIL,
                value: uid
            }
        },
        getOtherUser(uid) {
            return {
                type: types.SAGA_GET_OTHER_USER,
                value: uid,
            }
        },
        toggleFollowUser(uid, followed) {
            return {
                type: types.SAGA_FOLLOW_STATE,
                value: [uid, followed]
            }
        },
    }

export const assist = {
    init: creator.init,

    changeMyDetail(data) {
        return {
            type: types.CHANGE_MY_DETAIL,
            value: fromJS(data)
        }
    },
    changeSignInState() {
        return {
            type: types.CHANGE_SIGN_IN_STATE
        }
    },
    changeOtherUser(data) {
        return {
            type: types.CHANGET_OTHER_USER,
            value: immutable.isMap(data) ? data : fromJS(data)
        }
    },
    changeLoginState(userId) {
        return {
            type: types.CHANGE_LOGIN_STATE,
            value: userId
        }
    }
}

export default sagas