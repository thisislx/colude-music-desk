import React, { memo, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _coverImgSize } from './config'

function Video(props) {
    const
        { list, theme, enterMv } = props,
        proxyClickHandle = useCallback(e => {
            const id = e.target.getAttribute('data-mv-id')
            id && enterMv(id)
        }, [enterMv])

    return (
        <ol className={styles.wrap} onClick={proxyClickHandle}>
            {
                list.map((video) => (
                    <li
                        className={`pointer`}
                        data-mv-id={video.vid}
                        key={video.vid}
                    >
                        <main className={styles.imgWrap}>
                            <img src={video.coverUrl + _coverImgSize} data-mv-id={video.vid} />
                        </main>
                        <footer>
                            <p className={`no-wrap`} data-mv-id={video.vid}>{video.title}</p>
                            <p className={`${theme.fontColor_v1}`}>by
                                {
                                    video.creator.map(creator => (
                                        <span
                                            key={creator.userId}
                                            data-user-id={creator.userId}
                                        >
                                            {creator.userName}
                                        </span>
                                    ))
                                }
                            </p>
                        </footer>
                    </li>
                ))
            }
        </ol>
    )
}

Video.propTypes = {
    list: PropTypes.array,
    theme: PropTypes.object,
    enterMv: PropTypes.func,
}

export default memo(Video)