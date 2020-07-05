import React, { memo, useRef, useMemo, useEffect, useCallback, useState } from 'react'
import styles from './style'
import PropTypes, { func } from 'prop-types'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'
import useDomMove from 'hooks/useDomMove'
import Loading from '../loading-icon'

function Progress(props) {
    const
        {
            themeName,
            height = .3,
            width = 100,
            value = 0,
            buffer = 0,
            loading = false,
            pointer = true,   /* @true(一直展示icon)  @false(静态时隐藏)*/
        } = props,
        { onChange, onChanging } = props,
        [percent, setPercent] = useState(value),   /* 独立于value */
        [percentWidth, setpercentWidth] = useState(0),      /* percentRef 的width(px) */
        wrapRef = useRef(null),
        wrapPos = useRef(null),
        percentRef = useRef(null),
        pointerRef = useRef(null),
        localChange = useRef(false),  /* 是否手动调整进度条(避免value的副作用) */
        style = useMemo(() => ({
            width: `${width}%`,
            height: `${height}rem`,
        }), [height, width]),
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
            setpercentWidth(e.clientX - x)
            localChange.current = true  /* 本地change */
        }, [wrapRef, onChange]),
        moveHandle = useCallback(function inner__(width, end) {
            setpercentWidth(width)
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
                val = Math.max(0, Math.min(1, percentWidth / width))
            setPercent(val)
        }
    }, [percentWidth, wrapPos])

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
        function handle() {
            wrapPos.current = wrapRef.current.getBoundingClientRect()
        }
        handle()
        window.addEventListener('resize', handle)
        return () => {
            window.removeEventListener('resize', handle)
        }
    }, [wrapRef, wrapPos])

    return (
        <div
            style={style}
            ref={wrapRef}
            className={`${styles.wrap} ${theme.back_v1} pointer`
                + ` ${pointer ? '' : styles.showPointer}`}
            onClick={wrapClickHandle}
        >
            {/* 进度 */}
            <main
                ref={percentRef}
                className={`${theme} ${styles.percent}`}
            >
                <div
                    ref={pointerRef}
                    className={`${styles.pointer} ${pointer ? '' : styles.hide} ${theme.border_r2}`
                        + ` ${theme}`}
                    style={pointerStyle}
                >
                    {
                        loading ?
                            <div className={styles.loading}>
                                <Loading size={.7} />
                            </div> : null
                    }
                </div>

            </main>

            <div
                className={`${styles.buffer} ${theme.back_v2}`}
                style={{ width: `${buffer * 100}%` }}
            >
            </div>
        </div>
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