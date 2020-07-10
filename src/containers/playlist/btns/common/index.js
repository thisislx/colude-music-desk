import React, { memo, useContext } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { Context } from '../../index'

function CommonBtn(props) {
    const
        { icon, name, className, onClick } = props,
        { theme } = useContext(Context)

    return (
        <button
            className={
                className ? className
                    : `${styles.wrap} ${theme.back_v1} ${theme.border_v1} ${theme.fontColor_v2} pointer`
            }
            onClick={onClick ? onClick : null}
        >
            <span
                className={`iconfont`}
                dangerouslySetInnerHTML={{ __html: icon }}
            ></span>
            {name}
        </button>
    )
}

CommonBtn.propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
}

export default memo(CommonBtn)