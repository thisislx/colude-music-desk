import React, { memo, useEffect, useMemo, useRef, useState, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _fullShowBarTime } from './config'
import _icons, { _mediaIcons } from 'config/icons'
import { computeClockMin } from 'tools/media'
import { debounce, throttle } from 'tools'
import { _toFullScreen, _exitFullScreen, _isFullScreen } from 'tools/dom'
import { connect } from 'react-redux'
import { actionsCreator as videoAC } from 'store/video'

import Barrage from 'components/barrage'
import Progress from 'base-ui/progress'

function Video(props) {
    const
        { url, height, playing } = props,
        { getUrl, togglePlaying } = props,
        { data_imm, barrage_imm } = props,
        data = useMemo(() => data_imm.toJS(), [data_imm]),
        barrage = useMemo(() => barrage_imm.toJS(), [barrage_imm]),
        { id } = data,
        [percent, setPercent] = useState(0),    /* 进度 */
        [volume, setVolume] = useState(1),
        [loading, setLoading] = useState(true),
        [buffer, setBuffer] = useState(0),
        [duration, setDuration] = useState(0),      /* 单位s */
        [isFull, setIsFull] = useState(false),      /* 处于全屏 */
        [showBar, setShowBar] = useState(false),
        [showBarrage, setShowBarrage] = useState(true),
        currentSecond = duration * percent,
        wrapRef = useRef(null),
        videoRef = useRef(null),
        localPercentChange = useRef(false),             /* 视频自然播放 */
        tiemUpdateHandle = useCallback(throttle(e => {
            if (duration) {
                localPercentChange.current = true
                setPercent(e.target.currentTime / duration)
            }
        }, 200), [localPercentChange, duration]),
        progressHandle = useCallback(throttle(e => {
            const buffer = videoRef.current.buffered
            if (buffer.length) {
                setBuffer(buffer.end(buffer.length - 1) / duration)
            }
        }, 200), [duration, videoRef]),
        canplayHandle = useCallback(e => {
            const el = e.target
            setDuration(el.duration)
            setLoading(false)
            playing && el.play()
        }, [playing]),
        togglePlayingHandle = useCallback(e => {
            togglePlaying()
        }, [togglePlaying]),
        contextMenuVideoHandle = useCallback(e => {
            // e.preventDefault()
            // e.stopPropagation()
        }, []),
        fullVideoHanle = useCallback(e => {
            if (_isFullScreen()) {
                setIsFull(false)
                _exitFullScreen(wrapRef.current)
            }
            else {
                setIsFull(true)
                _toFullScreen(wrapRef.current)
            }
        }, [wrapRef]),
        fullBarHandle = useCallback(debounce(function inner__() {
            /* 全屏控制上下bar */
            if (inner__.sid) clearTimeout(inner__.sid)
            setShowBar(true)
            inner__.sid = setTimeout(() => {
                setShowBar(false)
            }, _fullShowBarTime)
        }, 200), [])

    /* 播放暂停 */
    useEffect(() => {
        const el = videoRef.current
        if (el.duration) {
            videoRef.current[playing ? 'play' : 'pause']()
        }
    }, [playing, videoRef])

    /* 进度控制 */
    useEffect(() => {
        if (localPercentChange.current) localPercentChange.current = false
        else if (duration) videoRef.current.currentTime = currentSecond
    }, [currentSecond, duration, videoRef, localPercentChange])

    /* 音量控制 */
    useEffect(() => {
        videoRef.current.volume = volume
    }, [volume, videoRef])

    /* 请求url */
    useEffect(() => {
        getUrl(id)
    }, [id, getUrl])

    /* 视频变动 */
    useEffect(() => {
        setBuffer(0)
        setLoading(true)
        setPercent(0)
    }, [id])

    /* 全屏隐藏显式bar */
    useEffect(() => {
        if (isFull)
            window.addEventListener('mousemove', fullBarHandle)
        else window.removeEventListener('mousemove', fullBarHandle)
        return () => window.removeEventListener('mousemove', fullBarHandle)
    }, [isFull, fullBarHandle])

    return (
        <div className={`${styles.wrap}`} ref={wrapRef} >
            <header
                className={showBar ? '' : styles.hide}
            >
                <h2>{data.name}</h2>
            </header>
            <main
                className={styles.videoWrap}
                onClick={togglePlayingHandle}
                onContextMenu={contextMenuVideoHandle}
            >
                <video
                    ref={videoRef}
                    onTimeUpdate={tiemUpdateHandle}
                    src={url}
                    onCanPlay={canplayHandle}
                    onWaiting={e => setLoading(true)}
                    onProgress={progressHandle}
                    style={height ? { height: `${height}rem` } : null}
                />

                {
                    showBarrage ?
                        <Barrage
                            data={barrage}
                            second={currentSecond}
                            playing={playing}
                        /> : null
                }
            </main>

            <footer
                className={showBar ? '' : styles.hide}
            >
                <Progress
                    onChange={setPercent}
                    value={percent}
                    loading={loading}
                    buffer={buffer}
                />

                <section className={`${styles.controls}`}>
                    <section>
                        <span
                            onClick={togglePlayingHandle}
                            className={`${_mediaIcons.control.className}`}
                            dangerouslySetInnerHTML={{ __html: _mediaIcons.control.icon(playing) }}
                        >
                        </span>
                        <span className={`${styles.playTime}`}>
                            {computeClockMin(currentSecond * 1000)} / {computeClockMin(duration * 1000)}
                        </span>
                    </section>

                    <section className={styles.controlR}>
                        <div className={styles.volumeControl}>
                            <Progress value={volume} onChange={setVolume} pointer={false} />
                        </div>
                        <span
                            onClick={fullVideoHanle}
                            dangerouslySetInnerHTML={{ __html: _icons.full.icon }}
                            className={`${_icons.full.className}`}
                        ></span>
                    </section>
                </section>
            </footer>
        </div>
    )
}

Video.propTypes = {
    height: PropTypes.number,   /* 外部传入(视频高度) @default(css样式表)*/

    playing: PropTypes.bool,
    url: PropTypes.string,
    getUrl: PropTypes.func,
    togglePlaying: PropTypes.func,
    data_imm: PropTypes.object,
    barrage_imm: PropTypes.object,
}

const
    mapState = state => {
        const
            video = state.get('video'),
            playing = video.get('playing'),
            url = video.get('currentUrl'),
            data_imm = video.get('data'),
            barrage_imm = video.get('barrage')

        return {
            playing,
            url,
            data_imm,
            barrage_imm,
        }
    },
    mapDispatch = dispatch => ({
        togglePlaying(bool) {
            return dispatch(videoAC.togglePlaying(bool))
        },
        getUrl(id) {
            dispatch(videoAC.getUrl(id))
        }
    })

export default connect(mapState, mapDispatch)(memo(Video))