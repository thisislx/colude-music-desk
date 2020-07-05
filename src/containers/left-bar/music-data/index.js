import React, { memo, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _imgSize, _likeIconConfig } from '../config'
import { computeArtist } from 'tools/media'

function MusicData(props) {
    const
        { theme, img, artist, name, onClickImg, isLike = false } = props,
        imgClickHandle = useCallback(() => {
            onClickImg && onClickImg()
        }, [onClickImg])

    return (
        <div className={`${styles.musicWrap} ${theme.border_v1} ${theme.fontColor_v1}`}>
            <aside
                className={`${styles.imgWrap} pointer`}
                onClick={imgClickHandle}
            >
                <img
                    src={`${img}${_imgSize}`}
                    alt='加载失败'
                />
                <div className={`${theme.backHover_v2} ${styles.imgMask} ${theme.fontColor_r4}`}>
                    <span className='iconfont'>&#xe62e;</span>
                </div>
            </aside>

            <article className={`${styles.songDesc} `}>
                <span className={`pointer no-wrap ${theme.fontColor_v2}  ${theme.textHover_v2} `}>
                    {name}
                </span>
                <span className={`pointer no-wrap ${theme.textHover_v1}`}>
                    {computeArtist(artist)}
                </span>
            </article>

            <aside className={styles.icons}>
                <span
                    className={`${_likeIconConfig.className} ${isLike ? theme : ''}`}
                    dangerouslySetInnerHTML={{ __html: _likeIconConfig.icon }}
                >
                </span>
            </aside>
        </div>
    )
}

MusicData.propTypes = {
    theme: PropTypes.object,
    img: PropTypes.string,
    artist: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onClickImg: PropTypes.func,
    isLike: PropTypes.bool,
}

export default memo(MusicData)