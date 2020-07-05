import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import styles from './style'
import icons from './config'

function Toast(props) {
    const
        { text, is, icon, theme } = props,
        iconHtml = useMemo(() => ({
            __html: icons[icon] || ''
        }), [icon])
    return (
        <div className={styles.wrap + (is ? '' : ' hide')}>
            <header
                className={`iconfont ${theme}` + (icon ? '' : ' hide')}
                dangerouslySetInnerHTML={iconHtml}
            >
            </header>

            <article>
                {text}
            </article>
        </div>
    )
}

Toast.propTypes = {
    theme: PropTypes.object,
    is: PropTypes.bool,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export default memo(Toast)