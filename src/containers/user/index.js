/* eslint-disable react/prop-types */
import React, { memo, useMemo, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { actionsCreator } from 'store/user'
import { actionsCreator as songMenuAc } from 'store/song-menu'
import _paths from 'config/paths'

import UI from './UI'

function User(props) {
    const
        { match: { params: { id } }, history } = props,
        { myId, themeName } = props,
        isMy = myId == id,
        { getOtherUser, getOtherUserMenu, toggleFollowUser } = props,
        { myData_imm, otherUser_imm, myMenu_imm, otherUserMenu_imm, } = props,
        currentData = useMemo(() => (isMy ? myData_imm : otherUser_imm).toJS()
            , [myId, id, myData_imm, otherUser_imm]),
        currentMenu = useMemo(() => (isMy ? myMenu_imm : otherUserMenu_imm).toJS()
            , [myId, id, myMenu_imm, otherUserMenu_imm]),
        enterPlaylist = useCallback(id => {
            id && history.push(_paths.playlist + id)
        }, [history])

    /* 获取用户信息 */
    useEffect(() => {
        if (id != myId) {
            getOtherUser(id)
            getOtherUserMenu(id)
        }
    }, [id, myId, getOtherUser, getOtherUserMenu])

    return (
        <UI
            themeName={themeName}
            currentData={currentData}
            currentMenu={currentMenu}
            isMy={isMy}
            myId={myId}

            toggleFollowUser={toggleFollowUser}
            enterPlaylist={enterPlaylist}
        />
    )
}

const
    mapState = state => {
        const
            themeName = state.getIn(['theme', 'name']),
            user = state.get('user'),
            myId = user.get('userId'),
            myData_imm = user.get('detail'),
            otherUser_imm = user.get('otherUser'),
            songMenu = state.get('songMenu'),
            myMenu_imm = songMenu.get('myMenu'),
            otherUserMenu_imm = songMenu.get('otherUserMenu')

        return {
            themeName,
            myId,

            myData_imm,
            otherUser_imm,
            myMenu_imm,
            otherUserMenu_imm,
        }
    },
    mapDispatch = dispatch => ({
        getOtherUser(uid) {
            dispatch(actionsCreator.getOtherUser(uid))
        },
        toggleFollowUser(uid, followed) {
            dispatch(actionsCreator.toggleFollowUser(uid, followed))
        },
        getOtherUserMenu(uid) {
            dispatch(songMenuAc.getOtherUserMenu(uid))
        },
    })

export default connect(mapState, mapDispatch)(memo(User))