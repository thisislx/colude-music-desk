import { takeEvery, put, select } from 'redux-saga/effects'
import types from './types'
import { assist } from './actionsCreator'
import { actionsCreator as musicAc } from '../music'
import { Mv } from 'http'
import { _isMvId, uniformData_ } from './tool'
const _mv = new Mv()

export default function* () {
    yield takeEvery(types.SAGA_GET_DATA, getData)
    yield takeEvery(types.SAGA_GET_URL, getUrl)
    yield takeEvery(types.SAGA_GET_COMMENT, getComment)
    yield takeEvery(types.SAGA_GET_RELATE_MV, getRelateMv)
    yield takeEvery(types.TOGGLE_PLAYING, togglePlaying)
}

function* togglePlaying({ value }) {
    const bool = value !== undefined
        ? value
        : yield select(state => state.getIn(['video', 'playing']))
    if (bool) yield put(musicAc.togglePlaying(false))
}
function* getData({ value: id }) {
    yield put(assist.init())
    if (_isMvId(id)) yield* getMvData_(id)
    else yield* getVideoData_(id)
}
function* getUrl({ value: id }) {
    if (_isMvId(id)) yield* getMvUrl_(id)
    else yield* getVideoUrl_(id)
}
function* getComment({ value: [id, offset, limit] }) {
    if (_isMvId(id)) yield* getMvComment_(id, offset, limit)
    else yield* getVideoComment_(id, offset, limit)
}
function* getRelateMv({ value: id }) {
    if (_isMvId(id)) {
        const { mvs } = yield _mv.getRelateMv(id)
        yield put(assist.changeRelateMv(mvs))
    }
}

/* ---分割线--- */
function* getMvData_(id) {
    const { data } = yield _mv.getMvData(id)
    yield put(assist.changeData(data))
}
function* getVideoData_(id) {
    const { data } = yield _mv.getVideoData(id)
    yield put(assist.changeData(uniformData_(data)))
}

function* getMvUrl_(id) {
    const res = yield _mv.getMvUrl(id)
    yield put(assist.changeCurrentUrl(res.data.url))
}
function* getVideoUrl_(id) {
    const res = yield _mv.getVideoUrl(id)
    yield put(assist.changeCurrentUrl(res.urls[0].url))
}

function* getMvComment_(id, offset, limit) {
    const
        lastTime = yield* _getCommentLastTime_(offset),
        res = yield _mv.getMvComment(id, offset, limit, lastTime)
    yield* _commentPut_(res, offset)
}
function* getVideoComment_(id, offset, limit) {
    const
        lastTime = yield* _getCommentLastTime_(offset),
        res = yield _mv.getVideoComment(id, offset, limit, lastTime)
    yield* _commentPut_(res, offset)
}


/* ---分割线--- */
function* _getCommentLastTime_(offset) {
    const
        __comments = (yield select(state => state.getIn(['video', 'comments']))).toJS(),
        __lastPage = offset === 0 ? 0 : Reflect.has(__comments, offset - 1) ? offset - 1 : (() => {
            const keys = Object.keys(__comments)
            return keys[keys.lenght - 1]
        })(),
        lastTime = __comments[__lastPage] ? (() => {
            const cur = __comments[__lastPage]
            return cur[cur.length - 1].time
        })() : undefined
    return lastTime
}
function* _commentPut_(res, offset) {
    const { comments, hotComments, total, moreHot } = res
    comments[0] && (comments[0].total = total)
    if (!offset && hotComments.length) {
        hotComments[0] && (hotComments[0].more = moreHot)
        yield put(assist.changeBriefHotComments(hotComments))
    }
    yield put(assist.updateComment(offset, comments))
}