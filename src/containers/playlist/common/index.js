/* eslint-disable react/prop-types */
import React, { memo, useCallback, useState } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _imgSizeConfig, _collectName } from '../config'
import _icons from 'config/icons'
import { computeClockYear } from 'tools/media'
import PlayAllBtn from '../btns/playAll'
import CommonBtn from '../btns/common'
import Songs from 'components/songs'
import Triangle from 'base-ui/triangle-icon'

function Common(props) {
    const
        { songs, theme, currentSongId, data } = props,
        { onPlay, onCollect } = props,
        [isMoreDesc, setIsMoreDesc] = useState(false),
        collectHandle = useCallback(() => {

        }, [onCollect])

    return (
        <>
            <header className={styles.header}>
                <img src={data.coverImgUrl + _imgSizeConfig.cover} />

                <section className={styles.headerR}>
                    <header>
                        <h2>{data.name}</h2>
                        <div className={styles.creator}>
                            <section>
                                <img src={data.creator.avatarUrl + _imgSizeConfig.avatar} />
                                <span className={`${theme.fontColor_v2} pointer`}>{data.creator.nickname}</span>
                            </section>
                            <span className={`${styles.createTime} ${theme.fontColor_v1}`}>
                                {computeClockYear(data.createTime)}创建
                            </span>
                        </div>
                        <div className={`${styles.count} ${theme.fontColor_v1}`}>
                            <section>
                                歌曲数
                        <span>122</span>
                            </section>
                            <section className={theme.border_v1}>
                                播放数
                        <span>122</span>
                            </section>
                        </div>
                    </header>

                    <section className={styles.btns}>
                        <PlayAllBtn onClick={onPlay} />
                        <CommonBtn
                            icon={_icons.collect.icon}
                            name={_collectName}
                        />
                    </section>
                    <footer>
                        <ol className={styles.tags}>
                            {
                                data.tags.map((tag, index) => (
                                    <li key={index}>
                                        {tag}
                                    </li>
                                ))
                            }
                        </ol>

                        <section className={`${styles.desc} ${isMoreDesc ? styles.showMore : ''}`}>
                            <div className={`${styles.triangle}`}>
                                <Triangle
                                    width={.12}
                                    onClick={bool => setIsMoreDesc(bool)}
                                />
                            </div>
                            <span>
                                简介：
                            </span>
                            <span className={`${styles.descText}`}>
                                {
                                    data.description
                                }
                            </span>
                        </section>
                    </footer>
                </section>

            </header>

            <article className={`${styles.article} ${theme.border_v1}`}>
                <header className={styles.btns}>
                </header>
                <Songs
                    list={songs}
                    onDoubleClick={onPlay}
                    currentId={currentSongId}
                />
            </article>
        </>
    )
}

Common.propTypes = {
    songs: PropTypes.array,
    theme: PropTypes.object,
    onPlay: PropTypes.func,
    onCollect: PropTypes.func,
    currentSongId: PropTypes.number,
    data: PropTypes.object,
}


export default memo(Common)