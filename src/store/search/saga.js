import { put, takeEvery, select } from 'redux-saga/effects'
import types from './types'
import { assist } from './actionsCreator'
import { actionsCreator as globalAC } from '../global'
import { Search } from 'http'
import { unifySongsProperty } from 'tools/media'
import { _searchKey } from './config'
const search = new Search()

export default function* () {
    yield takeEvery(types.SAGA_SEARCH_HOT, getSearchHot)
    yield takeEvery(types.SAGA_SEARCH_SUGGEST, getSearchSuggest)
    yield takeEvery(types.SAGA_GET_SEARCH, getSearchResult)
}

function* getSearchHot() {
    try {
        const res = yield search.getHot()
        yield put(assist.getSearchHot(res.data))
    } catch (e) {
        yield put(globalAC.showToast('服务器错误', 'err'))
    }

}
function* getSearchSuggest({ value }) {
    const res = yield search.getSuggest(value)
    yield put(assist.getSearchSuggest(res.result))
}
function* getSearchResult({ value: [type, offset, limit] }) {
    const
        words = yield select(state => state.getIn(['search', 'words'])),
        { result } = yield search.getSearch(words, type, offset, limit),
        keys = _searchKey[type],
        list = result[keys[0]],
        total = result[keys[1]]

    yield put(assist.addHistory(words))
    if (list && list.length) {
        unifySongsProperty(list)        /* 标准化数据 */
        list[0] && (list[0].total = total)         /* 第一条数据记录总长度， 非arr属性被转成immutable会被忽略 */
        yield put(assist.updateResult(type, offset, list))
    }
}
