import { actionsCreator as globalAc } from 'store/global'
import store from 'store'

let dispatch = null
setTimeout(() => {
    dispatch = store.dispatch
})
const _list = new Map()
export default class {
    constructor(ms = 1500) {
        this.ms = ms
        this.stop = false
        this.handing = false        /* 正在处理 */
    }

    start() {
        this.stop = false
        if (!this.handing) this.listener()
    }

    stop() {
        this.stop = true
    }

    push(text, ms, icon) {
        const { stop, handing } = this
        if (!_list.has(text)) _list.set(text, [text, ms, icon])
        if (!stop && !handing) this.listener()
    }

    pushErr(text, ms) {
        this.push(text, ms, 'err')
    }

    clean() {
        _list.clear()
    }

    listener() {
        const { ms } = this,
            handle = () => {
                if (!_list.size || this.stop) this.handing = false
                else {
                    const
                        first = [..._list.keys()][0],
                        firstValue = _list.get(first),
                        _ms = Number.isInteger(firstValue[1]) ? firstValue[1] : ms
                    dispatch(globalAc.showToast(firstValue[0], firstValue[2], _ms))
                    _list.delete(first)
                    setTimeout(handle, _ms)
                }
            }
        setTimeout(() => handle(), 4)
        this.handing = true
    }
}