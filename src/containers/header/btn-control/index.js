import React, { memo } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import _icons from 'config/icons'
import { withRouter } from 'react-router-dom'

function BtnControl(props) {
    const
        { theme, history = {} } = props,
        { goBack, goForward } = history

    return (
        <div className={`${styles.wrap} `}>
            <div className={`${styles.btns} ${theme} `}>
                <button
                    className={_icons.left.className}
                    onClick={e => goBack && goBack()}
                    dangerouslySetInnerHTML={{ __html: _icons.left.icon }}
                ></button>
                <button
                    className={_icons.right.className}
                    onClick={e => goForward && goForward()}
                    dangerouslySetInnerHTML={{ __html: _icons.right.icon }}
                ></button>
            </div>

        </div>
    )
}

BtnControl.propTypes = {
    theme: PropTypes.object,
    history: PropTypes.object,
}

export default withRouter(memo(BtnControl))