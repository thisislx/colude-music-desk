import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import styles from './style'
import PropTypes from 'prop-types'
import { _backImgSize } from './config'

function CD(props) {
    const
        { size = 24, img, state = true } = props,
        style = useMemo(() => ({
            width: `${size}rem`,
            height: `${size}rem`
        }), [size])

    return (
        <div
            style={style}
            className={`${styles.wrap} ${state ? '' : styles.paused}`}
        >
            <img
                src={`${img}${_backImgSize}`}
            />
        </div>
    )
}

CD.propTypes = {
    size: PropTypes.number,
    img: PropTypes.string,
    state: PropTypes.bool,
}

export default memo(CD)