/* eslint-disable react/prop-types */
import React, { memo, useMemo, useEffect, createContext, useState } from 'react'
import styles from './style'
import { connect } from 'react-redux'
import { actionsCreator } from 'store/song-menu'
import { actionsCreator as musicActionsCreator } from 'store/music'
import useTheme from 'hooks/useTheme'
import useLoading from 'hooks/useLoading'
import { _recommendSongId } from 'config/song-menu'
import Recommend from './recommend'      /* 每日歌曲推荐 */
import Common from './common'
import OpcityWrap from 'base-ui/fixed-wrap/opcity'
import Mask from 'base-ui/mask'

export const Context = createContext(null)

let _lastId = NaN
function Playlist(props) {
    const
        { match: { params: { id } }, themeName, currentSongId, } = props,
        {
            getRecommendSongs,
            changePlayIndex,
            changePlaylist,
            getCurrentMenu } = props,
        { currentMenu_imm } = props,
        currentMenu = useMemo(() => currentMenu_imm.toJS(), [currentMenu_imm]),
        songs = currentMenu.songs,
        [showMask, setShowMask] = useState(false),
        theme = useTheme(themeName),
        [openLoading, cancelLoading] = useLoading(),
        commendProps = {
            theme,
            songs: currentMenu.songs,
            currentSongId,  /* 当前播放歌曲的id */
        },
        commendMethods = {
            onPlay(index) {    /* 播放歌曲   @index(歌曲索引) */
                if (!songs.length) return
                if (currentMenu.id === _lastId)
                    changePlayIndex(index)
                else changePlaylist(songs, index)
            },
            onCollect() { },
        }

    /* 请求资源 */
    useEffect(() => {
        if (_recommendSongId == id) getRecommendSongs()
        else getCurrentMenu(id)
    }, [id])

    /* loading */
    useEffect(() => {
        if (currentMenu.id != _lastId || _lastId != id) {
            _lastId = id
            openLoading()
            setShowMask(true)
        } else {
            cancelLoading()
            setShowMask(false)
        }
        return () => {
            cancelLoading()
            setShowMask(false)
        }
    }, [id, currentMenu, openLoading, cancelLoading])

    if (!songs.length) return <></>
    return (
        <OpcityWrap className={styles.wrap}>
            <Mask show={showMask}></Mask>
            <Context.Provider value={{ ...commendProps, ...commendMethods }}>
                {
                    currentMenu.id == _recommendSongId ?
                        <Recommend
                            {...commendProps}
                            {...commendMethods}
                        /> :
                        <Common
                            {...commendProps}
                            {...commendMethods}
                            data={currentMenu}
                        />
                }
            </Context.Provider>
        </OpcityWrap>
    )
}

const
    mapState = state => {
        const
            themeName = state.getIn(['theme', 'name']),
            songMenu = state.get('songMenu'),
            currentSongId = state.getIn(['music', 'currentSong', 'id']),        /* 当前播放歌曲 */
            currentMenu_imm = songMenu.get('currentMenu')
        return {
            themeName,
            currentSongId,
            currentMenu_imm,
        }
    },
    mapDispatch = dispatch => ({
        getRecommendSongs() {
            dispatch(actionsCreator.getRecommendSongs())
        },
        getCurrentMenu(id) {
            dispatch(actionsCreator.getCurrentMenu(id))
        },
        changePlaylist(list, index) {
            dispatch(musicActionsCreator.changeList(list, index))
        },
        changePlayIndex(index) {
            dispatch(musicActionsCreator.changeIndex(index))
        }
    })

export default connect(mapState, mapDispatch)(memo(Playlist))