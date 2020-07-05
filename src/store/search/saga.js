import { put, takeEvery } from 'redux-saga/effects'
import types from './types'
import { assist } from './actionsCreator'
import { actionsCreator as globalAC } from '../global'
import { Search } from 'http'
import { unifySongsProperty } from 'tools/media'
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
function* getSearchResult({ value: [words, type, offset, limit] }) {
    const
        { result } = yield search.getSearch(words, type, offset, limit),
        [listKey, totalKey] = Object.keys(result),
        list = result[listKey],
        total = result[totalKey]
    unifySongsProperty(list)
    list[0].total = total           /* 第一条数据记录总长度， 非arr属性被转成immutable会被忽略 */
    yield put(assist.updateResult(type, offset, list))
}
