import React, { memo, useState, useEffect, useRef } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { _imgSize, _tagsConfig, _signInConfig } from './config'
import useClick from 'hooks/useClick'
import { getProperty } from 'tools'
import Pad from 'base-ui/pad'

function Login(props) {
    const
        { data, theme, enterUser } = props,
        { signIn } = props,
        { nickname, avatarUrl } = data.profile,
        { pcSign, profile } = data,
        [show, setShow] = useState(false),
        wrapRef = useRef(null),
        [listener, closeListener] = useClick(bool => {
            setShow(bool)
        }, [wrapRef])

    useEffect(() => {
        if (show) listener()
        else closeListener()
        return () => {
            closeListener()
        }
    }, [show, listener, closeListener])
    return (
        <div
            className={styles.wrap}
            onClick={e => setShow(true)}
            ref={wrapRef}
        >
            {
                avatarUrl ?
                    <img
                        src={`${avatarUrl}${_imgSize}`}
                        className={`pointer`}
                    /> : null
            }
            <span className={`${styles.nickname} pointer`}>{nickname}</span>

            <Pad show={show} size={20} point={10.2} top={6} left={75}>
                <header className={`${styles.padHeader} ${theme.border_v1}`}>
                    <header>
                        <section
                            className='pointer'
                            onClick={enterUser}
                        >
                            {avatarUrl ? <img src={`${avatarUrl}${_imgSize}`} /> : null}
                            <span className={styles.nickname}>{nickname}</span>
                        </section>
                        {/* 签到 */}
                        <button
                            className={`${theme.border_v2} ${theme.back_r4} `}
                            onClick={pcSign ? null : signIn}
                        >
                            {_signInConfig[pcSign]}
                        </button>
                    </header>
                    <ol className={styles.alive}>
                        <li
                            className={theme.border_v1}
                        >
                            <p>动态</p>
                            <p>{profile.eventCount}</p>
                        </li>
                        <li
                            className={theme.border_v1}
                        >
                            <p>关注</p>
                            <p>{profile.follows}</p>
                        </li>
                        <li
                            className={theme.border_v1}
                        >
                            <p>粉丝</p>
                            <p>{profile.followeds}</p>
                        </li>
                    </ol>
                </header>
                {
                    _tagsConfig.map((tag, index) => (
                        <li
                            className={`${theme.backHover_v1} ${styles.tagItem}`}
                            key={index}
                            onClick={tag.method ? props[tag.method] : null}
                        >
                            <span>{tag.name}</span>
                            <aside className='iconfont'>
                                {
                                    tag.property ?
                                        <span>{getProperty(data, tag.propertys)}</span> : null
                                }
                                {
                                    tag.right ?
                                        <span
                                            dangerouslySetInnerHTML={
                                                { __html: tag.right }
                                            }
                                        ></span> : null
                                }
                            </aside>
                        </li>
                    ))
                }
            </Pad>
        </div>
    )
}

Login.propTypes = {
    data: PropTypes.object,
    theme: PropTypes.object,
    enterUser: PropTypes.func,
    signIn: PropTypes.func,
    logout: PropTypes.func,
}

export default memo(Login)