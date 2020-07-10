import React, { memo, useMemo, useState, useCallback, useRef, useEffect } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import useTheme from 'hooks/useTheme'
import { connect } from 'react-redux'

function Tabs(props) {
    const
        { children, defalutValue = 0, onChange, themeName, height = 2, el } = props,
        [tabs, setTabs] = useState(Array.prototype),
        [active, setActive] = useState(~defalutValue ? defalutValue : 0),
        tabsRef = useRef(null),
        theme = useTheme(themeName),
        toggleActive = useCallback((e) => {
            if (e.target.matches('li')) {
                const value = e.target.value
                setActive(value)
                onChange && onChange(value)
            }
        }, [onChange]),
        newChildren = useMemo(() => {
            const
                tempTabs = [],
                newChildren = React.Children.map(children, child => {
                    tempTabs.push(child.props.tab)
                    return React.cloneElement(child, {
                        show: tempTabs.length - 1 === active
                    })
                })
            setTabs(tempTabs)
            return newChildren
        }, [children, active, onChange])

    useEffect(() => {
        el && (el.current = tabsRef.current)
    }, [el, tabsRef])

    return (
        <div
            className={styles.wrap}
        >
            <ol
                className={`${styles.tabs} ${theme.fontColor_v3} ${theme.border_v1} `}
                onClick={toggleActive}
                style={{ height: height + 'rem' }}
                ref={tabsRef}
            >
                {tabs.map((tab, index) => (
                    <li
                        className={`pointer ` +
                            (index === active ? theme.color : styles.notActive)
                        }
                        key={index}
                        value={index}
                    >
                        {tab}
                    </li>
                ))}
            </ol>
            <article>
                {newChildren}
            </article>
        </div>
    )
}

Tabs.propTypes = {
    height: PropTypes.number,
    defalutValue: PropTypes.number,
    onChange: PropTypes.func,
    el: PropTypes.object,
    children: PropTypes.node,
    themeName: PropTypes.string,
}

const mapState = state => {
    const themeName = state.getIn(['theme', 'name'])
    return {
        themeName
    }
}

export default connect(mapState, null)(memo(Tabs))
export { default as TabItem } from './item'