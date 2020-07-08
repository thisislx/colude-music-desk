import React, { memo, useRef, useMemo, useEffect, useCallback, useState } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { debounce } from 'tools'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'
import useDomMove from 'hooks/useDomMove'
import Loading from '../loading-icon'

function Progress(props) {
    const
        {
            themeName,
            height = .3,    /* rem */
            width = 100,    /* 百分比 */
            value = 0,      /* 0 - 1 */
            buffer = 0,     /* 0 - 1 */
            loading = false,
            pointer = true,   /* @true(一直展示icon)  @false(静态时隐藏)*/
        } = props,
        { onChange, onChanging } = props,
        [percent, setPercent] = useState(value),   /* 独立于value */
        [percentElWidth, setpercentElWidth] = useState(0),      /* percentRef 的width(px) */
        wrapRef = useRef(null),
        wrapPos = useRef(null),
        percentRef = useRef(null),
        pointerRef = useRef(null),
        localChange = useRef(false),  /* 是否手动调整进度条(避免value的副作用) */
        pointerStyle = useMemo(() => ({
            width: `${height * 3}rem`,
            height: `${height * 3}rem`,
            marginTop: `${-height * 2 / 2}rem`,
            right: `${-height * 3 / 2}rem`,
            borderWidth: `${height / 1.2}rem`,
        }), [height]),
        theme = useTheme(themeName),
        wrapClickHandle = useCallback(e => {
            const { x } = wrapPos.current
            setpercentElWidth(e.clientX - x)
            localChange.current = true  /* 本地change */
        }, [wrapRef, wrapPos, onChange]),
        moveHandle = useCallback(function inner__(width, end) {
            setpercentElWidth(width)
            localChange.current = true  /* 本地change */
            clearTimeout(inner__.sid)
            inner__.sid = setTimeout(() => {
                onChanging && onChanging(end)
            }, 50)
        }, [])

    /* 更新Percent */
    useEffect(() => {
        if (localChange.current) {
            const
                { width } = wrapPos.current,
                val = Math.max(0, Math.min(1, percentElWidth / width))
                console.log(percentElWidth, width)
            setPercent(val)
        }
    }, [percentElWidth, wrapPos])

    /* 改变进度条样式 */
    useEffect(() => {
        percentRef.current.style.width = `${percent * 100 || 0}%`
    }, [percent, percentRef])

    /* 向外部传递变化值 */
    useEffect(function inner__() {
        /* 只有手动跳转时 */
        localChange.current && onChange && onChange(percent)
    }, [percent, onChange])

    /* 外部value变化 */
    useEffect(() => {
        /* 确保来自非本地更新 */
        if (localChange.current) localChange.current = false
        else setPercent(value)
    }, [value])

    /* 鼠标移动进度条 */
    useDomMove(moveHandle, [wrapRef, pointerRef])

    /* 获取dom默认信息 */
    useEffect(() => {
        const handle = debounce(() => {
            if (!wrapRef.current) return  /* 解决热更新报错 */
            const rect = wrapRef.current.getBoundingClientRect()
            if (rect.width === 0) setTimeout(handle, 200)
            else wrapPos.current = rect
        }, 200)
        handle()
        window.addEventListener('resize', handle)
        return () => {
            window.removeEventListener('resize', handle)
        }
    }, [wrapRef, wrapPos])

    return (
        <div
            style={{ width: `${width}%` }}
            className={`${styles.wrap}`}
            ref={wrapRef}
            onClick={wrapClickHandle}
        >
            <main
                style={{ height: `${height}rem` }}
                className={`${theme.back_v1} ${styles.main} pointer`
                    + ` ${pointer ? '' : styles.showPointer}`}
            >
                {/* 进度 */}
                <article
                    ref={percentRef}
                    className={`${theme} ${styles.percent}`}
                >
                    <span
                        ref={pointerRef}
                        className={`${styles.pointer} ${pointer ? '' : styles.hide} ${theme.border_r2}`
                            + ` ${theme}`}
                        style={pointerStyle}
                    >
                        {
                            loading ?
                                <span className={styles.loading}>
                                    <Loading size={.7} />
                                </span> : null
                        }
                    </span>
                </article>
                {/* 缓冲条 */}
                <div
                    className={`${styles.buffer} ${theme.back_v2}`}
                    style={{ width: `${buffer * 100}%` }}
                >
                </div>
            </main>
        </div >
    )
}

Progress.propTypes = {
    themeName: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    pointer: PropTypes.bool,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    onChanging: PropTypes.func,
    buffer: PropTypes.number,
}

const mapState = state => {
    const themeName = state.getIn(['theme', 'name'])
    return {
        themeName
    }
}

export default connect(mapState, null)(memo(Progress))