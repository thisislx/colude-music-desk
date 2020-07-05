import React, { memo, useEffect } from 'react'
import styles from './style'
import PropTypes from 'prop-types'

function Rank(props) {
    const { } = props
    useEffect(() => {
        console.log('Rank(): 我执行了吗')
    }, [])
    return (
        <div className={styles.wrap}>
            Rank
        </div>
    )
}

Rank.propTypes = {

}

export default memo(Rank)