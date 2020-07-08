/* eslint-disable react/prop-types */
import React, { memo, useCallback } from 'react'
import styles from './style'
import useTheme from 'hooks/useTheme'
import { connect } from 'react-redux'
import { actionsCreator as themeActionsCreator } from 'store/theme'
import { useHistory } from 'react-router-dom'
import _icons from 'config/icons'
import _layout from 'config/layout'

import Search from './search'
import BtnControl from './btn-control'
import Skip from './skip'
import User from './user'

function Header(props) {
    const
        { themeName, changeTheme } = props,
        history = useHistory(),
        theme = useTheme(themeName),
        clickLogoHandle = useCallback(e => {
            history && history.push('/')
        }, [history])

    return (
        <header
            className={`${theme}  ${styles.wrap}`}
            style={{ height: _layout.headerHeight }}
        >
            <section className={styles.left}>
                <aside
                    onClick={clickLogoHandle}
                    className={`${_icons.logo.className} ${theme.fontColor_r4} ${styles.logo}`}
                    dangerouslySetInnerHTML={{ __html: _icons.logo.icon }}
                ></aside>
                <BtnControl theme={theme} />
                <Search />
            </section>
            <section className={styles.right}>
                <Skip changeTheme={changeTheme} />
                <User theme={theme} />
            </section>
        </header>
    )
}

const
    mapState = state => {
        const
            themeName = state.getIn(['theme', 'name'])
        return {
            themeName
        }
    },
    mapDispath = dispatch => ({
        changeTheme(theme) {
            dispatch(themeActionsCreator.changeTheme(theme))
        }
    })

export default connect(mapState, mapDispath)(memo(Header))