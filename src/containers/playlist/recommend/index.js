/* eslint-disable react/prop-types */
import React, { memo, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _recommendConfig, _collectName } from '../config'
import _icons from 'config/icons'

import Songs from 'components/songs'
import PlayAllBtn from '../btns/playAll'
import CommonBtn from '../btns/common'

import recommend_img from 'assets/imgs/everyday-recommend.jpg'

function Recommend(props) {
    const
        { songs, theme, onPlay, onCollect, currentSongId } = props,
        playHandle = useCallback(index => {
            onPlay && onPlay(index)
        }, [onPlay]),
        collectHandle = useCallback(() => {

        }, [onCollect])

    return (
        <>
            <header className={styles.header}>
                <img src={recommend_img} />
                <h1>{_recommendConfig.title}</h1>
                <p>{_recommendConfig.desc}</p>
            </header>

            <article className={`${styles.article} ${theme.border_v1}`}>
                <header className={styles.btns}>
                    <PlayAllBtn />
                    <CommonBtn
                        icon={_icons.collect.icon}
                        name={_collectName}
                    />
                </header>
                <Songs list={songs} onDoubleClick={playHandle} currentId={currentSongId} />
            </article>
        </>
    )
}

Recommend.propTypes = {
    songs: PropTypes.array,
    theme: PropTypes.object,
    onPlay: PropTypes.func,
    onCollect: PropTypes.func,
    currentSongId: PropTypes.number,
}


export default memo(Recommend)