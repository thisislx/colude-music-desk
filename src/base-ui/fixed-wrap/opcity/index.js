import React, { memo } from 'react'
import './style.css'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import BaseWrap from '../index'

function OpcityWrap(props) {
    const
        { children, show = true, className, el, fixed } = props,
        history = useHistory()

    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames='opcity-entry-fade'
            unmountOnExit={true}
            appear={true}
            key={location.pathname}
            onExited={() => history.goBack()}
        >
            <BaseWrap className={className} el={el} fixed={fixed}>
                {children}
            </BaseWrap>
        </CSSTransition>
    )
}

OpcityWrap.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    el: PropTypes.object,
    show: PropTypes.bool,       /* 控制路由 */
    fixed: PropTypes.bool,
}

export default (memo(OpcityWrap))