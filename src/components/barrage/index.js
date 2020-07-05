import React, { memo, useRef, useEffect, useMemo, useState, useCallback } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'

const
    _processTime = obj => {      /* 向下时间 */
        const
            newObj = {},
            oldKeys = Object.keys(obj),
            newKeys = oldKeys.map(time => time | 0)
        for (let i = 0, len = oldKeys.length; i < len; i++) {
            const oldKey = oldKeys[i], newKey = newKeys[i]
            if (Reflect.has(newObj, newKey))
                newObj[newKey].push(obj[oldKey])
            else newObj[newKey] = [obj[oldKey]]
        }
        return newObj
    },
    _computeDeleteTime = (second, speed) => second + speed + 1,
    _removeChild = (parent, childs) => {
        for (const child of childs)
            parent.removeChild(child)
        return true
    },
    _domPlay = dom => dom.classList.remove(styles.pause),
    _domPause = dom => dom.classList.add(styles.pause)

function Barrage(props) {
    const
        {
            data,
            playing = false,
            second: _second,
            speed = 14,     /* 单位s */
            size = 1.3,     /* 单位rem */
            maxLine = 10,   /* 弹幕行数 */
            themeName,
        } = props,
        { onClick } = props,
        second = _second | 0,
        [currentPauseItem, setCurrentPauseItem] = useState(null),
        stack = useMemo(() => new Map(), []),
        newData = useMemo(() => _processTime(data), [data]),
        wrapRef = useRef(null),
        lastSecond = useRef(-1),
        lastLine = useRef(-1),
        theme = useTheme(themeName),
        computeLine = useCallback(() => {
            const
                oldLine = lastLine.current,
                newLine = oldLine + 1
            if (newLine > maxLine) lastLine.current = 0
            else lastLine.current = newLine
            return lastLine.current
        }, [lastLine, maxLine]),
        createDom = useCallback((() => {
            const li = document.createElement('li')
            li.classList.add(styles.item)
            return (data) => {
                const curLi = li.cloneNode(false)
                curLi.textContent = data.content
                curLi.setAttribute('data-comment-id', data.commentId)
                curLi.setAttribute('data-user-id', data.user.userId)
                curLi.style.cssText = `animation-duration: ${speed}s;` +
                    `top:${1.3 * computeLine()}rem;font-size:${size}rem;line-height:${size}rem;`
                if (!playing) curLi.classList.add(styles.pause)
                return curLi
            }
        })(), [speed, computeLine, size, playing]),
        addDom = useCallback((dataList, second) => {
            const
                wrap = wrapRef.current,
                fragment = document.createDocumentFragment(),
                stackItem = new Set(),
                deleteTime = _computeDeleteTime(second, speed)

            for (let i = 0, len = dataList.length; i < len; i++) {
                const el = createDom(dataList[i])
                el.setAttribute('data-second', deleteTime)
                fragment.append(el)
                stackItem.add(el)
            }
            wrap.append(fragment)
            stack.set(deleteTime, stackItem)
        }, [wrapRef, stack, createDom, speed]),
        clickHandle = useCallback(e => {
            const el = e.target
            if (el.matches(`li.${styles.item}`)) {
                const second = +el.getAttribute('data-second')
                stack.get(second).delete(second)
                el.classList.add(theme.border_r2)
                _domPause(el)
                playing && setCurrentPauseItem(el)
                e.stopPropagation()
            } else if (currentPauseItem) {
                e.stopPropagation()
                setCurrentPauseItem(null)
            }
        }, [wrapRef, stack, theme, currentPauseItem, onClick, playing, theme])

    /* 更换弹幕时 */
    useEffect(() => {
        lastSecond.current = -1
        wrapRef.current.innerHTML = ''
        setCurrentPauseItem(null)
        stack.clear()
    }, [newData, lastSecond, stack, wrapRef])

    /* 创建dom */
    useEffect(() => {
        const cur = newData[second]
        if (lastSecond.current !== second && cur) {
            addDom(cur, second)
            lastSecond.current = second
        }
    }, [newData, second, addDom, lastSecond])

    /* 删除dom */
    useEffect(() => {
        if (stack.has(second)) {
            const
                wrap = wrapRef.current,
                els = stack.get(second)
            stack.delete(second)
            _removeChild(wrap, els)

            return () => {
                const keys = [...stack.keys()].filter(item => item < second)
                for (const key of keys) {
                    _removeChild(wrap, stack.get(key))
                    stack.delete(key)
                }
            }
        }
    }, [stack, second, wrapRef])

    /* dom播放 */
    useEffect(() => {
        /* 拥有弹幕 */
        if (~lastSecond.current) {
            const
                wrap = wrapRef.current,
                handle = playing ? _domPlay : _domPause
            for (const el of wrap.children) handle(el)
        }
    }, [playing, wrapRef, lastSecond])

    useEffect(() => {
        if (currentPauseItem)
            return () => {
                currentPauseItem.classList.remove(theme.border_r2)
                _domPlay(currentPauseItem)
            }
    }, [currentPauseItem, wrapRef, theme])

    return (
        <ol
            className={`${styles.wrap}`}
            ref={wrapRef}
            onClick={clickHandle}
        >
        </ol>
    )
}

Barrage.propTypes = {
    data: PropTypes.object,     /* time: data */
    playing: PropTypes.bool,
    second: PropTypes.number,
    speed: PropTypes.number,
    size: PropTypes.number,
    maxLine: PropTypes.number,
    onClick: PropTypes.func,
    themeName: PropTypes.string,
}

const mapState = state => ({ themeName: state.getIn(['theme', 'name']) })
export default connect(mapState, null)(memo(Barrage))