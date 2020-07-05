/* eslint-disable react/prop-types */
import React, { memo, useMemo, useEffect, useRef, createContext } from 'react'
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
        theme = useTheme(themeName),
        [openLoading, cancleLoading] = useLoading(),
        commendProps = useMemo(() => ({
            theme,
            songs: currentMenu.songs,
            currentSongId,  /* 当前播放歌曲的id */
        }), [theme, currentSongId, currentMenu]),
        firstOnPlay = useRef(false), /* 重复点击当前歌单 */
        commendMethods = useMemo(() => ({
            onPlay(index = 0) {    /* 播放歌曲   @index(歌曲索引) */
                changePlayIndex(index)
                if (!firstOnPlay.current) {
                    songs.length ? changePlaylist(songs) : null
                    firstOnPlay.current = true
                }
            },
            onCollect() { },
        }), [songs, changePlayIndex, changePlaylist, firstOnPlay])

    /* 请求资源 */
    useEffect(() => {
        if (_recommendSongId == id) getRecommendSongs()
        else getCurrentMenu(id)
    }, [id])

    /* loading */
    useEffect(() => {
        if (id !== _lastId || !songs || !songs.length) {
            _lastId = id
            openLoading()
            firstOnPlay.current = false
        } else cancleLoading()
        return () => cancleLoading()
    }, [id, currentMenu, openLoading, cancleLoading, firstOnPlay, songs])

    if (!songs.length) return <></>
    return (
        <OpcityWrap className={styles.wrap}>
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
        changePlaylist(list) {
            dispatch(musicActionsCreator.changeList(list))
        },
        changePlayIndex(index) {
            dispatch(musicActionsCreator.changeIndex(index))
        }
    })

export default connect(mapState, mapDispatch)(memo(Playlist))