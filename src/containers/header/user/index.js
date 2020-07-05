/* eslint-disable react/prop-types */
import React, { memo, useMemo, useEffect, useCallback } from 'react'
import styles from './style'
import _paths from 'config/paths'

import { connect } from 'react-redux'
import useToast from 'hooks/useToast'
import { useHistory } from 'react-router-dom'

import Login from './login'
import NotLogin from './not-login'
import { actionsCreator } from 'store/user'

function User(props) {
    const
        { isLogin, userId, theme, toast_imm, userData_imm } = props,
        {
            getIsLogin,
            getMyDetail,
            signIn,
            logout,
            cellphoneLogin,
            emailLogin
        } = props,
        toast = useMemo(() => toast_imm.toJS(), [toast_imm]),
        userData = useMemo(() => userData_imm.toJS(), [userData_imm]),
        history = useHistory(),
        showToast = useToast(2000),
        enterUser = useCallback(e => {
            const userId = userData.userPoint.userId
            history.push(_paths.user + userId)
        }, [history, userData])

    // 提示
    useEffect(() => {
        if (toast.text)
            showToast(toast.text, toast.icon)
    }, [toast])

    useEffect(() => {
        getIsLogin()
    }, [getIsLogin])

    useEffect(() => {
        if (userId && isLogin) {
            getMyDetail(userId)
        }
    }, [userId, isLogin])

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
            toast_imm = user.get('toast'),
            userData_imm = user.get('detail')

        return {
            isLogin,
            userId,
            toast_imm,
            userData_imm,
        }
    },
    mapDispatch = dispatch => ({
        getIsLogin() {
            dispatch(actionsCreator.getIsLogin())
        },
        cellphoneLogin(phone, password) {
            dispatch(actionsCreator.cellphoneLogin(phone, password))
        },
        emailLogin(email, password) {
            dispatch(actionsCreator.emailLogin(email, password))
        },
        signIn() {
            dispatch(actionsCreator.signIn())
        },
        getMyDetail(uid) {
            dispatch(actionsCreator.getMyDetail(uid))
        },
        logout() {
            dispatch(actionsCreator.logout())
        }
    })

export default connect(mapState, mapDispatch)(memo(User))