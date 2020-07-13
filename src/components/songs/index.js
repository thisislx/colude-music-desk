import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { _paths } from './config'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'
import { useHistory } from 'react-router-dom'
import Item from './item'

/* 打开歌单详情的歌曲列表 */
function Songs(props) {
    const
        { list = [], onDoubleClick, themeName, currentId = -1 } = props,
        theme = useTheme(themeName),
        history = useHistory(),
        doubleClickHandle = useCallback(e => {
            const index = +e.target.getAttribute('data-index')
            if (Number.isInteger(index)) onDoubleClick && onDoubleClick(index)
        }),
        proxyClickHandle = useCallback(e => {
            const attrs = Object.values(e.target.attributes)
            for (let i = 0, len = attrs.length; i < len; i++) {
                const name = attrs[i].name
                switch (true) {
                    case name === 'data-mv':
                        return history.push(_paths.myPlayer + attrs[i].nodeValue)
                }
            }
        }, [history])

    return (
        <ol
            className={`${theme.fontColor_r1}`}
            onDoubleClick={doubleClickHandle}
            onClick={proxyClickHandle}
        >
            {
                list.map((item, key) => (
                    <Item
                        key={item.id}
                        data={item}
                        theme={theme}
                        index={key}
                        active={currentId}
                    />
                ))
            }
        </ol>
    )
}

Songs.propTypes = {
    list: PropTypes.array,
    currentId: PropTypes.number,
    onDoubleClick: PropTypes.func,
    themeName: PropTypes.string,
}


const mapState = state => {
    return {
        themeName: state.getIn(['theme', 'name'])
    }
}
export default connect(mapState, null)(memo(Songs))