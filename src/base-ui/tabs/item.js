import React, { memo, useState, useEffect, Suspense } from 'react'
import PropTypes from 'prop-types'
import styles from './style'
import Loading from 'base-ui/loading-icon'

function TabItem(props) {
    const
        { children, show } = props,
        [init, setInit] = useState(false)   /* 进行初始化 */
    useEffect(() => {
        if (show && !init) setInit(true)
    }, [show, init])

    if (init) return (
        <div className={show ? '' : styles.hide}>
            <Suspense fallback={<Loading center={true} />}>
                {
                    children
                }
            </Suspense>
        </div>
    )
    return <> </>
}

TabItem.propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool
}

export default memo(TabItem)