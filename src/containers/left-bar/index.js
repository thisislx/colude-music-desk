/* eslint-disable react/prop-types */
import React, { memo, useMemo, useEffect, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './style'
import { _songMenuConfig, _likeMenuIndex, _wrapMaxWidth } from './config'
import { connect } from 'react-redux'
import { actionsCreator as songMenuAc } from 'store/song-menu'
import { actionsCreator as layoutAc } from 'store/layout'
import useTheme from 'hooks/useTheme'
import useDomMove from 'hooks/useDomMove'
import { useHistory } from 'react-router-dom'
import _paths from 'config/paths'
import Collapse from 'base-ui/collapse'
import MusicData from './music-data'

function LeftBar(props) {
    const
        { onWidthChange } = props,
        { userId, currentMenuId, themeName, headerHeight, footerHeight, leftBarWidth } = props,
        { getMySongMenu, cleanMySongMenu, changeLeftBarRef } = props,
        { mySongMenu_imm, currentSong_imm } = props,
        mySongMenu = useMemo(() => mySongMenu_imm.toJS(), [mySongMenu_imm]),
        currentSong = useMemo(() => currentSong_imm.toJS(), [currentSong_imm]),
        [active, setActive] = useState([-1, -1]),    // 0号分组， 第-1个
        theme = useTheme(themeName),
        history = useHistory(),
        wrapRef = useRef(null),
        controlWidthRef = useRef(null),
        enterPlaylist = useCallback((plank, index) => {
            const
                property = _songMenuConfig[plank].property,
                targetMenu = mySongMenu[property][index]
            setActive([plank, index])
            history.push(_paths.playlist + targetMenu.id)
        }, [mySongMenu, history]),
        entryPlayer = useCallback(() => {
            history.push(_paths.player)
        }, [history]),
        getActive = useCallback((id) => {
            for (let i = 0, len = _songMenuConfig.length; i < len; i++) {
                const curMenu = mySongMenu[_songMenuConfig[i].property]
                for (let k = 0, limit = curMenu.length; k < limit; k++) {
                    if (curMenu[k].id === id) return [i, k]
                }
            }
            return [-1, -1]
        }, [mySongMenu]),
        wrapMoveHandle = useCallback(width => {
            if (width <= _wrapMaxWidth) {
                wrapRef.current.style.width = width + 'px'
                onWidthChange && onWidthChange(width)
            }
        }, [wrapRef, onWidthChange])

    useDomMove(wrapMoveHandle, [wrapRef, controlWidthRef])

    useEffect(() => {
        if (~userId) getMySongMenu(userId)
        else cleanMySongMenu()
    }, [userId])

    useEffect(() => {
        setActive(getActive(currentMenuId))
    }, [currentMenuId, getActive])


    /* 仅一次更新width */
    useEffect(() => {
        wrapRef.current.style.width = leftBarWidth
        changeLeftBarRef(wrapRef)
    }, [changeLeftBarRef, wrapRef])

    /* 更新距离顶部与底部距离 */
    useEffect(() => {
        wrapRef.current.style.cssText =
            `top: ${headerHeight};bottom: ${footerHeight};`
    }, [headerHeight, footerHeight])

    return createPortal(
        <div
            className={`${styles.wrap} ${styles.enterAmt} ${theme.border_v1} ${theme.back_r2}`}
            ref={wrapRef}
        >
            <article>
                {
                    _songMenuConfig.map((item, key) => (
                        <Collapse
                            key={key}
                            title={item.title}
                            defaultOpen={userId ? true : false}
                            active={active[0] === key ? active[1] : -1}
                            onClick={idx => {
                                enterPlaylist(key, idx)
                            }}
                            list={mySongMenu[item.property]}
                        />
                    ))
                }
            </article>
            <aside
                className={`${styles.controlWidth} entend-click`}
                ref={controlWidthRef}
            >
            </aside>

            {
                currentSong.id ?
                    <MusicData
                        img={currentSong.al.picUrl}
                        name={currentSong.name}
                        artist={currentSong.ar}
                        theme={theme}
                        isLike={false}  //带完善
                        onClickImg={entryPlayer}
                    /> : null
            }
        </div>, app
    )
}
const
    mapState = state => {
        const
            songMenu = state.get('songMenu'),
            mySongMenu_imm = songMenu.get('myMenu'),
            currentMenuId = songMenu.getIn(['currentMenu', 'id']),
            userId = state.getIn(['user', 'userId']),
            themeName = state.getIn(['theme', 'name']),
            currentSong_imm = state.getIn(['music', 'currentSong']),
            layout = state.get('layout'),
            headerHeight = layout.getIn(['header', 'height']),
            footerHeight = layout.getIn(['footer', 'height']),
            leftBarWidth = layout.getIn(['leftBar'], 'width')

        return {
            userId,
            themeName,
            currentMenuId,
            headerHeight,
            footerHeight,
            leftBarWidth,

            mySongMenu_imm,
            currentSong_imm,
        }
    },
    mapDispatch = dispatch => ({
        getMySongMenu(userId) {
            dispatch(songMenuAc.getMyMenu(userId))
        },
        cleanMySongMenu() {
            dispatch(songMenuAc.cleanMyMenu())
        },
        changeLeftBarRef(ref) {
            dispatch(layoutAc.changeLeftBarRef(ref))
        }
    })


export default connect(mapState, mapDispatch)(memo(LeftBar))