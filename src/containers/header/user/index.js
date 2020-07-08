/* eslint-disable react/prop-types */
import React, { memo, useMemo, useEffect, useCallback } from 'react'
import styles from './style'
import _paths from 'config/paths'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { actionsCreator as userAc } from 'store/user'

import Login from './login'
import NotLogin from './not-login'

function User(props) {
    const
        { isLogin, userId, theme, } = props,
        {
            getIsLogin,
            getMyDetail,
            signIn,
            logout,
            cellphoneLogin,
            emailLogin
        } = props,
        {userData_imm } = props,
        userData = useMemo(() => userData_imm.toJS(), [userData_imm]),
        history = useHistory(),
        enterUser = useCallback(e => {
            const userId = userData.userPoint.userId
            history.push(_paths.user + userId)
        }, [history, userData])

    useEffect(() => {
        getIsLogin()
    }, [getIsLogin])

    useEffect(() => {
        if (userId && isLogin) {
            getMyDetail(userId)
        }
    }, [userId, isLogin, getMyDetail])

    return (
        <div className={styles.wrap}>
            {
                isLogin ?
                    <Login
                        theme={theme}
                        data={userData}
                        enterUser={enterUser}
                        signIn={signIn}
                        logout={logout}
                    /> :
                    <NotLogin
                        theme={theme}
                        cellphoneLogin={cellphoneLogin}
                        emailLogin={emailLogin}
                    />
            }
        </div>
    )
}

const
    mapState = state => {
        const
            user = state.get('user'),
            isLogin = user.get('isLogin'),
            userId = user.get('userId'),
            userData_imm = user.get('detail')

        return {
            isLogin,
            userId,
            userData_imm,
        }
    },
    mapDispatch = dispatch => ({
        getIsLogin() {
            dispatch(userAc.getIsLogin())
        },
        cellphoneLogin(phone, password) {
            dispatch(userAc.cellphoneLogin(phone, password))
        },
        emailLogin(email, password) {
            dispatch(userAc.emailLogin(email, password))
        },
        signIn() {
            dispatch(userAc.signIn())
        },
        getMyDetail(uid) {
            dispatch(userAc.getMyDetail(uid))
        },
        logout() {
            dispatch(userAc.logout())
        }
    })

export default connect(mapState, mapDispatch)(memo(User))