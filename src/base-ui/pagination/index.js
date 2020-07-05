import React, { useMemo, useCallback, useState } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { maxGridConfig, lrCountConfig } from './config'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'

function Pagination(props) {
    const
        { defalutValue = 0, total = 0, pageSize = 0, themeName } = props,
        { onChange } = props,
        pageCount = useMemo(() => Math.ceil(total / pageSize) || 0, [total, pageSize]),
        [current, setCurrent] = useState(defalutValue),
        pages = useMemo(() => {
            const
                alignment = current >= maxGridConfig - lrCountConfig ? current
                    : maxGridConfig - lrCountConfig * 2,          /* 准线, *2(左边要进行和右边要进行lrCount次push) */
                isShrinkLeft = alignment > maxGridConfig - lrCountConfig * 2,    /* 左边省略号 */
                isShrinkRight = pageCount - alignment - 1 > alignment,           /* 右边省略号 页面数大于准线就要向右进行 lrCount次push */
                result = []

            for (let i = isShrinkLeft ? alignment - lrCountConfig : 0; i <= alignment; i++)   result.push(i)
            for (let i = alignment + 1; i <= (isShrinkRight ? alignment + lrCountConfig : pageCount - 1); i++) result.push(i)

            if (isShrinkLeft) {
                result.unshift('...')
                result.unshift(0)
            }
            if (isShrinkRight) {
                result.push('...')
                result.push(pageCount - 1)
            }
            if (isShrinkLeft || isShrinkRight)
                return result
            return [...new Array(pageCount)].map((item, key) => key)
        }, [pageCount, current]),
        theme = useTheme(themeName),
        clickItemHandle = useCallback(e => {
            const index = +e.target.getAttribute('data-key')
            setCurrent(index)
            onChange && Number.isInteger(index) && onChange(index)
        }, [onChange])

    return (
        <ol
            className={styles.wrap}
            onClick={clickItemHandle}
        >
            {
                pages.map((index, key) => {
                    return (
                        <li
                            className={`${theme.border_v1} ${index === current ? theme.color : ''}`
                                + ` pointer`
                            }
                            key={key}
                            data-key={index}
                        >
                            {Number.isInteger(index) ? index + 1 : index}
                        </li>
                    )
                })
            }
        </ol>
    )
}

Pagination.propTypes = {
    defalutValue: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    onChange: PropTypes.func,

    themeName: PropTypes.string,
}

const mapState = state => ({ themeName: state.getIn(['theme', 'name']) })
export default connect(mapState, null)(Pagination)