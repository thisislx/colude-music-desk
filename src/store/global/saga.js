import { takeEvery, put } from 'redux-saga/effects'
import types from './types'
import { assist } from './actionsCreator'

export default function* () {
    yield takeEvery(types.SAGA_SHOW_TOAST, showToast)
}

let _pid = null
function* showToast({ value: [value, ms] }) {
    if (_pid) clearTimeout(_pid)
    yield put(assist.changeToast(value))
    yield Promise.race([
        new Promise(resolve => {
            _pid = setTimeout(() => {
                resolve()
                _pid = null
            }, ms)
        }),
        new Promise(resolve => setTimeout(resolve, ms))
    ])
    if (!_pid) yield put(assist.changeToast({ text: value.text, icon: value.icon }))
}