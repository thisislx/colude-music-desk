import { takeEvery, put, select } from 'redux-saga/effects'
import types from './types'
import { assist } from './actionsCreator'
import { Song } from 'http'
import { processLyric, mergeLyric } from './tool'
import Messager from 'tools/Messager'
const
    _song = new Song(),
    _messager = new Messager(1600)

export default function* () {
    yield takeEvery(types.SAGA_LYRIC, getLyric)
    yield takeEvery(types.SAGA_COMMENTS, getComments)
    yield takeEvery(types.SAGA_MAKE_COMMENT, makeComment)
    yield takeEvery(types.SAGA_REPLY_COMMENT, replyComment)
    yield takeEvery(types.SAGA_LIKE_COMMENT, likeComment)
    yield takeEvery(types.SAGA_CANCLE_LIKE_COMMENT, cancelLikeComment)
}

function* getLyric({ value: id }) {
    const caches = yield select(state => state.getIn(['song', 'lyricCaches']))
    if (caches.has(id)) {
        const lyric = caches.get(id)
        yield put(assist.changeCurrentLyric(lyric))
    } else {
        const
            res = yield _song.getLyric(id),
            { lrc = {}, tlyric = {}, nolyric } = res
        let result = null
        if (nolyric) result = '纯音乐请欣赏'
        else result = mergeLyric(processLyric(lrc.lyric), processLyric(tlyric.lyric))
        yield put(assist.changeCurrentLyric(result))
        yield put(assist.addLyricCaches(id, result))
    }

}
function* getComments({ value: [id, offset, limit] }) {
    /* 重新读取评论 */
    if (id !== getComments._lastId) yield put(assist.clearAllComments())
    getComments._lastId = id
    let lastTime = undefined

    /* 非第一页, 更新lastTime */
    if (offset) {
        const
            commentsObj = yield select(state => state.getIn(['song', 'comments']).toJS()),
            keys = Object.keys(commentsObj),
            lastComments = commentsObj[keys[keys.length - 1]]
        lastTime = lastComments ? lastComments[lastComments.length - 1].time : undefined
    }
    const {
        comments = [],
        hotComments = [],
        total,
        moreHot,
    } = yield _song.getComments(id, offset, limit, lastTime)
    if (comments[0]) comments[0].total = total
    if (hotComments[0]) hotComments[0].more = moreHot
    yield put(assist.updateComments(offset, comments))
    if (!offset) yield put(assist.changeBriefHotComments(hotComments))
}
function* makeComment({ value: [id, content] }) {
    try {
        const { comment, msg } = yield _song.makeComment(id, content)
        if (msg) _messager.pushErr(msg)
        else {
            const comments = yield select(state => state.getIn(['song', 'comments']).toJS())
            comment.beReplied = []    /*补充数据, 渲染读取length */
            comments[0].unshift(comment)
            yield put(assist.updateComments(0, comments[0]))
            _messager.push('评论成功，等待审核')
        }

    } catch (e) {
        console.log(`makeComment()`, e)
        _messager.pushErr('评论失败')
    }
}
function* replyComment({ value: [id, content, commentId, limit] }) {
    try {
        const { comment, msg, message } = yield _song.replyComment(id, content, commentId)
        if (msg || message) _messager.pushErr(msg || message)
        else {
            yield* getComments({ value: [id, 0, limit] })    /* 拉取最新评论 */
            _messager.push('回复成功，等待审核')
        }
    } catch (e) {
        _messager.pushErr('发送失败')
    }
}
function* likeComment({ value: [id, commentId, offset] }) {
    try {
        yield _song.likeComment(id, commentId)
        yield put(assist.toggleCommentLike(offset, commentId, true))
    } catch (e) {
        _messager.pushErr('点赞失败')
    }
}
function* cancelLikeComment({ value: [id, commentId, offset] }) {
    try {
        yield _song.cancelLikeComment(id, commentId)
        yield put(assist.toggleCommentLike(offset, commentId, false))
    } catch (e) {
        _messager.pushErr('取消失败')
    }
}

