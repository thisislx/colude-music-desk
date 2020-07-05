import React, { memo, useRef, useEffect, useMemo, useState } from 'react'
import styles from './style.less'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'


const _defaultState = ['top', 'bottom', 'left']
/* 基础容器 */
function BaseWrap(props) {
    const
        {
            themeName,
            className,
            children,
            state = _defaultState,
            el,
            headerHeight,
            footerHeight,
            leftBar_imm
        } = props,
        { ref: leftBarRef, width: leftBarWidth } = useMemo(() => leftBar_imm.toJS(), [leftBar_imm]),
        [fixed, setFixed] = useState(false),
        [notLeft, notBottom] = useMemo(() => {
            if (leftBarRef.current) {
                return [
                    !state.includes('left') && leftBarRef.current.offsetWidth,
                    !state.includes('bottom') && leftBarRef.current && getComputedStyle(leftBarRef.current).bottom
                ]
            }
            return Array.prototype
        }, [state, leftBarRef.current]),
        theme = useTheme(themeName),
        wrapRef = useRef(null)

    useEffect(() => {
        if (leftBarRef.current) {
            let wrapStyleText = '',
                leftBarStyleText = ''

            if (state.includes('top'))
                wrapStyleText += `top: ${headerHeight};`
            else {
                setFixed(true)
                wrapStyleText += 'top: 0;'
            }

            if (state.includes('left'))
                wrapStyleText += `left: 0;`
            else
                leftBarStyleText += 'width: 0;'

            if (state.includes('bottom'))
                wrapStyleText += `bottom: ${footerHeight};`
            else {
                setFixed(true)
                leftBarStyleText += 'bottom: 0;'
            }
            wrapRef.current.style.cssText = wrapStyleText
            leftBarRef.current.style.cssText += leftBarStyleText
        }
    }, [state, wrapRef, leftBarWidth, headerHeight, footerHeight])

    useEffect(() => {
        if (el) el.current = wrapRef.current
    }, [el, wrapRef])

    useEffect(() => {
        if (leftBarRef.current && (notBottom !== notLeft !== undefined))
            return () => {
                let styleText = ''
                if (notBottom) styleText = styleText + `bottom:${notBottom};`
                if (notLeft) styleText = styleText + `width: ${notLeft}px;`
                leftBarRef.current.style.cssText += styleText
            }
    }, [notLeft, notBottom, leftBarRef.current])



    return (
        <div
            ref={wrapRef}
            className={
                `${styles.wrap} ${theme.back_r2} ${theme.fontColor_v2} ${className} `
                + (fixed ? styles.cover : '')
            }
        >
            {children}
        </div>
    )
}

BaseWrap.propTypes = {
    themeName: PropTypes.string,
    className: PropTypes.string,
    el: PropTypes.object,
    state: PropTypes.array,     /* 显示左边，header， footer */
    themeName: PropTypes.string,
    children: PropTypes.node,
    headerHeight: PropTypes.string,
    leftBar_imm: PropTypes.object,
    footerHeight: PropTypes.string,
}

const
    mapState = state => {
        const
            layout = state.get('layout'),
            headerHeight = layout.getIn(['header', 'height']),
            leftBar_imm = layout.get('leftBar'),
            footerHeight = layout.getIn(['footer', 'height'])

        return {
            themeName: state.getIn(['theme', 'name']),
            headerHeight,
            leftBar_imm,
            footerHeight,
        }
    }

export default connect(mapState, null)(memo(BaseWrap))