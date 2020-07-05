import React, { memo, useState, useEffect, useCallback, useMemo } from 'react'
import styles from './style'
import useTheme from 'hooks/useTheme'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function TriangleIcon(props) {
    const
        { size = .6, state, onClick, themeName, width = .06 } = props,
        [open, setOpen] = useState(state),
        theme = useTheme(themeName),
        style = useMemo(() => ({
            width: `${size}rem`,
            height: `${size}rem`,
            borderWidth: `0 0 ${width}rem ${width}rem`
        }), [width, size]),
        clickHandle = useCallback(() => {
            setOpen(!open)
            onClick && onClick(!open)
        }, [open, onClick])

    useEffect(() => {
        setOpen(state)
    }, [state])

    return (
        <div
            onClick={clickHandle}
            className={`${styles.wrap} extend-click pointer ${theme.border_v2} `
                + (open ? styles.open : '')}
            style={style}
        >
        </div>
    )
}

TriangleIcon.propTypes = {
    size: PropTypes.bool,
    state: PropTypes.bool,
    onClick: PropTypes.func,
    themeName: PropTypes.string,
    width: PropTypes.number,    /* 边框 */
}

const mapState = state => {
    const themeName = state.getIn(['theme', 'name'])

    return {
        themeName
    }
}

export default connect(mapState, null)(memo(TriangleIcon))