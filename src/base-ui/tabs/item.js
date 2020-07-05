import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './style'

function TabItem(props) {
    const
        { children, show } = props,
        [init, setInit] = useState(false)   /* 进行初始化 */
    useEffect(() => {
        if (show && !init) setInit(true)
    }, [show, init])

    if (init) return (
        <div className={show ? '' : styles.hide}>
            {
                children
            }
        </div>
    )
    return <> </>
}

TabItem.propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool
}

export default memo(TabItem)