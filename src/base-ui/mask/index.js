import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import styles from './style'
import { connect } from 'react-redux'
const Mask = (props) => {
    const
        { show, left, top, bottom } = props,
        stopPropagation = e => e.stopPropagation(),
        style = {
            left,
            top,
            bottom,
        }
    return createPortal(
        <section style={style} className={`${styles.wrap} ` + (show ? styles.show : '')}
            onMouseDownCapture={stopPropagation}></section>, app)
}

Mask.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.node
}

const
    mapState = state => {
        const layout = state.get('layout')

        return {
            // left: layout.getIn(['leftBar', 'width']),
            top: layout.getIn(['header', 'height']),
            bottom: layout.getIn(['footer', 'height'])
        }
    }
export default connect(mapState, null)(React.memo(Mask))