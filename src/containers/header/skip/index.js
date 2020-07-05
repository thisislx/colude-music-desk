import React, { memo, useState, useCallback, useRef, useEffect } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import useClick from 'hooks/useClick'
import Pad from 'base-ui/pad'
import _themeConfig from 'config/theme'
import _icons from 'config/icons'

function Skip(props) {
    const
        { changeTheme } = props,
        [show, setShow] = useState(false),
        padRef = useRef(null),
        [listener, cancelListener] = useClick((bool) => {
            if (!bool) setShow(false)
        }, [padRef]),
        changeThemeHandle = useCallback(e => {
            const themeName = e.target.getAttribute('data-theme-name')
            themeName && changeTheme(themeName)
        }, [changeTheme])
    useEffect(() => {
        if (show) listener()
        else cancelListener()
        return () => cancelListener()
    }, [show])
    return (
        <>
            <span
                className={`${_icons.theme.className} ${styles.icon}`}
                onClick={e => setShow(true)}
                dangerouslySetInnerHTML={{ __html: _icons.theme.icon }}
            ></span>
            <Pad
                el={padRef}
                show={show}
                onClose={setShow}
                left={67.2}
                top={6}
                width={12}
                point={8.9}
            >
                <ol
                    className={styles.pad}
                    onClick={changeThemeHandle}
                >
                    {
                        _themeConfig.map(item => (
                            <li
                                className={`${item[1]} pointer`}
                                key={item[1]}
                                data-theme-name={item[1]}
                            >
                            </li>
                        ))
                    }
                </ol>
            </Pad>
        </>
    )
}

Skip.propTypes = {
    changeTheme: PropTypes.func
}

export default memo(Skip)