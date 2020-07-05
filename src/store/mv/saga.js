import { takeEvery, put, select } from 'redux-saga/effects'
import types from './types'
import { assist } from './actionsCreator'
import { Mv } from 'http'
const _mv = new Mv()

export default function* () {
    yield takeEvery(types.SAGA_GET_DATA, getData)
    yield takeEvery(types.SAGA_GET_URL, getUrl)
    yield takeEvery(types.SAGA_GET_COMMENT, getComment)
    yield takeEvery(types.SAGA_GET_RELATE_MV, getRelateMv)
}

function* getData({ value: mvid }) {
    yield put(assist.init())
    const { data } = yield _mv.getData(mvid)
    yield put(assist.changeData(data))
}
function* getUrl({ value: mvid }) {
    const { data: { url } } = yield _mv.getUrl(mvid)
    yield put(assist.changeCurrentUrl(url))
}
function* getComment({ value: [mvid, offset, limit] }) {
    const
        __comments = (yield select(state => state.getIn(['mv', 'comments']))).toJS(),
        __lastPage = offset === 0 ? 0 : Reflect.has(__comments, offset - 1) ? offset - 1 : (() => {
            const keys = Object.keys(__comments)
            return keys[keys.lenght - 1]
        })(),
        lastTime = __comments[__lastPage] ? (() => {
            const cur = __comments[__lastPage]
            return cur[cur.length - 1].time
        })() : undefined,
        { comments, hotComments = [], total } = yield _mv.getComment(mvid, offset, limit, lastTime)
    comments[0].total = total
    if (!offset && hotComments.length)
        yield put(assist.changeBriefHotComments(hotComments))
    yield put(assist.updateComment(offset, comments))
}
function* getRelateMv({ value: mvid }) {
    const { mvs } = yield _mv.getRelateMv(mvid)
    yield put(assist.changeRelateMv(mvs))
}