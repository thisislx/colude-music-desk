/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import { loopIndex, getBaseUrl } from './config'
import { connect } from 'react-redux'
import { actionsCreator } from 'store/music'
import { throttle } from 'tools'

function Music(props) {
    const
        { currentId, playing, modeIndex, percent, volume, index, nextSong, previousSong } = props,
        { changePercent, changeBuffer, toggleLoading, addCannotPlayList } = props,
        [duration, setDuration] = useState(0),/* 单位s */
        audioRef = useRef(null),
        lastIndex = useRef(0),
        durationChangeHandle = useCallback((e) => {
            setDuration(audioRef.current.duration)
        }, [audioRef]),
        timeUpdateHandle = useCallback(throttle(e => {
            const { currentTime, duration } = audioRef.current
            changePercent((currentTime / duration).toString())
        }, 400), [audioRef, changePercent]),
        canPlayHandle = useCallback(e => {
            addCannotPlayList()
            toggleLoading(false)
        }, [toggleLoading, addCannotPlayList]),
        progressHandle = useCallback(e => {
            const
                timeRanges = e.target.buffered,
                lastIndex = timeRanges.length
            if (lastIndex) {
                const s = timeRanges.end(0)   /* 单位s */
                changeBuffer(s / duration)
            }
        }, [changeBuffer, duration]),
        errHandle = useCallback(e => {
            if (Number.isInteger(currentId)) {
                index > lastIndex.current ? nextSong() : previousSong()
                addCannotPlayList()
            }
        }, [index, lastIndex, nextSong, previousSong, addCannotPlayList, currentId])

    /* 暂停控制 */
    useEffect(() => {
        const audio = audioRef.current
        if (audio.duration > 0) playing ? audio.play() : audio.pause()
    }, [playing, audioRef])

    /* 音量 */
    useEffect(() => {
        audioRef.current.volume = volume
    }, [volume, audioRef])

    /* 进度条 */
    useEffect(() => {
        if (typeof percent === 'number')
            audioRef.current.currentTime = percent * duration
    }, [percent, duration, audioRef])

    return (
        <audio
            ref={audioRef}
            autoPlay={playing}
            loop={modeIndex === loopIndex}
            src={getBaseUrl(currentId)}
            onDurationChange={durationChangeHandle}
            onTimeUpdate={timeUpdateHandle}
            onWaiting={e => toggleLoading(true)}
            onCanPlay={canPlayHandle}
            onEnded={nextSong}
            onError={errHandle}
            onProgress={progressHandle}
        />
    )
}

const
    mapState = state => {
        const
            music = state.get('music'),
            index = music.get('index'),
            playing = music.get('playing'),
            modeIndex = music.getIn(['mode', 'index']),
            percent = music.get('percent'),
            volume = music.get('volume'),
            currentId = music.getIn(['currentSong', 'id'])
        /* urls_imm = music.get('urls') */

        return {
            index,
            playing,
            modeIndex,
            percent,
            volume,
            currentId,

            /* urls_imm, */
        }
    },
    mapDispatch = dispatch => ({
        getUrl(id) {
            dispatch(actionsCreator.getUrl(id))
        },
        changePercent(percent) {
            dispatch(actionsCreator.changePercent(percent))
        },
        toggleLoading(bool) {
            dispatch(actionsCreator.toggleLoading(bool))
        },
        addCannotPlayList() {
            dispatch(actionsCreator.addCannotPlayList())
        },
        nextSong() {
            dispatch(actionsCreator.nextSong())
        },
        previousSong() {
            dispatch(actionsCreator.previousSong())
        },
        changeBuffer(value) {
            dispatch(actionsCreator.changeBuffer(value))
        }
    })
export default connect(mapState, mapDispatch)(memo(Music))