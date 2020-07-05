import React, { memo, useRef, createRef, useState, useEffect, useMemo, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { comoputeLyricLine } from './tool'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'
import useThrottle from 'hooks/useThrottle'
import { debounce } from 'tools'

function Lyric(props) {
    const
        { playtime = 100 * 1000, lyric, height = 22, themeName, onDoubleClick } = props,
        [active, setActive] = useState(0),
        theme = useTheme(themeName),
        lyricRefs = useRef([]),
        lockAutoScroll = useRef(false),  /* 手动进度条 */
        wrapRef = useRef(null),
        times = useMemo(() => Object.keys(lyric), [lyric]),
        stuff = useMemo(() => [...Array(Math.round(height / 10))], [height]),   /* 上下填充li */
        doubleClickLineHandle = useCallback((e) => {
            const key = +e.target.getAttribute('data-key')
            if (Number.isInteger(key)) onDoubleClick && onDoubleClick(times[key])
        }, [lyric, times]),
        wrapScrollHandle = useCallback(debounce(e => {
            // 未被改变成
            if (lockAutoScroll.current !== 'lx') {
                // 上锁
                lockAutoScroll.current = true
                setTimeout(() => {
                    lockAutoScroll.current = false
                }, 10000)
            }
        }, 200), [lockAutoScroll])

    useThrottle(() => {
        setActive(comoputeLyricLine(playtime, lyric))
    }, 300, [playtime, lyric])

    useEffect(() => {
        const
            { top, bottom } = wrapRef.current.getBoundingClientRect(),  /* 在视口内 */
            notLock = !lockAutoScroll.current || lockAutoScroll.current === 'lx'

        if (typeof lyric === 'object' && notLock && (top > 0 && bottom > 0)) {
            const line = lyricRefs.current[active].current
            line.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
            lockAutoScroll.current = 'lx'
        }
    }, [active, lyricRefs, lyric, lockAutoScroll])

    return (
        <ol
            className={`${styles.wrap} ${theme.fontColor_v1}`}
            style={{ height: `${height}rem` }}
            onDoubleClick={doubleClickLineHandle}
            onScroll={wrapScrollHandle}
            ref={wrapRef}
        >
            {
                stuff.map((item, key) => <li key={key}></li>)
            }

            {
                typeof lyric === 'string' ? <li style={{ textAlign: 'center' }}>{lyric}</li>
                    : times.map((time, key) => {
                        const liRef = createRef(null)
                        lyricRefs.current[key] = liRef
                        return (
                            <li
                                className={`pointer  `
                                    + (active === key ? theme.color : theme.textHover_v1)}
                                ref={liRef}
                                key={time}
                                data-key={key}
                            >
                                {lyric[time]}
                            </li>
                        )
                    })
            }
            {
                stuff.map((item, key) => <li key={key + stuff.length}></li>)
            }
        </ol >
    )
}

Lyric.propTypes = {
    playtime: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lyric: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    height: PropTypes.number,
    themeName: PropTypes.string,
    onDoubleClick: PropTypes.func,
}
const mapState = state => {
    const themeName = state.getIn(['theme', 'name'])
    return {
        themeName
    }
}

export default connect(mapState, null)(memo(Lyric))