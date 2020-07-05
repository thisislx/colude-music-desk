import React, { memo } from 'react'
import styles from './style'
import PropTypes from 'prop-types'

function Radio(props) {
    const { } = props
    return (
        <div className={styles.wrap}>
            Radio
        </div>
    )
}

Radio.propTypes = {

}

export default memo(Radio)