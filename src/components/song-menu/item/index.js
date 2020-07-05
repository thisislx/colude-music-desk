import React, { memo } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { imgSize } from '../config'
import { convertHugeNum } from 'tools'

function SongListItem(props) {
    const { count, img, name, id, theme, length } = props
    return (
        <div className={styles.wrap}>
            <section className={`${styles.imgWrap} ${theme.fontColor_r4} pointer`}>
                <img src={`${img}${imgSize}`} data-id={id} alt={name} />
                {
                    count ?
                        <span className={`${styles.listener} ${theme.back_v1}`}>
                            {convertHugeNum(count)}
                        </span> : null
                }
                <span className={`iconfont ${theme.back_v2}`}>&#xe657;</span>
            </section>
            <p data-id={id} className={`${styles.name} ${theme.fontColor_v2}`}>{name}</p>
            {
                Number.isInteger(length) ?
                    <p className={`${theme.fontColor_v1}`}>
                        {length}首
                    </p> : null
            }
        </div>
    )
}

SongListItem.propTypes = {
    id: PropTypes.number,
    count: PropTypes.number,
    length: PropTypes.number,
    img: PropTypes.string,
    name: PropTypes.string,

    theme: PropTypes.object,
}

export default memo(SongListItem)