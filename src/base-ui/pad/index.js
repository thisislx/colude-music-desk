/* eslint-disable react/prop-types */
import React, { memo, useMemo, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import styles from './style'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'

function Pad(props) {
    const
        {
            show = false,
            width = 16,
            left = 0,           /* 百分比 */
            top = 20,           /* 百分比 */
            themeName,
            children,
            point = 1,
            showPointer = true,
            direction = 'top',
            el,
        } = props,
        [activityIsLeft] = useState(direction === 'top' || direction === 'bottom'),  /* 三角形的位置 */
        center = direction === 'center',
        style = useMemo(() => Object.assign({ width: Number.isInteger(width) ? `${width}rem` : `${width}` },
            center ? null : { left: `${left}%`, top: `${top}%` }),
            [width, left, top, center]),
        triangleStyle = useMemo(() => {
            if (center || !showPointer) return null
            /* 活动的点 */
            const activeDir = activityIsLeft ? 'left' : 'top'
            return {
                width: Number.isInteger(width) ? `${width / 18}rem` : `5%`,
                height: Number.isInteger(width) ? `${width / 18}rem` : `5%`,
                [direction]: `${-width / 40}rem`,
                [activeDir]: `${point}rem`,
            }
        }, [width, point, showPointer, direction, activityIsLeft]),
        theme = useTheme(themeName),
        className = useMemo(() =>
            `${styles.wrap} ${theme.back_r2} ${theme.boxShadow_v1} ${theme.fontColor_v2} `
            + (center ? styles.center : '')
            + (show ? '' : ' hide')
            , [theme, show]),
        wrapRef = useRef(null)

    useEffect(() => {
        if (el) el.current = wrapRef.current
    }, [el, wrapRef])

    return  createPortal(
        <div
            className={className}
            style={style}
            ref={wrapRef}
        >
            {children}
            {
                showPointer ?
                    <div
                        style={triangleStyle}
                        className={`${styles.triangle} `
                            + (styles[direction])
                        }
                    >
                    </div> : null
            }
        </div>, app
    )
}

Pad.propTypes = {
    show: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),    // 宽度  [number]
    left: PropTypes.number,    // 定位
    top: PropTypes.number,     // 定位
    point: PropTypes.number,   // 三角形指针
    direction: PropTypes.string,    /* 三角形箭头方向  @value[left, right, top, bottom, center ]*/
    showPointer: PropTypes.bool,
    theme: PropTypes.string,
    el: PropTypes.object,
}

const mapState = state => {
    const themeName = state.getIn(['theme', 'name'])
    return { themeName }
}

export default connect(mapState, null)(memo(Pad))