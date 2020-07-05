import React, { memo, useRef, useEffect, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { computeArtist, computeClockMin } from 'tools/media'
import { _mediaIcons } from 'config/icons'
import _paths from 'config/paths'

import Pad from 'base-ui/pad'

function Playlist(props) {
    const
        { list = [], show = true, currentId, theme, el } = props,
        { changeIndex } = props,
        history = useHistory(),
        padRef = useRef(null),
        clickProxy = useCallback(e => {
            const mvid = e.target.getAttribute('data-mv-id')
            mvid && history.push(_paths.mvPlayer + mvid)
        }, [history]),
        doubleClickProxy = useCallback(e => {
            const index = +e.target.getAttribute('data-index')
            Number.isInteger(index) && changeIndex && changeIndex(index)
        }, [changeIndex])

    useEffect(() => {
        el.current = padRef.current
    }, [padRef, el])

    return (
        <Pad
            el={padRef}
            show={show}
            left={43.5}
            top={29}
            size={36}
            point={36.5}
            width={40}
            direction='bottom'
        >
            {
                list.length ?
                    <header className={styles.header}>
                        <aside> 共{list.length}首</aside>
                        <div>
                            <button>清空</button>
                            <button>收藏全部</button>
                        </div>
                    </header> :
                    <header className={styles.header}>
                        当前你未添加歌曲
                    </header>
            }
            <ol
                onClick={clickProxy}
                onDoubleClick={doubleClickProxy}
                className={styles.list}
            >
                {
                    list.map((song, index) => (
                        <li
                            key={song.id}
                            className={`${styles.songItem} ${theme.backHover_v1} `
                                + (song.id === currentId ? theme.color : '')}
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
        </Pad>
    )
}

Playlist.propTypes = {
    list: PropTypes.array,
    show: PropTypes.bool,
    currentId: PropTypes.number,
    theme: PropTypes.object,
    el: PropTypes.object,
    changeIndex: PropTypes.func,
}
export default memo(Playlist)