/* eslint-disable react/prop-types */
import React, { memo, useMemo, useEffect, useState, useCallback } from 'react'
import { _commentLimit } from './config'
import _paths from 'config/paths'
import { actionsCreator as videoAc } from 'store/video'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'
import { createBarrage_ } from 'tools/media'

import UI from './UI'

const _history = history
function MvPlayer(props) {
    const
        { match: { params: { id: _id } }, history } = props,
        { themeName } = props,
        { getData, getComment, getRelateMv, changeBarrage } = props,
        { data_imm, comments_imm, briefHotComments_imm, relateMv_imm } = props,
        data = useMemo(() => data_imm.toJS(), [data_imm]),
        comments = useMemo(() => comments_imm.toJS(), [comments_imm]),
        relateMv = useMemo(() => relateMv_imm.toJS(), [relateMv_imm]),
        briefHotComments = useMemo(() => briefHotComments_imm.toJS(), [briefHotComments_imm]),
        currentComments = comments[commentsOffset] || [],
        [id, setId] = useState(_id),                        /* 需要动态改变 */
        [commentsOffset, setCommentsOffset] = useState(0),   /* 评论页数 */
        theme = useTheme(themeName),
        toggleMv = useCallback(id => {
            setId(id)
            _history.pushState(null, '', _paths.mvPlayer + id)
        }, [history])

    /* mv变化@网络请求 */
    useEffect(() => {
        if (id) {
            getData(id)
            getRelateMv(id)
        }
    }, [id, getData, getRelateMv])

    /* 评论页数改变 */
    useEffect(() => {
        if (!Reflect.has(comments, commentsOffset))
            getComment(id, commentsOffset, getComment)
    }, [id, commentsOffset, getComment, comments])

    useEffect(() => {
        changeBarrage(createBarrage_(
            [...briefHotComments, ...currentComments.reverse()]
            , data.duration / 1000)
        )
    }, [briefHotComments, currentComments, data, changeBarrage])

    if (data.name)
        return (
            <UI
                commentsOffset={commentsOffset}
                data={data}
                theme={theme}
                comments={currentComments}
                briefHotComments={briefHotComments}
                relateMv={relateMv}

                toggleMv={toggleMv}
                setCommentsOffset={setCommentsOffset}
            />
        )
    return <> </>
}

const
    mapState = state => {
        const
            themeName = state.getIn(['theme', 'name']),
            video = state.get('video'),
            data_imm = video.get('data'),
            comments_imm = video.get('comments'),
            briefHotComments_imm = video.get('briefHotComments'),
            relateMv_imm = video.get('relateMv')

        return {
            themeName,

            data_imm,
            comments_imm,
            briefHotComments_imm,
            relateMv_imm,
        }
    },
    mapDispatch = dispatch => ({
        getData(uid) {
            dispatch(videoAc.getData(uid))
        },
        getComment(mvid, offset) {
            dispatch(videoAc.getComment(mvid, offset, _commentLimit))
        },
        getRelateMv(mvid) {
            dispatch(videoAc.getRelateMv(mvid))
        },
        changeBarrage(data) {
            dispatch(videoAc.changeBarrage(data))
        }
    })
export default connect(mapState, mapDispatch)(memo(MvPlayer))