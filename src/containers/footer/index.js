/* eslint-disable react/prop-types */
import React, { memo, useMemo, useCallback, useEffect, useRef } from 'react'
import styles from './style'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'
import { _percentConfig, _volumePercentConfig } from './config'
import { _mediaIcons } from 'config/icons'
import { computeClockMin } from 'tools/media'
import { actionsCreator as musicAc } from 'store/music'
import { actionsCreator as layoutAc } from 'store/layout'

import Progress from 'base-ui/progress'

let _silenceAgo = 0    /* 静音恢复 */
function Footer(props) {
    const
        { themeName, playing, volume, playPercent, playLoading, buffer, playModeIcon } = props,
        {
            togglePlaying, changePercent, changeVolume,
            changePlayMode, nextSong, previousSong,
            changeRightBarShow,
        } = props,
        { currentSong_imm } = props,
        currentSong = useMemo(() => currentSong_imm.toJS(), [currentSong_imm]),
        theme = useTheme(themeName),
        endTime = useMemo(() => computeClockMin(currentSong.dt), [currentSong]),
        currentTime = useMemo(() => computeClockMin(currentSong.dt * playPercent), [currentSong, playPercent]),
        silenceHandle = useCallback((e) => {
            /* 点击音量图标 */
            if (volume) {
                _silenceAgo = volume
                changeVolume(0)
            } else changeVolume(_silenceAgo)
        }, [volume, changeVolume]),
        changingPlayProgressHandle = useCallback(bool => {
            if (bool) changeVolume(_silenceAgo)
            else {
                _silenceAgo = volume
                changeVolume(0)
            }
        }, [changeVolume, volume])

    return (
        <footer className={`${styles.wrap} ${theme.back_r3} ${theme.border_v1} ${theme.fontColor_v1}`}>
            <section className={styles.playControl}>
                <span
                    onClick={previousSong}
                    className={`${_mediaIcons.previous.className} ${theme}`}
                    dangerouslySetInnerHTML={{ __html: _mediaIcons.previous.icon }}
                ></span>
                <span
                    onClick={e => togglePlaying()}
                    className={`${_mediaIcons.control.className} ${theme}`}
                    dangerouslySetInnerHTML={{ __html: _mediaIcons.control.icon(playing) }}
                ></span>
                <span
                    onClick={nextSong}
                    className={`${_mediaIcons.next.className} ${theme}`}
                    dangerouslySetInnerHTML={{ __html: _mediaIcons.next.icon }}
                ></span>
            </section>
            <section
                className={`${styles.progress} pointer`}
                style={_percentConfig.style}
            >
                <span>{currentTime}</span>
                <div className={styles.container}>
                    <Progress
                        onChange={changePercent}
                        value={playPercent}
                        loading={playLoading}
                        buffer={buffer}
                        onChanging={changingPlayProgressHandle}
                    />
                </div>
                <span>{endTime}</span>
            </section>

            {/* 音量 */}
            <section
                className={styles.progress}
                style={_volumePercentConfig.style}
            >
                <span
                    onClick={silenceHandle}
                    className={`${_mediaIcons.volume.className} `}
                    dangerouslySetInnerHTML={{ __html: _mediaIcons.volume.icon }}></span>
                <div className={styles.container}>
                    <Progress onChange={changeVolume} pointer={false} value={volume} />
                </div>

            </section>

            <span
                className={`${_mediaIcons.volume.className} ${styles.miniIcons}`}
                dangerouslySetInnerHTML={{ __html: playModeIcon }}
                onClick={changePlayMode}
            ></span>

            <span
                onClick={e => changeRightBarShow(true)}
                className={`${_mediaIcons.playlist.className} ${styles.miniIcons}`}
                dangerouslySetInnerHTML={{ __html: _mediaIcons.playlist.icon }}
            ></span>
        </footer>
    )
}

const
    mapState = state => {
        const
            themeName = state.getIn(['theme', 'name']),
            music = state.get('music'),
            playing = music.get('playing'),
            playPercent = music.get('percent'),
            playLoading = music.get('loading'),
            songList_imm = music.get('list'),
            volume = music.get('volume'),
            buffer = music.get('buffer'),
            playModeIcon = music.getIn(['mode', 'icon']),
            currentSong_imm = music.get('currentSong')

        return {
            themeName,
            playPercent,
            playing,
            volume,
            playLoading,
            buffer,

            playModeIcon,
            songList_imm,
            currentSong_imm,
        }
    },
    mapDispatch = dispatch => ({
        togglePlaying(bool) {
            dispatch(musicAc.togglePlaying(bool))
        },
        changePercent(percent) {
            dispatch(musicAc.changePercent(percent))
        },
        changeVolume(volume) {
            dispatch(musicAc.changeVolume(volume))
        },
        changePlayMode() {
            dispatch(musicAc.changeMode())
        },
        nextSong() {
            dispatch(musicAc.nextSong())
        },
        previousSong() {
            dispatch(musicAc.previousSong())
        },
        changeIndex(index) {
            dispatch(musicAc.changeIndex(index))
        },
        changeRightBarShow(bool) {
            dispatch(layoutAc.changeRightBarShow(bool))
        }
    })

export default connect(mapState, mapDispatch)(memo(Footer))