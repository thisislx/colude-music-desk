import React, { memo, useMemo, useEffect, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'

function SongMenu(props) {
    const
        { children, themeName, onClick, title } = props,
        theme = useTheme(themeName),
        newChildren = useMemo(() => React.Children.map(children,
            child => child && React.cloneElement(child, { theme })
        ), [themeName, children, theme]),
        clickHandle = useCallback(e => {
            const id = e.target.getAttribute('data-id')
            id && onClick && onClick(id)
        }, [])

    return (
        <>
            {
                title ?
                    <header className={`${theme.border_v1} ${styles.header} ${theme.fontColor_v2}`}>
                        {title}
                    </header> : null
            }
            <main
                onClick={clickHandle}
                className={styles.menuWrap}
            >
                {newChildren}
            </main>
        </>
    )
}

SongMenu.propTypes = {
    children: PropTypes.node,
    themeName: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
}

const mapState = state => {
    const themeName = state.getIn(['theme', 'name'])

    return {
        themeName
    }
}

export default connect(mapState, null)(memo(SongMenu))
export { default as SongMenuItem } from './item'