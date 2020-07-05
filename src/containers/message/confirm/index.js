import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './style'

function Confirm(props) {
    const { is, text, cb } = props
    return (
        <div className={styles.wrap + (is ? '' : ' hide')}>
            <p>
                {text}
            </p>
            <footer>
                <button className={styles.cancel} onClick={e => cb && cb(false)}>取消</button>
                <button className={styles.ok} onClick={e => cb && cb(true)}>确定</button>
            </footer>
        </div>
    )
}

Confirm.propTypes = {
    cb: PropTypes.func,
    is: PropTypes.bool,
    text: PropTypes.string
}

export default memo(Confirm)