import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Songs from 'components/songs'
import styles from './style'

function Song(props) {
    const
        { list, addSongs } = props,
        doubleClickHandle = useCallback(index => {
            addSongs && addSongs(list[index].id)
        }, [list, addSongs])
    return (
        <div className={styles.wrap}>
            <Songs
                onDoubleClick={doubleClickHandle}
                list={list}
            />
        </div>
    )
}

Song.propTypes = {
    list: PropTypes.array,
    addSongs: PropTypes.func,
}

export default memo(Song)