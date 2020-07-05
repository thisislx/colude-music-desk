import React, { memo } from 'react'
import styles from './style'
import PropTypes from 'prop-types'

function Singer(props) {
    const { } = props
    return (
        <div className={styles.wrap}>
            Singer
        </div>
    )
}

Singer.propTypes = {

}

export default memo(Singer)