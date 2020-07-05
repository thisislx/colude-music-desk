import { put, takeEvery } from 'redux-saga/effects'
import types from './types'
import { assist } from './actionsCreator'
import { Mix } from 'http'

const mix = new Mix()

export default function* () {
    yield takeEvery(types.SAGA_SONG_BANNERS, getBanners)
}

function* getBanners() {
    const { banners, code } = yield mix.getBanners()
    if (code === 200) yield put(assist.changeBanners(banners))
}