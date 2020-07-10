import React, { memo, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _mvCoverSize } from '../config'
import { computeClockMin } from 'tools/media'
import { convertHugeNum } from 'tools'

function MvRelate(props) {
    const
        { list, onClick, description, theme } = props,
        proxyHandle = useCallback(e => {
            const
                el = e.target,
                mvid = el.getAttribute('data-mv-id'),
                userid = el.getAttribute('data-user-id')
            mvid && onClick && onClick(mvid)
        }, [onClick])

    if (description)
        return (
            <div className={styles.desc}>
                简介：<span> {description}</span>
            </div>
        )
    return (
        <div>
            <h2>相关推荐</h2>
            <ol
                className={styles.relateMv}
                onClick={proxyHandle}
            >
                {
                    list.map(mv => (
                        <li
                            key={mv.id}
                        >
                            <aside>
                                <img
                                    className='pointer'
                                    data-mv-id={mv.id}
                                    src={mv.cover + _mvCoverSize}
                                />
                                <span className={`${theme.back_v2} ${theme.fontColor_r4}`}>
                                    {convertHugeNum(mv.playCount)}
                                </span>
                            </aside>
                            <section className={`${theme.fontColor_v1}`}>
                                <p
                                    className={`${theme.fontColor_v2} pointer ${theme.textHover_v2}`}
                                    data-mv-id={mv.id}
                                >
                                    {mv.name}
                                </p>
                                <span data-mv-id={mv.id}>
                                    {computeClockMin(mv.duration)}
                                </span>
                                <div className={styles.creators}>
                                    by：{mv.artists.map(item => (
                                    <span
                                        className={`pointer ${theme.textHover_v1}`}
                                        key={item.id}
                                        data-user-id={item.id}
                                    >
                                        {item.name}
                                    </span>
                                ))}
                                </div>
                            </section>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
}

MvRelate.propTypes = {
    list: PropTypes.array,
    onClick: PropTypes.func,
    description: PropTypes.string,
    theme: PropTypes.object,
}

export default memo(MvRelate)