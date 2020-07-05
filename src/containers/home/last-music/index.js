import React, { memo } from 'react'
import styles from './style'
import PropTypes from 'prop-types'

function LastMusic(props) {
    const { } = props
    return (
        <div className={styles.wrap}>
            LastMusic
        </div>
    )
}

LastMusic.propTypes = {

}

export default memo(LastMusic)