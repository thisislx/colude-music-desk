import React, { memo, useRef, useEffect } from 'react'
import styles from './style.less'
import PropTypes from 'prop-types'
import useTheme from 'hooks/useTheme'
import { connect } from 'react-redux'

/* 基础容器 */
function BaseWrap(props) {
    const
        {
            themeName,
            className,
            children,
            el,
            fixed,
            top,
            bottom,
        } = props,
        theme = useTheme(themeName),
        wrapRef = useRef(null)

    useEffect(() => {
        if (el) el.current = wrapRef.current
    }, [el, wrapRef])

    useEffect(() => {
        if (fixed) {
            wrapRef.current.style.cssText +=
                `top: ${top}; bottom: ${bottom}; position: fixed; overflow-y: auto; z-index:4;`
        }
    }, [fixed, top, bottom, wrapRef])

    return (
        <div
            ref={wrapRef}
            className={`${styles.wrap} ${theme.back_r3} ${theme.fontColor_v2} ${className}`}
        >
            {children}
        </div>
    )
}

BaseWrap.propTypes = {
    children: PropTypes.node,
    themeName: PropTypes.string,
    className: PropTypes.string,
    el: PropTypes.object,
    fixed: PropTypes.bool,
    top: PropTypes.string,
    bottom: PropTypes.string,
}

const mapState = state => {
    const __layout = state.get('layout')

    return {
        top: __layout.getIn(['header', 'height']),
        bottom: __layout.getIn(['footer', 'height']),
        themeName: state.getIn(['theme', 'name']),
    }
}

export default connect(mapState, null)(memo(BaseWrap))