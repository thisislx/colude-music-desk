import React, { memo, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { computeClockMin, computeArtist } from 'tools/media'
import _icons, { _mediaIcons } from 'config/icons'

function SongsItem(props) {
    const
        { data, theme, index, active } = props
    return (
        <li
            data-index={index}
            className={`${styles.wrap} ${theme.backHover_v1} `
                + (index & 1 ? '' : theme.back_r3)}
        >
            <section className={`${styles.left} not-select`} data-index={index}>
                {
                    active === data.id ?
                        <span
                            className={` ${theme.color} ${_mediaIcons.volume.className}`}
                            dangerouslySetInnerHTML={{ __html: _mediaIcons.volume.icon }}
                        ></span> :
                        <span  data-index={index}>
                            {index + 1}
                        </span>
                }
                {/* 喜欢图标 */}
                <span
                    className={` ${styles.like} ${_icons.like.className}`}
                    dangerouslySetInnerHTML={{ __html: _icons.like.icon }}
                ></span>
                <span className={`${theme.fontColor_v2} no-wrap pointer`} data-index={index}>
                    {data.name}
                </span>

                {
                    data.mv ?
                        <span
                            className={`${_mediaIcons.mv.className} ${styles.mv} ${theme.color}`}
                            data-mv={data.mv}
                            dangerouslySetInnerHTML={{ __html: _mediaIcons.mv.icon }}
                        ></span> : null
                }
            </section>
            <section className={styles.right} data-index={index}>
                {/* 歌手 */}
                <span data-index={index}>
                    <span className={`pointer no-wrap`}>
                        {computeArtist(data.ar)}
                    </span>
                </span>
                {/* 专辑 */}
                <span data-index={index}>
                    <span className={`pointer no-wrap`}>
                        {data.al.name}
                    </span>
                </span>
                {/* 时长 */}
                <span  data-index={index}>
                    {computeClockMin(data.duration)}
                </span>
            </section>
        </li >
    )
}

SongsItem.propTypes = {
    data: PropTypes.object,
    theme: PropTypes.object,
    index: PropTypes.number,
    active: PropTypes.number,
}

export default memo(SongsItem)