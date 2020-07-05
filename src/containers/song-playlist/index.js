import React, { memo, useRef, useEffect, useCallback, useMemo } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { computeArtist, computeClockMin } from 'tools/media'
import { _mediaIcons } from 'config/icons'
import _paths from 'config/paths'
import { _wrapWidth } from './config'
import { connect } from 'react-redux'
import { actionsCreator as musicAc } from 'store/music'
import { actionsCreator as layoutAc } from 'store/layout'
import useTheme from 'hooks/useTheme'

function Playlist(props) {
    const
        { currentIndex, themeName, el, headerHeight, show } = props,
        { changePlayIndex, changeSongPlaylistRef } = props,
        { playlist_imm } = props,
        playlist = useMemo(() => playlist_imm.toJS(), [playlist_imm]),
        history = useHistory(),
        theme = useTheme(themeName),
        wrapRef = useRef(null),
        controlWidthRef = useRef(null),
        clickProxy = useCallback(e => {
            const mvid = e.target.getAttribute('data-mv-id')
            mvid && history.push(_paths.mvPlayer + mvid)
        }, [history]),
        doubleClickProxy = useCallback(e => {
            const index = +e.target.getAttribute('data-index')
            Number.isInteger(index) && changePlayIndex(index)
        }, [changePlayIndex])

    useEffect(() => {
        if (el) {
            el.current.wrap.current = wrapRef.current
            el.current.control.current = controlWidthRef.current
        }
        changeSongPlaylistRef(wrapRef)
    }, [wrapRef, controlWidthRef, el, changeSongPlaylistRef])

    useEffect(() => {
        wrapRef.current.style.top = headerHeight
    }, [headerHeight, wrapRef])

    useEffect(() => {
        const
            el = wrapRef.current,
            transition = 'transition-duration: .4s;'
        requestAnimationFrame(() => {
            if (show) el.style.cssText = `width:${_wrapWidth};overflow-y: auto; ${transition}`
            else el.style.cssText = `width:0;overflow: hidden; ${transition} `
        })
        setTimeout(() => {
            el.style.transitionDuration = '0s'
        }, 1000)
    }, [show, wrapRef])

    return (
        <div
            className={`${styles.wrap} ${theme.back_r2} ${theme.fontColor_v1}`}
            ref={wrapRef}
        >
            {
                playlist.length ?
                    <header >
                        <aside> 共{playlist.length}首</aside>
                        <div>
                            <button>清空</button>
                            <button>收藏全部</button>
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
                    playlist.map((song, index) => (
                        <li
                            key={song.id}
                            className={`${styles.songItem} ${theme.backHover_v1} `
                                + (index === currentIndex ? theme.color : '')}
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
                    ))
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
            playlist_imm = music.get('playlist')

        return {
            themeName: state.getIn(['theme', 'name']),
            show: state.getIn(['layout', 'songPlaylist', 'show']),
            headerHeight: state.getIn(['layout', 'header', 'height']),
            currentIndex,
            playlist_imm,
        }
    },
    mapDispatch = dispatch => ({
        changePlayIndex(index) {
            dispatch(musicAc.changeIndex(index))
        },
        changeSongPlaylistRef(ref) {
            dispatch(layoutAc.changeSongPlaylistRef(ref))
        }
    })


Playlist.propTypes = {
    show: PropTypes.bool,
    themeName: PropTypes.string,
    headerHeight: PropTypes.string,
    currentIndex: PropTypes.number,
    playlist_imm: PropTypes.object,
    el: PropTypes.object,
    changePlayIndex: PropTypes.func,
    changeSongPlaylistRef: PropTypes.func,
}

export default connect(mapState, mapDispatch)(memo(Playlist))