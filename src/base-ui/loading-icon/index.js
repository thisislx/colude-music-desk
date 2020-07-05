import React, { memo, useMemo } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import useTheme from 'hooks/useTheme'
import { connect } from 'react-redux'

function LoadingIcon(props) {
    const
        { size = 1, center = false, themeName } = props,
        style = useMemo(() => ({
            width: `${size}rem`,
            height: `${size}rem`,
        }), [size]),
        theme = useTheme(themeName)

    return (
        <div
            className={`${styles.wrap} ${center ? styles.center : ''}`}
            style={style}
        >
            <span className={theme.back_r4}></span>

            <div
                className={`${styles.ringWrap} ${theme}`}
            >
                <span
                    className={theme.loading}
                ></span>
            </div>
        </div>
    )
}

LoadingIcon.propTypes = {
    size: PropTypes.number,
    center: PropTypes.bool,
    themeName: PropTypes.string,
}

const
    mapState = state => {
        const themeName = state.getIn(['theme', 'name'])
        return {
            themeName,
        }
    }
export default connect(mapState, null)(memo(LoadingIcon))