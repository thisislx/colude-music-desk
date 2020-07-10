import { put, takeEvery, select } from 'redux-saga/effects'
import types from './types'
import { assist } from './actionsCreator'
import { User } from 'http'
import Messager from 'tools/Messager'

const
    user = new User(),
    _messager = new Messager(2001100)

export default function* () {
    yield takeEvery(types.SAGA_IS_LOGIN, getIsLogin)
    yield takeEvery(types.SAGA_CELLPHONE_LOGIN, cellphoneLogin)
    yield takeEvery(types.SAGA_EMAIL_LOGIN, emailLogin)
    yield takeEvery(types.SAGA_LOGOUT, logout)
    yield takeEvery(types.SAGA_SIGN_IN, signIn)
    yield takeEvery(types.SAGA_GET_MY_DETAIL, getMyDetail)
    yield takeEvery(types.SAGA_GET_OTHER_USER, getOtherUser)
    yield takeEvery(types.SAGA_FOLLOW_STATE, toggleFollowUser)
}

function* getIsLogin() {
    try {
        const res = yield user.isLogin()
        yield put(assist.changeLoginState(res.profile.userId))
    } catch (e) {
        console.log('未登录')
    }
}
function* cellphoneLogin({ value: { phone, password } }) {
    const res = yield user.cellphoneLogin(phone, password)
    if (res.code >= 200 && res.code < 300) {
        yield put(assist.changeLoginState(res.profile.userId))
    } else {
        // yield put(assist.changeToast(res.msg, 'err'))
    }
}
function* emailLogin({ value: { email, password } }) {
    const res = yield user.emailLogin(email, password)
    console.log(res)
    if (res.code === 200) {
        yield put(assist.changeLoginState(res.profile.userId))
    } else 1// yield put(assist.changeToast(res.msg, 'err'))
}
function* logout() {
    yield user.logout()
    yield put(assist.init())
}
function* signIn() {
    try {
        const resArr = yield user.signIn()
        _messager.push(`积分+ ${resArr.reduce((prev, cur) => prev + cur.point, 0)}`)
        yield put(assist.changeSignInState())
    } catch (err) {
        _messager.pushErr('签到失败')
    }
}
function* getMyDetail({ value: uid }) {
    const res = yield user.getDetail(uid)
    yield put(assist.changeMyDetail(res))
}
function* getOtherUser({ value: uid }) {
    const res = yield user.getDetail(uid)
    yield put(assist.changeOtherUser(res))
}
function* toggleFollowUser({ value: [uid, followed] }) {
    try {
        yield user.toggleFollowUser(uid, followed)
    } catch (e) {
        _messager.pushErr(followed ? '取消失败' : '关注失败')
    }
    const otherUser = yield select(state => state.getIn(['user', 'otherUser']))
    if (otherUser.getIn(['profile', 'userId']) == uid)
        yield put(assist.changeOtherUser(
            otherUser.setIn(['profile', 'followed'], !followed)
        ))
    _messager.push(followed ? '取消关注' : '已关注')
}