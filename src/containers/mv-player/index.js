/* eslint-disable react/prop-types */
import React, { memo, useMemo, useEffect, useState, useCallback } from 'react'
import { _commentLimit } from './config'
import _paths from 'config/paths'
import { actionsCreator as mvAc } from 'store/mv'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'
import { createBarrage_ } from 'tools/media'

import UI from './UI'
const _history = history
function MvPlayer(props) {
    const
        { match: { params: { id: _id } }, history } = props,
        { themeName } = props,
        { getMvData, getComment, getRelateMv, changeBarrage } = props,
        { mvData_imm, comments_imm, briefHotComments_imm, relateMv_imm } = props,
        [id, setId] = useState(_id),                        /* 需要动态改变 */
        [commentsOffset, setCommentsOffset] = useState(0),   /* 评论页数 */
        mvData = useMemo(() => mvData_imm.toJS(), [mvData_imm]),
        comments = useMemo(() => comments_imm.toJS(), [comments_imm]),
        relateMv = useMemo(() => relateMv_imm.toJS(), [relateMv_imm]),
        briefHotComments = useMemo(() => briefHotComments_imm.toJS(), [briefHotComments_imm]),
        currentComments = comments[commentsOffset] || [],
        theme = useTheme(themeName),
        toggleMv = useCallback(id => {
            setId(id)
            _history.pushState(null, '', _paths.mvPlayer + id)
        }, [history])

    /* mv变化@网络请求 */
    useEffect(() => {
        if (id) {
            getMvData(id)
            getRelateMv(id)
        }
    }, [id, getMvData, getRelateMv])

    /* 评论页数改变 */
    useEffect(() => {
        if (!Reflect.has(comments, commentsOffset))
            getComment(id, commentsOffset, getComment)
    }, [id, commentsOffset, getComment, comments])

    useEffect(() => {
        changeBarrage(createBarrage_(
            [...briefHotComments, ...currentComments.reverse()]
            , mvData.duration / 1000)
        )
    }, [briefHotComments, currentComments, mvData, changeBarrage])

    if (mvData.name)
        return (
            <UI
                commentsOffset={commentsOffset}
                mvData={mvData}
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
            mv = state.get('mv'),
            mvData_imm = mv.get('data'),
            comments_imm = mv.get('comments'),
            briefHotComments_imm = mv.get('briefHotComments'),
            relateMv_imm = mv.get('relateMv')

        return {
            themeName,

            mvData_imm,
            comments_imm,
            briefHotComments_imm,
            relateMv_imm,
        }
    },
    mapDispatch = dispatch => ({
        getMvData(uid) {
            dispatch(mvAc.getData(uid))
        },
        getComment(mvid, offset) {
            dispatch(mvAc.getComment(mvid, offset, _commentLimit))
        },
        getRelateMv(mvid) {
            dispatch(mvAc.getRelateMv(mvid))
        },
        changeBarrage(data) {
            dispatch(mvAc.changeBarrage(data))
        }
    })
export default connect(mapState, mapDispatch)(memo(MvPlayer))