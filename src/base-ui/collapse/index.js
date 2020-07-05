import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import styles from './style'
import { notList } from './config'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'
import Triangle from '../triangle-icon'

function Collapse(props) {
    const
        {
            list = [],
            title = '',
            themeName,
            defaultOpen = false,
            onClick,
            active = -1, } = props,
        [show, setShow] = useState(defaultOpen),
        listRef = useRef(null),
        theme = useTheme(themeName),
        clickTitleHandle = useCallback(e => {
            e.stopPropagation() /* 避免到Triangle */
            setShow(!show)
        }, [show]),
        clickItemHandle = useCallback((e) => {
            if (e.target.matches('li')) {
                onClick && onClick(e.target.value)
            }
        }, [onClick])

    useEffect(() => {
        setTimeout(() => {
            setShow(defaultOpen)
        }, 2000)
    }, [defaultOpen])

    useEffect(() => {
        setTimeout(() => {
            if (listRef.current)
                listRef.current.style.height = listRef.current.scrollHeight + 'px'
        }, 1000)
    }, [list, listRef])

    return (
        <section
            className={`${styles.wrap} ${theme.fontColor_v2}`}
        >
            <header onClick={clickTitleHandle}>
                <span>{title}</span>
                <Triangle state={show} />
            </header>
            <ol
                className={`${styles.list} ${show ? '' : styles.hide}`}
                ref={listRef}
                onClick={clickItemHandle}
            >
                {list.map((item, key) => (
                    <li
                        className={`no-wrap pointer ${theme.backHover_v1} 
                            ${key === active ? theme.back_v1 : ''} `}
                        key={key}
                        value={key}
                    >
                        {item.name}
                        {key === active ?
                            <span
                                className={`${styles.active} ${theme}`}
                            >
                            </span> : null
                        }
                    </li>
                ))}
                {list.length === 0 ? <li className='no-wrap'>{notList}</li> : null}
            </ol>
        </section >

    )
}

Collapse.propTypes = {
    title: PropTypes.string,
    list: PropTypes.array,
    onClick: PropTypes.func,
    active: PropTypes.number,
    themeName: PropTypes.string,
    defaultOpen: PropTypes.bool
}

const mapState = state => {
    const themeName = state.getIn(['theme', 'name'])
    return {
        themeName
    }
}

export default connect(mapState, null)(memo(Collapse))