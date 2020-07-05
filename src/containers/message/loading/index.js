import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './style'
import LoadingIcon from 'base-ui/loading-icon'

function Loading(props) {
    const { is, text, theme } = props
    return (
        <div
            className={
                `${styles.wrap} ${theme.fontColor_v3} `
                + (is ? '' : 'hide ')
                + (text ? theme.back_r4 : '')
            }
        >
            <LoadingIcon size={1.4} />
            {
                text ? <p>{text}</p> : null
            }
        </div >
    )
}


Loading.propTypes = {
    theme: PropTypes.object,
    is: PropTypes.bool,
    text: PropTypes.string
}

export default memo(Loading)