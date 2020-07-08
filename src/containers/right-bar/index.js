import React, { memo, useRef, useEffect, useCallback, useMemo, createRef } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { debounce } from 'tools'
import { computeArtist, computeClockMin } from 'tools/media'
import { _mediaIcons } from 'config/icons'
import _paths from 'config/paths'
import { _wrapMaxWidth, _wrapMinLimit } from './config'
import { connect } from 'react-redux'
import { actionsCreator as musicAc } from 'store/music'
import { actionsCreator as layoutAc } from 'store/layout'
import useTheme from 'hooks/useTheme'
import useClick from 'hooks/useClick'
import useDomMove from 'hooks/useDomMove'

function RightBar(props) {
    const
        { currentIndex, themeName, headerHeight, footerHeight, show } = props,
        { changePlayIndex, changeRightBarRef, changeRightBarShow } = props,
        { playlist_imm } = props,
        playlist = useMemo(() => playlist_imm.toJS(), [playlist_imm]),
        history = useHistory(),
        wrapRef = useRef(null),
        lockScroll = useRef(false),     /* 锁住切歌的进度条跳跃 */
        controlWidthRef = useRef(null),
        songLines = useRef(new Map()),
        theme = useTheme(themeName),
        [listener, closeListener] = useClick(bool => {
            if (!bool) changeRightBarShow(false)
        }, [wrapRef, changeRightBarShow]),
        clickProxy = useCallback(e => {
            const mvid = e.target.getAttribute('data-mv-id')
            mvid && history.push(_paths.mvPlayer + mvid)
        }, [history]),
        doubleClickProxy = useCallback(e => {
            const index = +e.target.getAttribute('data-index')
            if (Number.isInteger(index)) {
                changePlayIndex(index)
                lockScroll.current = true
            }
        }, [changePlayIndex, lockScroll]),
        wrapMoveHandle = useCallback(width => {
            if (width <= _wrapMaxWidth)
                wrapRef.current.style.width = (width < _wrapMinLimit ? 0 : width) + 'px'
        }, [wrapRef]),
        wrapMoveEndHandle = useCallback(debounce(() => {
            wrapRef.current.classList[
                wrapRef.current.offsetWidth < _wrapMinLimit ? 'add' : 'remove'
            ](styles.hide)
        }, 100), [wrapRef])
    useDomMove(wrapMoveHandle, [wrapRef, controlWidthRef], wrapMoveEndHandle, 'right')

    useEffect(() => {
        wrapRef.current.style.cssText +=
            `top: ${headerHeight}; bottom: ${footerHeight};`
    }, [headerHeight, footerHeight, wrapRef])

    useEffect(() => {
        const
            el = wrapRef.current,
            transition = 'transition-duration: .5s;'

        requestAnimationFrame(() => {
            if (show) {
                el.classList.remove(styles.hide)
                el.style.cssText += `width:${_wrapMaxWidth}px; ${transition}`
            } else {
                el.classList.add(styles.hide)
                el.style.cssText += `width:0; ${transition} `
            }
        })
        setTimeout(() => {
            el.style.transitionDuration = '0s'
        }, 1000)
    }, [show, wrapRef])

    useEffect(() => {
        if (show) listener()
        else closeListener()
        return () => closeListener()
    }, [show, listener, closeListener])

    useEffect(() => {
        if (lockScroll.current) lockScroll.current = false
        else {
            const ref = songLines.current.get(currentIndex)
            ref.current && ref.current.scrollIntoView(false)
        }
    }, [currentIndex, songLines, playlist, lockScroll])

    return (
        <div
            className={`${styles.wrap} ${theme.back_r2} ${theme.fontColor_v1} !${styles.hide}`}
            ref={wrapRef}
        >
            {
                playlist.length ?
                    <header>
                        <aside> 共{playlist.length}首</aside>
                        <div className={theme.fontColor_v2}>
                            <button className={`pointer ${theme.border_v1} ${theme.backHover_r2}`}>清空</button>
                            <button className={`pointer ${theme.border_v1} ${theme.backHover_r2}`} >收藏全部</button>
                        </div>
                    </header> :
                    <header >
                        当前你未添加歌曲
                    </header>
            }
            <ol
                onClick={clickProxy}
                onDoubleClick={doubleClickProxy}
                className={styles.list}
            >
                <span className={`${styles.control} ${theme}`} ref={controlWidthRef}></span>
                {
                    playlist.map((song, index) => {
                        const sl = songLines.current
                        if (song) {
                            const el = createRef(null)
                            sl.set(index, el)
                            return (
                                <li
                                    ref={el}
                                    key={song.id}
                                    className={`${styles.songItem} ${theme.backHover_v1} `}

                                >
                                    <section
                                        data-index={index}
                                        className={`no-wrap ${styles.itemLeft} pointer`}
                                    >
                                        {song.name}
                                        {
                                            song.mv ?
                                                <span
                                                    data-mv-id={song.mv}
                                                    className={`${styles.mv} ${_mediaIcons.mv.className} ${theme.textHover_v1}`}
                                                    dangerouslySetInnerHTML={{ __html: _mediaIcons.mv.icon }}
                                                >
                                                </span> : null
                                        }
                                    </section>
                                    <span
                                        className={`no-wrap pointer ${styles.artist}`}
                                        data-index={index}
                                    >
                                        {computeArtist(song.ar)}
                                    </span>

                                    <span className={`${styles.source} pointer`} data-index={index} >source</span>
                                    <span className={`${styles.duration}`} data-index={index}>
                                        {computeClockMin(song.dt)}
                                    </span>
                                </li>
                            )
                        }
                    })
                }
            </ol>
        </div >
    )
}


const
    mapState = state => {
        const
            music = state.get('music'),
            currentIndex = music.get('index'),
            playlist_imm = music.get('playlist'),
            layout = state.get('layout'),
            headerHeight = layout.getIn(['header', 'height']),
            footerHeight = layout.getIn(['footer', 'height'])

        return {
            themeName: state.getIn(['theme', 'name']),
            show: state.getIn(['layout', 'rightBar', 'show']),
            headerHeight,
            footerHeight,
            currentIndex,
            playlist_imm,
        }
    },
    mapDispatch = dispatch => ({
        changePlayIndex(index) {
            dispatch(musicAc.changeIndex(index))
        },
        changeRightBarRef(ref) {
            dispatch(layoutAc.changeRightBarRef(ref))
        },
        changeRightBarShow(bool) {
            dispatch(layoutAc.changeRightBarShow(bool))
        }
    })


RightBar.propTypes = {
    show: PropTypes.bool,
    themeName: PropTypes.string,
    headerHeight: PropTypes.string,
    footerHeight: PropTypes.string,
    currentIndex: PropTypes.number,
    playlist_imm: PropTypes.object,
    el: PropTypes.object,
    changePlayIndex: PropTypes.func,
    changeRightBarRef: PropTypes.func,
    changeRightBarShow: PropTypes.func,
}

export default connect(mapState, mapDispatch)(memo(RightBar))