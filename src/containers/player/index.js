/* eslint-disable react/prop-types */
import React, { memo, useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { _commentsConfig } from './config'
import _paths from 'config/paths'
import useTheme from 'hooks/useTheme'
import { connect } from 'react-redux'
import { actionsCreator as songAc } from 'store/song'
import { actionsCreator as musicAc } from 'store/music'
import UI from './UI'

function Player(props) {
    const
        { history, themeName, playing, percent } = props,
        {
            getLyric,
            changePercent,
            getComments,
            makeComment,
            replyComment,
            likeComment,
            cancelLikeComment,
        } = props,
        {
            currentSong_imm,
            lyric_imm,
            comments_imm,
            briefHotComments_imm,
        } = props,
        currentSong = useMemo(() => currentSong_imm.toJS(), [currentSong_imm]),
        lyric = useMemo(() => typeof lyric_imm === 'string' ? lyric_imm : lyric_imm.toJS(), [lyric_imm]),
        comments = useMemo(() => comments_imm.toJS(), [comments_imm]),
        briefHotComments = useMemo(() => briefHotComments_imm.toJS(), [briefHotComments_imm]),
        [commentsPageCount, setCommentsPageCount] = useState(0),
        theme = useTheme(themeName),
        currentSongId = currentSong.id,
        currentPlayTime = currentSong.dt * percent || 0,
        doubleClickLyricHandle = useCallback(time => {
            const percent = time / currentSong.dt
            changePercent(percent)
        }, [changePercent, currentSong]),
        exitedHandle = useCallback(() => {
            history.goBack()
        }, [history]),
        toSource = useCallback(() => {
            const id = currentSong.source.id
            if (id != undefined)
                typeof id === 'number'
                    ? history.push(_paths.playlist + id)
                    : history.push(id)
        }, [history, currentSong]),
        likeCommentHandle = useCallback((commentId, isLike) => {
            if (isLike) cancelLikeComment(currentSong.id, commentId, commentsPageCount)
            else likeComment(currentSong.id, commentId, commentsPageCount)
        }, [currentSong, likeComment, cancelLikeComment, commentsPageCount])

    /* 歌曲准备情况 */
    useEffect(() => {
        if (!Reflect.has(currentSong, 'id')) history.replace('/')
    }, [currentSong, getLyric, history])

    // currentSong 初始化
    useEffect(() => {
        setCommentsPageCount(0)
        getLyric(currentSongId)
    }, [currentSongId, getComments, getLyric])

    /* 切换commentPageCount */
    useEffect(() => {
        if (!Reflect.has(comments, commentsPageCount))
            getComments(currentSongId, commentsPageCount)
    }, [getComments, commentsPageCount, comments, currentSongId])
    
    if (!Reflect.has(currentSong, 'id')) return <> </>
    return (
        <UI
            playing={playing}
            currentPlayTime={currentPlayTime}
            currentSong={currentSong}
            currentSongId={currentSongId}
            lyric={lyric}
            comments={comments}
            briefHotComments={briefHotComments}
            theme={theme}
            commentsPageCount={commentsPageCount}

            likeCommentHandle={likeCommentHandle}
            makeComment={makeComment}
            replyComment={replyComment}
            toSource={toSource}
            exitedHandle={exitedHandle}
            doubleClickLyricHandle={doubleClickLyricHandle}
            setCommentsPageCount={setCommentsPageCount}
        />
    )
}

const
    mapState = state => {
        const
            themeName = state.getIn(['theme', 'name']),
            music = state.get('music'),
            playing = music.get('playing'),
            currentSong_imm = music.get('currentSong'),
            percent = music.get('percent'),
            song = state.get('song'),
            lyric_imm = song.get('currentLyric'),
            comments_imm = song.get('comments'),
            briefHotComments_imm = song.get('briefHotComments')

        return {
            playing,
            themeName,
            percent,

            currentSong_imm,
            lyric_imm,
            comments_imm,
            briefHotComments_imm,
        }
    },
    mapDispatch = dispatch => ({
        getLyric(id) {
            dispatch(songAc.getLyric(id))
        },
        changePercent(percent) {
            dispatch(musicAc.changePercent(percent))
        },
        getComments(id, offset) {
            dispatch(songAc.getComments(id, offset, _commentsConfig.pageSize))
        },
        makeComment(id, content) {
            dispatch(songAc.makeComment(id, content))
        },
        replyComment(id, content, commentId) {
            dispatch(songAc.replyComment(id, content, commentId, _commentsConfig.pageSize))
        },
        likeComment(id, commentId, offset) {
            dispatch(songAc.likeComment(id, commentId, offset))
        },
        cancelLikeComment(id, commentId, offset) {
            dispatch(songAc.cancelLikeComment(id, commentId, offset))
        },
    })
export default connect(mapState, mapDispatch)(memo(Player))