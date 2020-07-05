import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Songs from 'components/songs'

function Song(props) {
    const
        { list, addSongs } = props,
        doubleClickHandle = useCallback(index => {
            addSongs && addSongs(list[index].id)
        }, [list, addSongs])

    return (
        <Songs
            onDoubleClick={doubleClickHandle}
            list={list}
        />
    )
}

Song.propTypes = {
    list: PropTypes.array,
    addSongs: PropTypes.func,
}

export default memo(Song)