import React, { memo } from 'react'
import styles from './style'
import PropTypes from 'prop-types'

function Menu(props) {
    const { } = props
    return (
        <div className={styles.wrap}>
            Menu
        </div>
    )
}

Menu.propTypes = {

}

export default memo(Menu)